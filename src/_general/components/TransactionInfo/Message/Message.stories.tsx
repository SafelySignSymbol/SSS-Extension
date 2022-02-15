import React from 'react'
import { Story, Meta } from '@storybook/react'

import Button, { Props } from './index'
import { Address, PlainMessage } from 'symbol-sdk'

export default {
  title: 'TransactionInfo/Message',
  component: Button,
} as Meta

const Template: Story<Props> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  message: PlainMessage.create('message'),
}
