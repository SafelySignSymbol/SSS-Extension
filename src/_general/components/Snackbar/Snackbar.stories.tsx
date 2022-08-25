import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Snackbar, SnackbarProps, SnackbarType } from './index'

export default {
  title: 'Elements/Snackbar',
  component: Snackbar,
} as Meta

const Template: Story<SnackbarProps> = (args) => <Snackbar {...args} />

export const Close = Template.bind({})
Close.args = {
  isOpen: false,
}

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  snackbarMessage: 'Snackbarを表示します',
  snackbarStatus: SnackbarType.DEFAULT,
}
export const Success = Template.bind({})
Success.args = {
  isOpen: true,
  snackbarMessage: 'Snackbarを表示します',
  snackbarStatus: SnackbarType.SUCCESS,
}

export const Error = Template.bind({})
Error.args = {
  isOpen: true,
  snackbarMessage: 'Snackbarを表示します',
  snackbarStatus: SnackbarType.ERROR,
}

export const Warning = Template.bind({})
Warning.args = {
  isOpen: true,
  snackbarMessage: 'Snackbarを表示します',
  snackbarStatus: SnackbarType.WARN,
}

export const Info = Template.bind({})
Info.args = {
  isOpen: true,
  snackbarMessage: 'Snackbarを表示します',
  snackbarStatus: SnackbarType.INFO,
}
export const ShortText = Template.bind({})
ShortText.args = {
  isOpen: true,
  snackbarMessage: 'Short Text',
  snackbarStatus: SnackbarType.INFO,
}
export const LongText = Template.bind({})
LongText.args = {
  isOpen: true,
  snackbarMessage: 'Copy Address :  TC5FGDJ7K7N2T5DVSYDDC7PD64O3QPCKEPQF6XQ ',
  snackbarStatus: SnackbarType.INFO,
}
