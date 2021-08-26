import { shallowMount, createLocalVue } from '@vue/test-utils'
import { beforeEach, expect } from '@jest/globals'
import ElementUI from 'element-ui'
import FilterItem from '@/components/Card/Filter/FilterItem.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
const mockedProps = {
  selectedFilter: {
    index: 1,
    column: null,
    andOrOr: 'and',
    filter: null,
    input1: null,
    input2: null
  },
  index: 1,
  selectedColumns: [],
  columns: []
}

const setFieldMocking = (index, key, value) => {
  mockedProps.selectedFilter[`${key}`] = value
}

describe('Filter Menu', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(FilterItem, { localVue }, {})
    wrapper.setProps(mockedProps)
  })

  test('Filter Item is Exist', () => {
    expect(wrapper.vm.localFilter).toEqual(mockedProps.selectedFilter)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Button AND/OR clicking action', () => {
    wrapper.find('#button-or').trigger('click').then(() => {
      expect(mockedProps.selectedFilter.andOrOr).toEqual('and')
      setFieldMocking(1, 'andOrOr', 'or')
      expect(mockedProps.selectedFilter.andOrOr).toEqual('or')
    })

    wrapper.find('#button-and').trigger('click').then(() => {
      expect(mockedProps.selectedFilter.andOrOr).toEqual('or')
      setFieldMocking(1, 'andOrOr', 'and')
      expect(mockedProps.selectedFilter.andOrOr).toEqual('and')
    })
  })
})
