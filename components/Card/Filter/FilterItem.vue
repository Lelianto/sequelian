<template>
  <div class="w-full">
    <div v-if="index !== 0" class="flex justify-center my-2">
      <el-button-group>
        <el-button class="and-or-button" :type="localFilter.andOrOr==='and'? 'primary':''" @click="queryLogic('and')">
          AND
        </el-button>
        <el-button class="and-or-button" :type="localFilter.andOrOr==='or'? 'primary':''" @click="queryLogic('or')">
          OR
        </el-button>
      </el-button-group>
    </div>
    <div class="flex gap-2 border rounded p-3">
      <div>
        <div class="text-xs text-gray-500">
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
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div>
        <div class="text-xs text-gray-500">
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
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div>
        <div class="text-xs text-gray-500">
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

<script>
export default {
  name: 'FilterItem',
  props: {
    selectedFilter: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    selectedColumns: {
      type: Array,
      default () {
        return [
          {
            index: 0,
            column: null,
            andOrOr: 'and',
            filter: null,
            input1: null,
            input2: null
          }
        ]
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data: () => {
    return {
      filters: [
        'equal',
        'not equal',
        'greater than',
        'less than',
        'between',
        'in'
      ]
    }
  },
  computed: {
    localFilter () {
      return this.selectedFilter
    }
  },
  methods: {
    queryLogic (logic) {
      this.$emit('input', this.index, 'andOrOr', logic)
    },
    clearFilter (index) {
      this.$emit('clearFilter', index)
    },
    removeFilter (index) {
      this.$emit('removeFilter', index)
    },
    columnFilters (col) {
      if (col !== null && col !== undefined) {
        return [
          'equal',
          'not equal',
          'greater than',
          'less than',
          'between',
          'in'
        ]
      } else {
        return []
      }
    }
  }
}
</script>
