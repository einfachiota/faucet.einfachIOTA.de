<template>
  <div class="home">
    <div class="hero">
      <h1 class="heading">
        IOTA Devnet Faucet
      </h1>
      <p class="sub-heading">
        Sende einfach IOTA Devnet Tokens!
      </p>
    </div>

    <div class="section section-background">
      <div class="container">
        <p>Total Tokens: {{ total_tokens }}</p>
        <Form />
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h2>Fülle das faucet</h2>
        <iota-payment>Sende Devnet IOTA</iota-payment>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form';
import axios from 'axios';

export default {
	name: 'Home',
	components: {
		Form
	},
	data() {
		return {
			total_tokens: ''
		};
	},
	created() {
		console.log('what?');
		this.getTotalTokens();
	},
	methods: {
		getTotalTokens() {
			console.log('whaaaaaaaat?');
			let self = this;
			axios
				.get('http://localhost:3001/total_balance')
				.then(response => {
					self.total_tokens = response.data.balance;
				}).catch(err => {
					console.log('err', err);
				});
		}
	}
};
</script>

<style lang="scss">
.el-main {
  padding: 0px !important;
}
.home {
  text-align: center;
}
.hero {
  margin: 0 10px;
}
.section {
  padding: 80px 0;
  &-background {
    background-color: var(--light);
    p {
      max-width: 600px;
      margin: 15px auto 30px;
    }
    a {
      text-decoration: none;
    }
  }

  .headline-wrapper {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media only screen and (max-width: 740px) {
  .hero {
      padding-top: 40px;
  }
  .headline-wrapper {
    flex-wrap: wrap;
    h2 {
      margin-bottom: 20px;
    }
  }
  .btn-social  {
      margin-bottom: 5px !important;
  }
}

</style>