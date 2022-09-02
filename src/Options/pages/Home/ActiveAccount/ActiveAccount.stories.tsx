import React from 'react'
import { Story, Meta } from '@storybook/react'

import ActiveAccount, { Props } from '.'
import { Address } from 'symbol-sdk'

export default {
  title: 'Option/ActiveAccount',
  component: ActiveAccount,
} as Meta

const Template: Story<Props> = (args) => <ActiveAccount {...args} />

export const Main = Template.bind({})
Main.args = {
  address: Address.createFromRawAddress(
    'NAW7L44MVKCVBM6IGEBXLF2K7JYKEP6R5XMCEZA'
  ),
  name: 'inatatsu test wallet',
}
