import { useEffect, useState } from 'react'

import { Alert, AlertColor, Snackbar as MSnackbar } from '@mui/material'

export interface SnackbarProps {
  isOpen: boolean
  snackbarMessage: string
  snackbarStatus: AlertColor
}
export const Snackbar = ({
  isOpen,
  snackbarMessage,
  snackbarStatus,
}: SnackbarProps) => {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [clr, setClr] = useState<AlertColor>('success')

  useEffect(() => {
    setOpen(isOpen)
    setMsg(snackbarMessage)
    setClr(snackbarStatus)
  }, [isOpen, snackbarMessage, snackbarStatus])

  const closeSnackbar = () => {
    setOpen(false)
    setMsg('')
    setClr('success')
  }

  return (
    <MSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={clr} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </MSnackbar>
  )
}
