import React from 'react'
import { Story, Meta } from '@storybook/react'

import Page, { Props } from './Presenter'

export default {
  title: 'Pages/Options',
  component: Page,
} as Meta

const Template: Story<Props> = (args) => <Page {...args} />

export const Default = Template.bind({})
Default.args = {}
