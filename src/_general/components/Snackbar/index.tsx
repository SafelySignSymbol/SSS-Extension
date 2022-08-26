import { useEffect, useState } from 'react'
import { ImCheckmark, ImInfo, ImNotification, ImWarning } from 'react-icons/im'
import styled from '@emotion/styled'
import { IconContext } from 'react-icons'
import Color from '../../utils/Color'
import { keyframes } from '@emotion/react'

export interface SnackbarProps {
  isOpen: boolean
  snackbarMessage: string
  snackbarStatus: SnackbarType
}

export enum SnackbarType {
  ERROR = 'error',
  WARN = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
  DEFAULT = 'default',
}

export const Snackbar = ({
  isOpen,
  snackbarMessage,
  snackbarStatus,
}: SnackbarProps) => {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [clr, setClr] = useState('')

  useEffect(() => {
    setMsg(snackbarMessage)
    setClr(snackbarStatus)
    setOpen(isOpen)
    setTimeout(() => {
      closeSnackbar()
    }, 6000)
  }, [isOpen, snackbarMessage, snackbarStatus])

  const closeSnackbar = () => {
    setOpen(false)
    setMsg('')
  }

  const getIcon = () => {
    switch (clr) {
      case SnackbarType.ERROR:
        return <ImNotification style={{ color: Color.base_white }} />
      case SnackbarType.WARN:
        return <ImWarning style={{ color: Color.base_white }} />
      case SnackbarType.INFO:
        return <ImInfo style={{ color: Color.base_white }} />
      case SnackbarType.SUCCESS:
        return <ImCheckmark style={{ color: Color.base_white }} />
      case SnackbarType.DEFAULT:
        return <ImInfo style={{ color: Color.base_white }} />
      default:
        return <ImInfo style={{ color: Color.base_white }} />
    }
  }

  const color = (() => {
    switch (clr) {
      case SnackbarType.ERROR:
        return Color.alert.error
      case SnackbarType.WARN:
        return Color.alert.warning
      case SnackbarType.INFO:
        return Color.alert.info
      case SnackbarType.SUCCESS:
        return Color.alert.success
      case SnackbarType.DEFAULT:
        return Color.alert.default
      default:
        return Color.alert.default
    }
  })()

  if (!open) {
    return null
  } else {
    return (
      <Root>
        <IconWrapper color={color}>
          <IconContext.Provider value={{ size: '20px' }}>
            {getIcon()}
          </IconContext.Provider>
        </IconWrapper>
        <Text>{msg}</Text>
      </Root>
    )
  }
}

const feedIn = keyframes({
  '0%': {
    opacity: 0,
    top: '34px',
  },
  '50%': {
    opacity: 1,
    top: '34px',
  },
  '75%': {
    top: '30px',
  },
  '100%': {
    top: '32px',
  },
})

const Root = styled('span')({
  position: 'absolute',
  top: '32px',
  right: '48px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  background: Color.base_black,
  boxShadow: '5px 5px 5px 0px rgba(100,100,100,0.6)',
  borderRadius: '10px',
  minWidth: '300px',
  animation: `${feedIn} 2s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,
})

const Text = styled('div')({
  paddingRight: '16px',
  paddingLeft: '16px',
  fontSize: '12px',
  color: Color.base_white,
  borderRadius: '0px 10px 10px 0px',
  marginBottom: '1px',
})

const IconWrapper = styled('div')((p: { color: string }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: p.color,
  padding: '16px',
  borderRadius: '10px 0px 0px 10px',
  borderRight: `1px solid ${Color.base_white}`,
}))
