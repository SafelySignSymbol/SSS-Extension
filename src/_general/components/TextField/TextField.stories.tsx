import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { Props } from './index'

export default {
  title: 'Elements/TextField',
  component: Component,
} as Meta

const Template: Story<Props> = (args) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'TextField',
}
