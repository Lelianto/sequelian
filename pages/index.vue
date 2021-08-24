<template>
  <div class="md:container mx-4 pt-3">
    <div class="w-full flex gap-4">
      <div class="w-full lg:w-3/4">
        <card card="left" />
      </div>
      <div class="w-full lg:w-1/4">
        <card card="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  components: {
    Card: () => import('@/components/Card/Card.vue')
  }
}
</script>
