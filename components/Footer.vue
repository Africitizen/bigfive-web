<template>
  <v-footer class="pl-10 pt-10">
    <v-row class="footer-container">
      <v-col
        sm="12"
        md="6"
        class="pl-0 pt-0"
      >
        <v-row class="footer-wrapper pl-0">
          <v-col class="footer-heading">
            Africitizen
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
          >
            <a
              href="https://www.facebook.com/africitizen"
              aria-label="Africitizen"
            >
              <v-icon large>{{ mdiFacebook }}</v-icon>
            </a>

            <v-divider
              inset
              vertical
              class="mx-1"
            />

            <a
              href="https://github.com/Africitizen"
              aria-label="Africitizen"
            >
              <v-icon large>{{ mdiGithub }}</v-icon>
            </a>

            <v-divider
              inset
              vertical
              class="mx-1"
            />

            <a
              href="https://www.linkedin.com/company/africitizen"
              aria-label="Africitizen"
            >
              <v-icon large>{{ mdiLinkedin }}</v-icon>
            </a>
          </v-col>
          <v-col
            cols="12"
            class="footer-about"
          >
            contact@africitizen.co<br>
          </v-col>
          <v-col
            class="footer-text"
            cols="12"
          >
            © 2023 - {{ new Date().getFullYear() }} Africitizen - all rights reserved.
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiGithub, mdiLinkedin } from '@mdi/js'

export default {
  name: 'Footer',
  data: () => ({
    mdiFacebook,
    mdiTwitter,
    mdiLinkedin,
    mdiGithub
  }),
  methods: {
    logClick (choice) {
      console.log(choice)
      this.$amplitude.getInstance().logEvent(`goes to ${choice}`, {})
    }
  }
}
</script>

<style scoped>
.footer-container {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
}
.footer-heading {
  font-family: 'Passion One', cursive;
  font-size: 4rem;
  color: #4c4f5a;
  line-height: 3.5rem;
}
.footer-about {
  letter-spacing: .1em;
}
.footer-text {
  font-family: 'Didact Gothic', sans-serif;
  color: #b3b3b3;
}
.footer-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
