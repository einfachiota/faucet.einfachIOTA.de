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
      label="IOTA Devnet Addresse"
      prop="address"
    >
      <el-input
        v-model="ruleForm.address"
        type="text"
        autocomplete="off"
        placeholder="IOTA Devnet Addresse"
      />
    </el-form-item>
    <div v-if="payout_sent">
      <p>Du kannst die Transaktion auf <a :href="'https://devnet.thetangle.org/address/' + ruleForm.address" target="_blank">TheTange.org</a> verfolgen.</p>
    </div>
    <div v-if="typeof ruleForm.errors !== 'undefined' && ruleForm.errors.length > 0">
      <p
        v-for="(error, index) in ruleForm.errors"
        :key="index"
      >
        {{ error }}
      </p>
    </div>
    <el-form-item>
      <el-button
        type="primary"
        @click="send('ruleForm')"
      >
        Sende!
      </el-button>
    </el-form-item>
    <router-link to="about">
      Wie funktioniert das?
    </router-link>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Form',
	data() {
		var validateAddress = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('Bitte gib eine IOTA Devnet addresse an.'));
			} else if (value === '') {
				// TODO: replace "" with correct statement
				callback(new Error('Dies ist keine gültige IOTA Addresse'));
			} else {
				callback();
			}
		};
		return {
			payout_sent: false,
			ruleForm: {
				address: '',
				errors: []
			},
			rules: {
				address: [{ validator: validateAddress, trigger: 'blur' }]
			}
		};
	},
	methods: {
		send(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log('submit!', this.ruleForm);
					let self = this;
					this.ruleForm.errors = [];
					axios
						.post('http://localhost:3001/pay_tokens', this.ruleForm)
						.then(response => {
							console.log('response', response);
							let data = response.data;
							if (!data) {
								self.ruleForm.errors.push('Invalid data');
							} else if(data === 'Invalid address') {
								self.ruleForm.errors.push('Invalid address');
								console.log('Server responded with invalid address');
							} else if (data.address) {
								self.payout_sent = true;
							}
						}).catch(err => {
							console.log('err', err);
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
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
  margin: 30px;
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
</style>
