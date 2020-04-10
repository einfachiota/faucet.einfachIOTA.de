<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    label-position="top"
  >
    <el-form-item
      :label="`IOTA ${network} `+$t('form.address_label')"
      prop="address"
    >
      <el-input
        v-model="ruleForm.address"
        type="text"
        autocomplete="off"
        :placeholder="`IOTA ${network} `+$t('form.address_label')"
      />
    </el-form-item>
    <el-form-item
      :label="'IOTA '+$t('form.amount')"
      prop="value"
    >
      <input
        id="myRange"
        type="range"
        min="0"
        :max="maxValue"
        value="10"
        class="slider"
        @input="changePayoutValue"
        @change="changePayoutValue"
      >
      <el-input
        v-model="ruleForm.value"
        type="number"
        autocomplete="off"
        placeholder="1"
      />
    </el-form-item>
    <el-form-item
      :label="$t('form.message')"
      prop="message"
    >
      <el-input
        v-model="ruleForm.message"
        type="text"
        maxlength="1093"
        autocomplete="off"
        :placeholder="$t('form.message_placeholder')"
      />
    </el-form-item>
    <div v-if="payout_sent && txhash.length !== 81">
      <p>
        <!-- <i18n path="transaction_address" />
        <a
          v-if="network == 'Devnet'"
          :href="'https://devnet.thetangle.org/address/' + ruleForm.address"
          target="_blank"
        >TheTange.org</a>
        <a
          v-else
          :href="'https://thetangle.org/address/' + ruleForm.address"
          target="_blank"
        >TheTange.org</a>
        <i18n path="transaction_address1" />-->
        <i18n path="transaction_request_sent" />
      </p>
    </div>
    <div v-else-if="txhash.length === 81">
      <p>
        <i18n path="transaction_sent" />
        <a
          v-if="network == 'Devnet'"
          :href="tangleExporer + '/transaction/' + txhash"
          target="_blank"
        >{{tangleExporer}}</a>
        <a
          v-else
          :href="tangleExporer + '/transaction/' + txhash"
          target="_blank"
        >{{tangleExporer}}</a>
      </p>
    </div>
    <div v-if="typeof ruleForm.errors !== 'undefined' && ruleForm.errors.length > 0">
      <p
        v-for="(err, index) in ruleForm.errors"
        :key="index"
      >
        {{ err }}
      </p>
    </div>
    <el-form-item>
      <div v-if="error">
        {{ cantsendmsg }}
      </div>
      <div v-if="cantsendpayout">
        {{ cantsendmsg }}
      </div>
      <el-button
        type="primary"
        :disabled="clicked"
        :class="{'clicked': clicked}"
        @click="send('ruleForm')"
      >
        <i18n path="send" />!
      </el-button>
    </el-form-item>
    <router-link to="about">
      <i18n path="how_it_works" />
    </router-link>
    <div>
      <br>
      <i18n path="iota_is_free" />
      <br>
      <br>
      <i18n path="data_without_token" />
    </div>
  </el-form>
</template>

<script>
import axios from 'axios';
import { isValidChecksum, addChecksum } from '@iota/checksum';
import { isTrytes } from '@iota/validators';
import io from 'socket.io-client';
const socket = io(process.env.VUE_APP_URL, {
	path: '/iotapay/socket'
});

