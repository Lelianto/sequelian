<template>
  <div class="p-3 lg:container mx-auto md:mx-4 border rounded">
    <div id="card-title" class="mt-0 lg:my-5 text-lg font-bold">
      SQL Statement
    </div>
    <hr v-if="selectedTable" class="w-full my-5">
    <pre v-if="selectedTable && env !== 'test'" class="bg-yellow-100 p-3 rounded"><code ref="codeInput" v-highlight class="sql break-space" />{{ contentText() }}</pre>
    <hr v-if="selectedTable" class="w-full my-5">
    <div id="card-subtitle" class="my-5 text-md">
      Click on any of the queries below to see it in action.
    </div>
    <div v-if="queries.length && env !== 'test'">
      <pre v-for="(queryText, index) in queries" :key="'query-'+index" class="bg-yellow-100 p-3 rounded my-3 cursor-pointer" @click="setQuery(index)"><code :id="`query${index}`" v-highlight class="sql break-space" />{{ queryText.text }}</pre>
    </div>
  </div>
</template>

<script src="./CardScript.js">
</script>
