<template>
  <div class="lg:container mx-4">
    <header-nav />
    <div class="pt-12">
      <Nuxt />
    </div>
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
