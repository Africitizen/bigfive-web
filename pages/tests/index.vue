<script>
export default {
  name: 'TestsIndex',
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
  mounted () {
    this.$amplitude.getInstance().logEvent('b5.frontpage.loaded')
  },
  created () {
    this.getTestList()
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

<template>
  <div>
    <Wrapper>
      <v-row
        cols="12"
        class="py-10"
      >
        <v-col
          class="text-center"
          cols="12"
        />
        <v-col>
          <Tests :africitizen-tests="africitizenTests" />
        </v-col>
      </v-row>
    </Wrapper>
  </div>
</template>

<style scoped>

</style>
