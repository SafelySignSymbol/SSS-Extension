import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import Home from './pages/Home'
import Header from './components/Header'
import AccountModal from './components/AccountModal'
import { getActiveAccount } from '../_general/lib/Storage'
import Settings from './pages/Settings'
import Allow from './pages/Allow'
import Accounts from './pages/Accounts'
import History from './pages/History'

export type Page = 'SETTING' | 'HISTORY' | 'ALLOW' | 'HOME' | 'ACCOUNTS'

const Options: React.VFC = () => {
  const [page, setPage] = useState<Page>('HOME')

  const [openModal, setOpenModal] = useState(false)

  const [update, setUpdate] = useState(new Date())

  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) setOpenModal(true)
      // setUpdate(new Date())
    })
  }, [])

  const reload = () => {
    setUpdate(new Date())
  }

  const getBody = () => {
    if (page === 'SETTING') {
      return <Settings reload={reload} update={update} />
    }

    if (page === 'HISTORY') {
      return <History reload={reload} update={update} />
    }

    if (page === 'ALLOW') {
      return <Allow reload={reload} update={update} />
    }
    if (page === 'ACCOUNTS') {
      return <Accounts reload={reload} update={update} />
    }

    if (page === 'HOME') {
      return <Home reload={reload} update={update} />
    }
  }

  const handleOpen = () => {
    setOpenModal(true)
    reload()
  }
  return (
    <Root>
      <Header page={page} setPage={setPage} handleOpen={handleOpen} />
      <AccountModal open={openModal} setOpen={setOpenModal} reload={reload} />
      <Contents>{getBody()}</Contents>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  height: '100vh',
})

const Contents = styled('div')({
  display: 'flex',
})
