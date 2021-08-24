<template>
  <div class="w-full">
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
