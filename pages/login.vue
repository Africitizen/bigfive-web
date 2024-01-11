<template>
  <div>
    <Wrapper>
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          cols="12"
          xs="12"
          md="12"
          class="text-center"
        >
          <v-alert
            v-if="hasError"
            dismissible
            type="error"
          >
            {{ errorMessage.message }}
          </v-alert>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-center text-md-left"
        >
          <v-form ref="form">
            <v-text-field
              v-model="loginData.email"
              label="Email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="loginData.password"
              label="Password"
              required
              :rules="[rules.required,rules.min]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            />
            <v-btn
              color="success"
              @click="login"
            >
              Se connecter
            </v-btn>
            <p>Vous n'avez pas encore un compte? <NuxtLink :to="localePath('/register')">Inscrivez-vous</NuxtLink></p>
          </v-form>
        </v-col>
      </v-row>
    </Wrapper>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Password is required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      show: false,
      loginData: {
        email: '',
        password: ''
      },
      errorMessage: null,
      hasError: false
    }
  },
  head () {
    return {
      title: this.$t('frontpage.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('frontpage.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('frontpage.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('frontpage.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('frontpage.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('frontpage.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('frontpage.seo.description') }
      ]
    }
  },
  methods: {
    async login () {
      if (this.$refs.form.validate()) {
        await this.$axios.$post('/login', this.loginData).then(response => {
          localStorage.setItem('token', response.data.token)
          $nuxt.$router.push({ path: '/' })
        }).catch(error => {
          this.hasError = true
          this.errorMessage = error.response.data
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
