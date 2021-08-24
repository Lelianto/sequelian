<template>
  <div class="w-full">
    <header-nav />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Default',
  components: {
    HeaderNav: () => import('@/components/Header/Header.vue')
  }
}
</script>

<style scoped>

</style>
