import React from 'react'
import { Story, Meta } from '@storybook/react'

import AccountModal, { Props } from './AccountModal'

export default {
  title: 'Components/AccountModal',
  component: AccountModal,
} as Meta

const Template: Story<Props> = (args) => <AccountModal {...args} />

export const Open = Template.bind({})
Open.args = {
  open: true,
}
