<template>
  <div class="home">
    <div class="hero">
      <h1 class="heading">
        <i18n path="about.heading" />
      </h1>
      <p class="sub-heading">
        <i18n path="about.subheading" />
      </p>
    </div>

    <div class="section section-background black">
      <div class="container">
        <h2 class="bullet_point">
          Open Source Code
        </h2>
        <a
          target="_blank"
          href="https://github.com/einfachiota/faucet.einfachIOTA.de"
          rel="noreferrer"
        >
          <i18n path="about.faucetlink" />
        </a>
        <br>
        <br>
        <i18n path="about.modulelink1" />
        <a
          target="_blank"
          href="https://github.com/einfachiota/iota-payment"
          rel="noreferrer"
        >
          <i18n path="about.modulelink2" />
        </a>
        <i18n path="about.modulelink3" />
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.black {
  padding: 30px;
  color: var(--dark);
  a {
    color: black;
  }
}
.bullet_point {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>