<template>
  <div class="footer">
    <div class="row">
      <div class="footer-main">
        <a
          href="https://www.einfachiota.de/#/"
          class="footer-logo"
          exact-active-class="active"
          target="_blank"
        >
          <img
            alt="einfachIOTA"
            class="logo"
            src="../assets/logo.svg"
          >
        </a>
      </div>
      <div class="footer-main">
        <h4>
          <i18n path="footer.col_1.title" />
        </h4>
        <div class="divider" />
        <a
          href="https://www.einfachiota.de/"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_1.link1" />
        </a>
        <a
          href="https://blog.einfachiota.de/"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_1.link2" />
        </a>
        <a
          href="https://magazin.einfachiota.de/"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_1.link3" />
        </a>
      </div>
      <div class="footer-main">
        <h4>
          <i18n path="footer.col_2.title" />
        </h4>
        <div class="divider" />
        <a
          href="https://tanglebay.org/"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_2.link1" />
        </a>

        <a
          href="https://iotashops.com/"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_2.link2" />
        </a>
      </div>
      <div class="footer-main">
        <h4>
          <i18n path="footer.col_3.title" />
        </h4>
        <div class="divider" />
        <a
          href="https://www.iota.org"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_3.link1" />
        </a>
        <a
          href="https://ecosystem.iota.org"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_3.link2" />
        </a>
        <a
          href="https://blog.iota.org"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.col_3.link3" />
        </a>
      </div>
    </div>
    <div class="row footer-bottom">
      <div class="footer-bottom-col">
        <i18n path="footer.copyright" />
        <span class="heart">&#10084;</span> by
        <a
          href="https://www.einfachiota.de/"
          target="_blank"
          class="footer-link"
        >einfachIOTA</a>
      </div>
      <div class="footer-bottom-col">
        <a
          href="https://discord.gg/WdfXseU"
          target="_blank"
          class="footer-main-link"
        >Discord</a>
        <a
          href="https://twitter.com/einfachIOTA"
          target="_blank"
          class="footer-main-link"
        >Twitter</a>
        <a
          href="https://github.com/einfachiota"
          target="_blank"
          class="footer-main-link"
        >Github</a>
      </div>

      <div class="footer-bottom-col">
        <div
          class="lang"
          @click="switchLanguage()"
        >
          <!-- <span>Switch Language </span> -->
          <img
            v-if="this.$i18n.locale != 'de'"
            alt="lang"
            class="logo"
            src="../plugins/ger-flag.png"
            contain
            height="20rm"
          >
          <img
            v-else
            alt="lang"
            class="logo"
            src="../plugins/us-flag.png"
            contain
            height="20rm"
          >
        </div>
      </div>

      <div class="footer-bottom-col">
        <a
          href="https://www.einfachiota.de/#/imprint"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.imprint" />
        </a>
        <a
          href="https://www.einfachiota.de/#/privacy"
          target="_blank"
          class="footer-main-link"
        >
          <i18n path="footer.privacy" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	mounted() {
		console.log('mounted');
		let userLang = navigator.language || navigator.userLanguage;
		if (userLang.slice(0, 2) == 'de') {
			this.$i18n.locale = 'de';
		} else {
			this.$i18n.locale = 'en';
		}
	},
	methods: {
		switchLanguage() {
			if (this.$i18n.locale == 'de') {
				this.$i18n.locale = 'en';
			} else {
				this.$i18n.locale = 'de';
			}
		}
	}
};
</script>

<style lang="scss">
.footer {
  background-color: var(--white);
  width: 100%;
  padding: 50px 50px 0;
  box-sizing: border-box;
  text-align: center;
  border-top: 5px solid var(--primary);
  color: var(--dark);
  .heart {
    color: red;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .footer-main {
    text-align: left;
    width: 25%;
    margin-right: 50px;
    margin-bottom: 50px;
    &:last-child {
      margin-right: 0;
    }
    .logo {
      height: 150px;
    }
    h4 {
      font-size: 20px;
      line-height: 1;
      margin-bottom: 15px;
    }
    .divider {
      width: 50px;
      margin: 15px 0;
    }
    .footer-main-link {
      display: block;
      color: var(--dark);
      margin: 0;
      line-height: 2;
      font-size: 16px;
      text-decoration: none;
      transition: color 200ms ease-in-out;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .footer-bottom {
    padding: 15px 50px;
    margin: 0 -50px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.75);
    .footer-bottom-col {
      .footer-main-link {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .footer-link {
      color: rgba(0, 0, 0, 0.75);
      text-decoration: none;
      transition: color 200ms ease-in-out;
      font-size: 1.2em;
      &:hover {
        color: var(--primary);
      }
    }
    .footer-main-link {
      color: rgba(0, 0, 0, 0.75);
      text-decoration: none;
      transition: color 200ms ease-in-out;
      &:hover {
        color: var(--primary);
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  .footer {
    .row {
      flex-wrap: wrap;
      .footer-main {
        width: calc(50% - 50px);
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
    .row.footer-bottom {
      .footer-bottom-col {
        width: 50%;
        &:first-child {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
        }
        &:nth-child(3) {
          width: 100%;
          text-align: left;
          margin-top: 10px;
        }
      }
    }
  }
}
@media only screen and (max-width: 624px) {
  .footer {
    .row {
      flex-wrap: wrap;
      .footer-main {
        width: 100%;
        margin-right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
    .row.footer-bottom {
      .footer-bottom-col {
        width: 100%;
        &:first-child {
          text-align: center;
        }
        &:nth-child(2) {
          text-align: center;
          margin-top: 10px;
        }
        &:nth-child(3) {
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}
@media only screen and (max-width: 360px) {
  .footer {
    padding: 30px 30px 0;
    .row.footer-bottom {
      margin: 0 -30px;
      padding: 15px 30px;
    }
  }
}
</style>