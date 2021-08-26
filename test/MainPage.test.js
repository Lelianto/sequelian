import { shallowMount, createLocalVue } from '@vue/test-utils'
import { beforeEach, expect } from '@jest/globals'
import ElementUI from 'element-ui'
import VueHighlightJS from 'vue-highlightjs'
import MainPage from '@/pages/index.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(VueHighlightJS)

describe('MainPage Testing', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MainPage, { localVue }, {})
    wrapper.setData({ env: 'test' })
  })
  test('MainPage is Exist', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
