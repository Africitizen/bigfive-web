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
          md="6"
          class="text-md-left text-center"
        >
          <h1>
            {{ $t('frontpage.title') }}
          </h1>
          <p
            :class="{ 'responsive-text': $vuetify.breakpoint.smAndDown }"
            v-html="$t('frontpage.description.top')"
          />

          <v-btn
            x-large
            color="#0070f3"
            :to="localePath('/login')"
            dark
            class="mt-7"
          >
            {{ $t('frontpage.call_to_action') }}
          </v-btn>
          <br>
          <div
            class="ml-2 mt-2 grey--text text--darken-2"
            v-html="$t('frontpage.no_registration')"
          />
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-center"
        >
          <img
            class="responsive"
            alt="Girl infront of test"
            :src="require('@/assets/DALL·E 2024-01-16 00.40.47 - An interactive dashboard on a computer screen showing detailed.png')"
          >
        </v-col>
      </v-row>
    </Wrapper>

    <Wrapper background="#e4e4e4">
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1
            class="font-italic"
            v-html="$t('frontpage.tests_taken')"
          />
        </v-col>
        <v-col>
          <Highlights />
        </v-col>
      </v-row>
    </Wrapper>

    <Wrapper>
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1
            class="font-italic"
            v-html="$t('frontpage.tests')"
          />
        </v-col>
        <v-col>
          <Tests :africitizen-tests="africitizenTests" />
        </v-col>
      </v-row>
    </Wrapper>
    <Wrapper background="#e4e4e4">
      <v-row
        cols="12"
        :class="{ 'flex-column-reverse': $vuetify.breakpoint.smAndDown }"
        class="py-10"
      >
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-center"
        >
          <img
            class="responsive"
            alt="Comparing people"
            :src="require('@/assets/DALL·E 2024-01-16 00.38.57 - Creative representation of the map of Africa, adorned with dat.png')"
            loading="lazy"
          >
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="6"
          class="text-md-left text-center"
        >
          <h1 v-html="$t('frontpage.compare.title')" />

          <strong
            style="color: rgba(0, 0, 0, 0.87);"
            v-html="$t('frontpage.compare.title1')"
          />
          <p v-html="$t('frontpage.compare.text1')" />

          <strong
            style="color: rgba(0, 0, 0, 0.87);"
            v-html="$t('frontpage.compare.title2')"
          />
          <p v-html="$t('frontpage.compare.text2')" />

          <strong
            style="color: rgba(0, 0, 0, 0.87);"
            v-html="$t('frontpage.compare.title3')"
          />
          <p v-html="$t('frontpage.compare.text3')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="text-center"
          cols="12"
        >
          <h2
            style="color: #797878"
            v-html="$t('frontpage.share')"
          />
          <p>
            <v-btn
              outlined
              :to="localePath('/login')"
            >
              {{ $t('frontpage.compare.action') }}
            </v-btn>
          </p>
        </v-col>
      </v-row>
    </Wrapper>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      africitizenTests: []
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
    this.getTestList()
  },
  computed: {
    ...mapState(['development'])
  },
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.frontpage.loaded')
  },
  methods: {
    async getTestList () {
      await this.$axios.get('africitizen_tests').then(response => {
        this.africitizenTests = response.data.data
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style scoped>
p {
  font-size: 1.3rem;
  line-height: 1.9;
}

.responsive-text {
  padding-top: 10px;
  font-size: 18px;
  line-height: 1.0;
}

.responsive {
  max-width: 100%;
  height: auto;
}

.black--link a {
  color: unset;
  text-decoration: underline;
}

.default-width {
  max-width: 960px;
}

</style>
