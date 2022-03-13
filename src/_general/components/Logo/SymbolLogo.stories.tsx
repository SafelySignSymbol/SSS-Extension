import Component, { Props } from './SymbolLogo'
import { Story, Meta } from '@storybook/react'

export default {
  title: 'UI/Logo',
  component: Component,
} as Meta

const Template: Story<Props> = (args) => <Component {...args} />

export const Symbol = Template.bind({})
Symbol.args = {
  onClick: () => console.log('click'),
}
