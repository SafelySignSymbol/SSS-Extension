import Component, { Props } from './index'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'UI/Logo',
  component: Component,
} as Meta

const Template: Story<Props> = (args) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: () => console.log('click'),
}
