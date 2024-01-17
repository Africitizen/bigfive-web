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
        :src="require('@/assets/DALL·E 2024-01-16 00.40.16 - A person sitting at a desk, focused on their computer screen w.png')"
        loading="lazy"
      >
      <NuxtLink to="/test">
        <h3 v-html="$t('frontpage.cards.open.bigfive')" />
      </NuxtLink>
    </v-col>

    <v-col
      cols="6"
      xs="6"
      sm="6"
      md="3"
      v-for="africitizenTest in africitizenTests" :key="africitizenTest.id"
    >
      <img
        class="responsive"
        alt="free"
        :src="require('@/assets/DALL·E 2024-01-16 00.40.16 - A person sitting at a desk, focused on their computer screen w.png')"
        loading="lazy"
      >

      <NuxtLink :to="`/tests/${africitizenTest.id}`">
        <h3>{{ africitizenTest.name }}</h3>
      </NuxtLink>
    </v-col>
  </v-row>
</template>
<script >
export default {
  props: {
    africitizenTests: {
      type: Array,
      required: true
    }
  }
}
</script>
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
<script setup>
</script>
