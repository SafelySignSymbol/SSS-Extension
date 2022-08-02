import React from 'react'
import { Story, Meta } from '@storybook/react'

import AccountModal, { Props } from './AccountModal'

export default {
  title: 'Components/AccountModal',
  component: AccountModal,
} as Meta

const Template: Story<Props> = (args) => <AccountModal {...args} />

export const State1 = Template.bind({})
State1.args = {
  state: 1,
}
export const State2 = Template.bind({})
State2.args = {
  state: 2,
}
export const State3 = Template.bind({})
State3.args = {
  state: 3,
}
export const Close = Template.bind({})
Close.args = {
  state: 0,
}
