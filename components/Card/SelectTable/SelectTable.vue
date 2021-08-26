<template>
  <el-select v-model="selectedTableLocal" class="w-full" filterable placeholder="Select Table">
    <el-option
      v-for="item in tables"
      :key="item.slug"
      :label="item.slug"
      :value="item.slug"
    />
  </el-select>
</template>

<script src="./TableScript.js"></script>
