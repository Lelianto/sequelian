<template>
  <div class="lg:container mx-4">
    <div class="pt-12">
      <div class="text-3xl mb-5 font-bold">
        Page Not Found
      </div>
      <NuxtLink to="/" class="text-xl cursor-pointer">
        Go to <span class="text-blue-700 font-bold cursor-pointer">Home Page</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>
</style>
