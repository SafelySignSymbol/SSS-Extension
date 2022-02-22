import styled from '@emotion/styled'
import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { GoHome } from 'react-icons/go'
import { BsClockHistory } from 'react-icons/bs'
import { RiSettings2Fill } from 'react-icons/ri'
import { MdOutlineDomainVerification } from 'react-icons/md'
import Button from '../_general/components/Button'
import Logo from '../_general/components/Logo'
import Spacer from '../_general/components/Spacer'

import Accounts from './pages/Accounts'

type Page = 'SETTING' | 'HISTORY' | 'ALLOW' | 'HOME'

const Options: React.VFC = () => {
  const [page, setPage] = useState<Page>('HOME')

  const getBody = () => {
    if (page === 'SETTING') {
    }

    if (page === 'HISTORY') {
    }

    if (page === 'ALLOW') {
    }

    if (page === 'HOME') {
      return <Accounts />
    }
  }
  return (
    <Root>
      <Container>
        <Logo onClick={() => console.log('')} />
        <Box sx={{ flexGrow: 1, height: '1px' }} />
        <Spacer margin="8px">
          <Button text="ADD ACCOUNT" onClick={() => console.log('')} />
        </Spacer>
      </Container>
      <Contents>
        <Sideber>
          <IconButton size="small" onClick={() => console.log('')}>
            <IconContext.Provider value={{ size: '48px' }}>
              <GoHome style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
          <IconButton size="small" onClick={() => console.log('')}>
            <IconContext.Provider value={{ size: '48px' }}>
              <BsClockHistory style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
          <IconButton size="small" onClick={() => console.log('')}>
            <IconContext.Provider value={{ size: '48px' }}>
              <MdOutlineDomainVerification style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
          <IconButton size="small" onClick={() => console.log('')}>
            <IconContext.Provider value={{ size: '48px' }}>
              <RiSettings2Fill style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Sideber>
        {getBody()}
      </Contents>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  height: '100vh',
})

const Container = styled('div')({
  display: 'flex',
  height: '64px',
})

const Sideber = styled('div')({
  height: 'calc(100vh - 64px)',
  minWidth: '64px',
  maxWidth: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
})

const Contents = styled('div')({
  display: 'flex',
})
