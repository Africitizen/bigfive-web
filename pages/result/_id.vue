<template>
  <v-container>
    <div v-if="results">
      <v-row>
        <v-col>
          <span class="d-print-none">
            <v-select
              v-model="metadata.language"
              :items="metadata.availableLanguages"
              label="Change language"
              :append-icon="mdiMenuDown"
              @input="changeLanguage"
            />
          </span>
        </v-col>
        <v-col>
          <p
            v-if="metadata.timestamp"
            class="text-right grey--text"
          >
            {{ new Date(metadata.timestamp).toLocaleString() }}
          </p>
        </v-col>
      </v-row>

      <div class="text-center mt-10">
        <b>{{ $t('results.important') }}</b> {{ $t('results.saveResults') }} <nuxt-link :to="localePath('compare')">
          {{ $t('results.compare') }}
        </nuxt-link> {{ $t('results.toOthers') }}
        <br>
        <br>
        <v-alert
          outlined
          color="secondary"
        >
          <span
            class="secondary--text headline"
            :class="{'title': $vuetify.breakpoint.xs}"
          >{{ $route.params.id }}</span>
        </v-alert>
        <ShareLinks :id="'result/' + $route.params.id" />
      </div>

      <div class="display-1 mt-6">
        {{ $t('results.theBigFive') }}
      </div>
      <BarChart
        :data="results"
        :max="Number(120)"
      />
      <div
        v-for="domain in results"
        :key="domain.id"
      >
        <Domain :domain="domain" />
      </div>
      <br>
      <span class="headline">{{ $t('shareLinks.shareResults') }}</span>
      <ShareLinks :id="'result/' + $route.params.id" />
    </div>
    <Error v-else />
  </v-container>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'
import calculateScore from '@alheimsins/bigfive-calculate-score'
import getResult from '@alheimsins/b5-result-text'
export default {
  name: 'Result',
  middleware: 'auth',
  async asyncData ({ params, store, $axios, query, app }) {
    try {
      const url = 'big_five_results/' + params.id

      const data = await $axios.$get(url, {
        headers: {
          Authorization: 'Bearer ' + app.$cookies.get('token')
        }
      })

      const scores = calculateScore(data.data)
      const results = getResult({ scores, lang: query.lang || data.data.lang || 'en' })
      return {
        results: results,
        metadata: {
          timestamp: data.data.timestamp,
          language: query.lang || data.data.lang || 'en',
          availableLanguages: data.availableLanguages
        }
      }
    } catch (error) {
      console.log(error)
      store.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
    }
  },
  data: () => ({
    results: false,
    mdiMenuDown
  }),
  head () {
    return {
      title: this.$t('results.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('results.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('results.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('results.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('results.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('results.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('results.seo.description') }
      ]
    }
  },
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.test', { part: 'result' })
  },
  methods: {
    changeLanguage (lang) {
      this.$router.replace(
        { pathname: '/result', params: { id: this.$route.params.id }, query: { lang } },
        () => {
          this.$router.go(0)
        }
      )
    }
  }
}
</script>
