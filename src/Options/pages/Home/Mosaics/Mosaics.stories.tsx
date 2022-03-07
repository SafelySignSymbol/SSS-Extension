import React from 'react'
import { Story, Meta } from '@storybook/react'

import Mosaics, { Props } from '.'
import { Address } from 'symbol-sdk'

export default {
  title: 'Option/Mosaics',
  component: Mosaics,
} as Meta

const Template: Story<Props> = (args) => <Mosaics {...args} />

export const Main = Template.bind({})
Main.args = {
  address: Address.createFromRawAddress(
    'TBNXEEHPLX37CHYORRQRD6LJBQ4JI7EKFNTOH5Y'
  ),
}
