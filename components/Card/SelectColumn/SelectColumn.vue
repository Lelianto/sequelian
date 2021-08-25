<template>
  <div class="w-full">
    <el-select
      id="select-column"
      v-model="selectedColumnLocal"
      class="w-full"
      multiple
      filterable
      clearable
      placeholder="Select Column(s)"
    >
      <el-option
        v-for="item in columns"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script src="./SelectColumn.js">
</script>
