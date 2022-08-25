import React, { useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiAddFill } from 'react-icons/ri'
import { BsClipboardCheck, BsXSquare } from 'react-icons/bs'
import { addAllowList, deleteAllowList } from '../../../_general/lib/Storage'

import Spacer from '../../../_general/components/Spacer'

import { useTranslation } from 'react-i18next'
import TextField from '../../../_general/components/TextField'
import Color from '../../../_general/utils/Color'
import {
  Snackbar,
  SnackbarProps,
  SnackbarType,
} from '../../../_general/components/Snackbar'
export type Props = {
  allowlist: string[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ allowlist, reload }) => {
  const [t] = useTranslation()
  const [domainName, setDomainName] = useState('')

  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  const deny = (num: number) => {
    deleteAllowList(num).then(() => {
      reload()
    })
  }

  const allow = () => {
    addAllowList(domainName).then(() => {
      reload()
    })
  }

  if (allowlist.length === 0)
    return (
      <Wrapper>
        {/* <Text>{t('allowlist_howuse_e')}</Text> */}
        <Spacer MBottom="20px">
          <Wrap>
            <TFWrapper>
              <TextField
                label="Domain Name"
                setText={setDomainName}
                variant="text"
              />
            </TFWrapper>
            <IconButton size="small" onClick={allow}>
              <IconContext.Provider value={{ size: '24px' }}>
                <RiAddFill style={{ margin: '6px' }} />
              </IconContext.Provider>
            </IconButton>
          </Wrap>
        </Spacer>
      </Wrapper>
    )

  return (
    <Wrapper>
      <Spacer MBottom="20px">
        <Wrap>
          <TFWrapper>
            <TextField
              label="Domain Name"
              setText={setDomainName}
              variant="text"
            />
          </TFWrapper>
          <IconButton size="small" onClick={allow}>
            <IconContext.Provider value={{ size: '24px' }}>
              <RiAddFill style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Wrap>
      </Spacer>
      <Snackbar
        isOpen={snackbar.isOpen}
        snackbarMessage={snackbar.snackbarMessage}
        snackbarStatus={snackbar.snackbarStatus}
      />
      {allowlist.map((e, i) => {
        return (
          <Wrap key={i}>
            <Typography text={e} fontSize={24} />
            <IconWrapper>
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(e).then(() => {
                    setSnackbar({
                      isOpen: true,
                      snackbarMessage: t('alert_copy_success'),
                      snackbarStatus: SnackbarType.SUCCESS,
                    })
                  })
                }}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <BsClipboardCheck style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
              <IconButton size="small" onClick={() => deny(i)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <BsXSquare style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </IconWrapper>
          </Wrap>
        )
      })}
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  display: 'flex',
  flexFlow: 'column wrap',
})

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'white',
  padding: '16px 32px',
  margin: '8px',
  borderBottom: `solid 1px ${Color.grayscale}`,
})
const IconWrapper = styled('div')({
  '> :nth-child(1)': {
    marginRight: '16px',
  },
})

const TFWrapper = styled('div')({
  width: '100%',
  marginBottom: '12px',
  '& > div': {
    width: '100%',
  },
})
