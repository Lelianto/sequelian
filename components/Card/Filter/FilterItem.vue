<template>
  <div class="w-full">
    <div v-if="index !== 0" class="flex justify-center my-2">
      <el-button-group>
        <el-button id="button-and" class="and-or-button" :type="localFilter.andOrOr==='and'? 'primary':''" @click="queryLogic('and')">
          AND
        </el-button>
        <el-button id="button-or" class="and-or-button" :type="localFilter.andOrOr==='or'? 'primary':''" @click="queryLogic('or')">
          OR
        </el-button>
      </el-button-group>
    </div>
    <div class="flex flex-col md:flex-row gap-2 border rounded p-3">
      <div>
        <div class="text-xs text-gray-500 mb-1">
          Column
        </div>
        <el-select
          v-model="localFilter.column"
          class="w-full"
          filterable
          placeholder="Select Column"
        >
          <el-option
            v-for="item in selectedColumns"
            :key="`${item}`"
            :label="`${item}`"
            :value="item"
          />
        </el-select>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">
          Condition
        </div>
        <el-select
          v-model="localFilter.filter"
          class="w-full"
          filterable
          placeholder="Select Condition"
        >
          <el-option
            v-for="item in filters"
            :key="`${item}`"
            :label="`${item}`"
            :value="item"
          />
        </el-select>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">
          Value
        </div>
        <div class="flex gap-2">
          <el-input v-model="localFilter.input1" placeholder="Input a Value" />
          <el-input v-if="localFilter.filter === 'between'" v-model="localFilter.input2" placeholder="Input a Value" />
        </div>
      </div>
      <div class="flex">
        <el-button class="custom-danger" type="danger" icon="el-icon-delete" circle @click="removeFilter(localFilter.index)" />
      </div>
    </div>
  </div>
</template>

<script src="./FilterScript.js">
</script>
