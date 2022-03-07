import React from 'react'
import { Story, Meta } from '@storybook/react'

import TransactionHistory, { Props } from '.'
import { Address } from 'symbol-sdk'

export default {
  title: 'Option/TransactionHistory',
  component: TransactionHistory,
} as Meta

const Template: Story<Props> = (args) => <TransactionHistory {...args} />

export const Main = Template.bind({})
Main.args = {
  address: Address.createFromRawAddress(
    'NAW7L44MVKCVBM6IGEBXLF2K7JYKEP6R5XMCEZA'
  ),
}
export const Test = Template.bind({})
Test.args = {
  address: Address.createFromRawAddress(
    'TD55KXAFNATAHOPEDST2V4MLOL43DGCELZS6PGA'
  ),
}
