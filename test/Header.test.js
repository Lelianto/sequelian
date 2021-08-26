import { mount } from '@vue/test-utils'
import { beforeEach, expect } from '@jest/globals'
import HeaderNav from '@/components/Header/Header.vue'

describe('Header Navigation', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(HeaderNav)
  })
  test('Header Nav is Exist', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('Header Nav contain title', () => {
    const title = wrapper.find('#main-title')
    expect(title.text()).toEqual('Sequelian')
  })
  test('Header Nav contain logo', () => {
    const logo = wrapper.find('#main-image')
    expect(logo.html()).toContain('img')
  })
})
