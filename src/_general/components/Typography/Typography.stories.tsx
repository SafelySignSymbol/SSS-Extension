import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { Props } from './index'
import Color from '../../utils/Color'

export default {
  title: 'Elements/Typography',
  component: Component,
} as Meta

const Template: Story<Props> = (args) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'Typography',
}
export const Gray = Template.bind({})
Gray.args = {
  text: 'Typography',
  color: Color.grayscale,
}
