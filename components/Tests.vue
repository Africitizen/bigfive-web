<template>
  <v-row>
    <v-col
      cols="6"
      xs="6"
      sm="6"
      md="3"
    >
      <img
        class="responsive"
        alt="open source"
        :src="require('@/assets/open-source.png')"
        loading="lazy"
      >
      <NuxtLink to="/test"><h3 v-html="$t('frontpage.cards.open.bigfive')" /></NuxtLink>
    </v-col>

    <v-col
      cols="6"
      xs="6"
      sm="6"
      md="3"
    >
      <img
        class="responsive"
        alt="free"
        :src="require('@/assets/free.png')"
        loading="lazy"
      >
      <h3 v-html="$t('frontpage.cards.free.safari')" />
    </v-col>
  </v-row>
</template>

<style scoped>
.responsive {
  max-width: 100%;
  height: auto;
}

h3 {
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
