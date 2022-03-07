import React from 'react'
import { Story, Meta } from '@storybook/react'

import Header, { Props } from './Header'

export default {
  title: 'Components/Header',
  component: Header,
} as Meta

const Template: Story<Props> = (args) => <Header {...args} />

export const HOME = Template.bind({})
HOME.args = {
  page: 'HOME',
}
export const SETTING = Template.bind({})
SETTING.args = {
  page: 'SETTING',
}
export const HISTORY = Template.bind({})
HISTORY.args = {
  page: 'HISTORY',
}
export const ALLOW = Template.bind({})
ALLOW.args = {
  page: 'ALLOW',
}
