import { shallowMount } from '@vue/test-utils'
import { beforeEach } from '@jest/globals'
import RightCard from '@/components/Card/RightCard/RightCard.vue'

const mockProps = {
  queries: [
    {
      id: 1,
      text: 'SELECT * FROM products'
    },
    {
      id: 2,
      text: 'SELECT * FROM customers'
    }
  ],
  env: 'test'
}

describe('Right Card Menu', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(RightCard)
    wrapper.setProps(mockProps)
  })

  test('Right Card contain title', () => {
    const title = wrapper.find('#card-title')
    expect(title.text()).toEqual('SQL Statement')
  })

  test('Right Card contain sub-title', () => {
    const subtitle = wrapper.find('#card-subtitle')
    expect(subtitle.text()).toEqual('Click on any of the queries below to see it in action.')
  })
})
