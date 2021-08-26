<template>
  <div class="w-full shadow fixed left-0 right-0 top-0 z-50 bg-white">
    <div class="lg:container mx-4 flex gap-2 py-2">
      <NuxtLink to="/" class="text-black">
        <img id="main-image" class="h-8 w-8" src="@/assets/images/sqlLogo.png" alt="">
      </NuxtLink>
      <NuxtLink to="/" class="text-black">
        <pre><code id="main-title" class="text-lg">Sequelian</code></pre>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
