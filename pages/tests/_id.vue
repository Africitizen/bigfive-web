<template>
  <v-container>
    <v-row>
      <v-col><h1>{{ africitizenTest?.name }}</h1></v-col>
      <v-col>
        <LazyTimer />
      </v-col>
    </v-row>
    <v-form ref="form">
      <div
        v-for="africitizenTestQuestion in africitizenTestQuestions"
        :key="africitizenTestQuestion.id"
      >
        <h2>{{ africitizenTestQuestion.name }}</h2>
        <div
          v-for="chapter in africitizenTestQuestion.chapters"
          :key="chapter.id"
        >
          <h3>{{ chapter.name }}</h3>
          <div
            v-if="chapter.context"
            v-html="chapter.context"
          />
          <div
            v-for="question in chapter.questions"
            :key="question.id"
          >
            <strong>Question:</strong> {{ question.question }}
            <v-text-field
              v-if="question.type.html_element == 'textarea'"
              :rules="rules.wordsRules"
              required
              placeholder="Votre réponse"
              @change="answer => addResponse({questionId: question.id, response: answer, questionType:question.type.id})"
            />
            <v-radio-group
              v-if="question.type.html_element == 'radio'"
              :value="question.id"

              @change="answer => addResponse({questionId: question.id, response: answer, questionType:question.type.id})"
            >
              <v-radio
                v-for="option in question.option"
                :key="option.id"
                :label="option.response"
                :value="option.id"
              />
            </v-radio-group>
          </div>
        </div>
      </div>
      <v-btn
        color="success"
        @click="senQuestionResponse"
      >
        Envoyer
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>

import { elapsedTimeInSeconds, sleep } from '@/lib/helpers'

export default {
  name: 'AfricitizenTest',
  middleware: 'auth',
  data () {
    return {
      africitizenTestQuestions: [],
      userQuestionResponse: [],
      africitizenTest: null,
      rules: {
        wordsRules: [val => (val || '').trim().length > 0 || 'Réponse requise']
      },
      testStart: 0
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
    this.getQuestionData()
    this.testStart = Date.now()
  },
  methods: {
    addResponse (response) {
      if (this.userQuestionResponse.length > 0) {
        if (this.userQuestionResponse.find(element => element.questionId === response.questionId) !== null) {
          this.userQuestionResponse = this.userQuestionResponse.filter(element => element.questionId !== response.questionId)
          console.log('filter:')
          console.log(this.userQuestionResponse)
        }
      }
      console.log('new:')
      if (response.response.trim().length > 0) {
        this.userQuestionResponse.push(response)
        console.log(this.userQuestionResponse)
      }
    },
    async senQuestionResponse () {
      if (this.$refs.form.validate()) {
        await this.$axios.post('africitizen_tests', {
          testId: this.africitizenTest.id,
          answers: this.userQuestionResponse,
          timeElapsed: elapsedTimeInSeconds(this.testStart)
        }, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('token')
          }
        }).then(async (response) => {
          this.$confetti.start({ particlesPerFrame: 0.25, particles: [{ type: 'heart' }] })
          await sleep(4000)
          this.$confetti.stop()
        })
        $nuxt.$router.push({ path: '/' })
      }
    },
    async getQuestionData () {
      await this.$axios.get(`africitizen_tests/${this.$route.params.id}`).then(response => {
        this.africitizenTestQuestions = response.data.data.sections
        this.africitizenTest = response.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>

</style>
