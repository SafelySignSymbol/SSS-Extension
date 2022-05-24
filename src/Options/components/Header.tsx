import React, { Dispatch } from 'react'
import styled from '@emotion/styled'
import { Box, Divider } from '@mui/material'
import Logo from '../../_general/components/Logo'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { Page } from '../index'

import { useTranslation } from 'react-i18next'

export interface Props {
  page: Page
  setPage: Dispatch<Page>
  handleOpen: () => void
}

const Component: React.VFC<Props> = ({ page, setPage, handleOpen }) => {
  const [t] = useTranslation()

  return (
    <Container>
      <Spacer margin="0px 64px">
        <Logo onClick={() => setPage('HOME')} />
      </Spacer>
      <Box sx={{ flexGrow: 1, height: '1px' }} />
      <Spacer margin="0px 16px">
        <Flex>
          <Item isOpen={page === 'HOME'} onClick={() => setPage('HOME')}>
            {t('home')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item
            isOpen={page === 'ACCOUNTS'}
            onClick={() => setPage('ACCOUNTS')}>
            {t('account')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item isOpen={page === 'ALLOW'} onClick={() => setPage('ALLOW')}>
            {t('allowlist')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item isOpen={page === 'SETTING'} onClick={() => setPage('SETTING')}>
            {t('settings')}
          </Item>
        </Flex>
      </Spacer>
      <Spacer margin="0px 64px">
        <Button text={t('add_account')} onClick={handleOpen} />
      </Spacer>
    </Container>
  )
}

export default Component

const Container = styled('div')({
  display: 'flex',
  height: '80px',
  alignItems: 'center',
  background: 'white',
})
const Flex = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const Item = styled('div')((p: { isOpen: boolean }) => ({
  margin: '0px 24px',
  cursor: 'pointer',
  padding: '4px 0px',
  fontSize: '18px',
  ':after': p.isOpen
    ? {
        content: '""',
        background: 'black', //'linear-gradient(to right, #B429F9 0%, #3EABF4 100%)'
        display: 'block',
        height: '1px',
        width: '100%',
      }
    : {
        content: '""',
        background: 'black', //'linear-gradient(to right, #B429F9 0%, #3EABF4 100%)'
        display: 'block',
        height: '1px',
        width: '100%',
        transform: 'scale(0, 1)',
        transformOrigin: 'center top',
        transition: 'transform .3s',
      },

  ':hover': {
    ':after': {
      transform: 'scale(1, 1)',
    },
  },
}))

// .mail-title-box:after {
//   content: '';
//   background: 'red';
//   display: 'block';
//   height: '4px';
//   width: '100%'
// }
