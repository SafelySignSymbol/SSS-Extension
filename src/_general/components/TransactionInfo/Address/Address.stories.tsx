import React from 'react'
import { Story, Meta } from '@storybook/react'

import Button, { Props } from './index'
import { Address } from 'symbol-sdk'

export default {
  title: 'TransactionInfo/Address',
  component: Button,
} as Meta

const Template: Story<Props> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  address: Address.createFromRawAddress(
    'TBNXEEHPLX37CHYORRQRD6LJBQ4JI7EKFNTOH5Y'
  ),
}
