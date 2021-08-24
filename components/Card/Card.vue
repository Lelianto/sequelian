<template>
  <div class="lg:container mx-4 border rounded">
    <left-card v-if="card === 'left'" />
    <right-card v-else-if="card === 'right'" />
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {
    LeftCard: () => import('@/components/Card/SelectedCard/LeftCard.vue'),
    RightCard: () => import('@/components/Card/SelectedCard/RightCard.vue')
  },
  props: {
    card: {
      type: String,
      default: ''
    }
  }
}
</script>
