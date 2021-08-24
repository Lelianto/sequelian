<template>
  <div class="w-full shadow fixed left-0 right-0 top-0 z-50 bg-white">
    <div class="lg:container mx-4 flex gap-2 py-2">
      <img class="h-8 w-8" src="@/assets/images/sqlLogo.png" alt="">
      <pre v-highlightjs><code class="sql text-lg">Sequelian</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
