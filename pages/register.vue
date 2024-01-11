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
          <v-form ref="form">
            <v-text-field
              v-model="registerData.firstName"
              label="Votre nom"
              required
              :rules="[ruleFirstName.required]"
            />
            <v-text-field
              v-model="registerData.lastName"
              label="Votre prénom"
              required
              :rules="[ruleLastName.required]"
            />
            <v-select
              v-model="selectedCountry"
              :items="countries"
              item-value="id"
              item-text="name_fr"
              label="Votre pays de résidence"
              return-object
              :rules="[rules.country]"
            />
            <v-select
              v-model="selectedGender"
              :items="genders"
              item-value="id"
              item-text="name_fr"
              label="Votre sexe"
              return-object
              :rules="[rules.gender]"
            />
            <v-text-field
              v-model="registerData.email"
              label="Votre adresse mail"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="registerData.password"
              label="Votre mot de passe"
              :rules="[rules.required,rules.min]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              required
              @click:append="show = !show"
            />
            <v-text-field
              v-model="registerData.password_confirmation"
              label="Votre confirmez votre mot de passe"
              :rules="[rules.required,rules.min]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              required
              @click:append="show = !show"
            />
            <v-btn
              color="success"
              @click="register"
            >
              S'inscrire
            </v-btn>
            <p>
              Vous avez déjà un compte? <NuxtLink :to="localePath('/login')">
                Connectez-vous
              </NuxtLink>
            </p>
          </v-form>
        </v-col>
      </v-row>
    </Wrapper>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Password is required.',
        country: v => !!v || 'Country is required',
        gender: v => !!v || 'Gender is required',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      ruleFirstName: {
        required: value => !!value || 'firstName is required.'
      },
      ruleLastName: {
        required: value => !!value || 'lastName is required.'
      },
      show: false,
      countries: [],
      genders: [],
      selectedCountry: null,
      selectedGender: null,
      registerData: {
        firstName: '',
        lastName: '',
        password: '',
        password_confirmation: '',
        email: ''
      }
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
  created () {
    this.getData()
  },
  methods: {

    async register () {
      if (this.$refs.form.validate()) {
        await this.$axios.$post('/register', {
          firstName: this.registerData.firstName,
          lastName: this.registerData.lastName,
          password: this.registerData.password,
          password_confirmation: this.registerData.password_confirmation,
          email: this.registerData.email,
          country_id: this.selectedCountry.id,
          gender_id: this.selectedGender.id
        }).then(response => {
          localStorage.setItem('token', response.data.token)
          $nuxt.$router.push({ path: '/' })
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    },
    async getData () {
      await this.$axios.$get('/countries').then(response => {
        this.countries = response.data
      }).catch(error => {
        console.log(error)
      })
      await this.$axios.$get('/genders').then(response => {
        this.genders = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