export default {
	name: 'Form',
	data() {
		var validateAddress = (rule, address, callback) => {
			//accept any 81 tryte string as address, only for devnet
			if (this.network == 'Devnet') {
				let match = /[A-Z+9]{81}/.exec(address);
				if (match == null) {
					return callback(new Error(this.$i18n.t('form.err.add_address')));
				}
				address = addChecksum(address.slice(match.index, match.index + 81));
				this.ruleForm.address = address;
			} else {
				address = address.trim();
				this.ruleForm.address = address.trim();
			}

			if (!address) {
				return callback(new Error(this.$i18n.t('form.err.inv_address')));
			} else if (
				!isTrytes(address) ||
        (address.length != 90 && address.length != 81)
			) {
				callback(new Error(this.$i18n.t('form.err.inv_address')));
			} else if (address.length == 90 && !isValidChecksum(address)) {
				callback(new Error(this.$i18n.t('form.err.inv_checksum')));
			} else {
				callback();
			}
		};
		let validateValue = (rule, value, callback) => {
			if (isNaN(value)) {
				return callback(new Error(this.$i18n.t('form.err.inv_value')));
			}
			if (value > process.env.VUE_APP_MAXVALUE) {
				return callback(new Error(this.$i18n.t('form.err.max_val')));
			} else {
				callback();
			}
		};
		return {
			payout_sent: false,
			cantsendpayout: false,
			cantsendmsg: 'Pls try again later.',
			txhash: 'empty',
			network: process.env.VUE_APP_NETWORK,
      tangleExporer: process.env.VUE_APP_TANGLE_EXPLORER,
      maxValue: process.env.VUE_APP_MAXVALUE,
			error: false,
			clicked: false,
			ruleForm: {
				address: '',
				value: 1,
				message: '',
				errors: []
			},
			rules: {
				address: [{ validator: validateAddress, trigger: 'blur' }],
				value: [{ validator: validateValue, trigger: 'blur' }]
			}
		};
	},
	created() {
		let self = this;
		socket.on('payouts', function(data) {
			self.txhash = data.payout.txhash;
			self.clicked = false;
		});
	},
	methods: {
		send(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					//reset status
					this.txhash = 'empty';
					this.payout_sent = false;
					this.clicked = true;
					console.log('submit!', this.ruleForm);
					let self = this;
					this.ruleForm.errors = [];
					axios
						.post(process.env.VUE_APP_URL + '/pay_tokens', this.ruleForm)
						.then(response => {
							console.log('response', response);
							//exit if max amount reached
							if (response.data.type == 'cantsend') {
								this.cantsendmsg = response.data.msg;
								this.cantsendpayout = true;
								setTimeout(() => {
									this.clicked = false;
								}, 2000);
								return;
							} else {
								this.cantsendpayout = false;
							}
							if (response.data.type == 'error') {
								this.cantsendmsg = response.data.msg;
								this.error = true;
								this.clicked = false;
								return;
							} else {
								this.error = false;
							}
							let data = response.data;
							if (!data) {
								self.ruleForm.errors.push('Invalid data');
								this.clicked = false;
							} else if (data === 'Invalid address') {
								self.ruleForm.errors.push('Invalid address');
								console.log('Server responded with invalid address');
								this.clicked = false;
							} else if (data.address) {
								socket.emit('storeClientInfo', {
									paymentOrPayoutId: response.data.id
								});
								self.payout_sent = true;
							}
						})
						.catch(err => {
							console.log('err', err);
							this.clicked = false;
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		changePayoutValue(value) {
			this.ruleForm.value = value.srcElement.value;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
}
input {
  width: 50%;
  height: 60px;
  margin: 0 auto;
  font-size: 0.8em;
  text-align: center;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: gray;
  opacity: 1; /* Firefox */
  font-size: 1.2em;
  text-align: center;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: gray;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: gray;
}
a {
  margin: 5px;
  border: 2px solid transparent;
  font-size: 1.5em;
  font-weight: 300;
  line-height: 20px;
  white-space: nowrap;
  color: var(--dark);
  cursor: pointer;
  &:hover {
    color: var(--primary);
  }
}
button {
  margin: 0 auto;
  max-width: 500px;
  margin-top: 20px;
  padding: 20px 30px;
  border: 0;
  border-radius: 8px;
  outline: none;
  color: #fff;
  font-size: 24px;
  line-height: 29px;
  text-decoration: none;
  box-shadow: var(--primary);
  cursor: pointer;
}

.clicked {
  background: #801b99 !important;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--primary-darken);
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
}
</style>
