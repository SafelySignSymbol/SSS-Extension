import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import Home from './pages/Home'
import Header from './components/Header'
import AccountModal from './components/AccountModal'
import { getActiveAccount } from '../_general/lib/Storage'

export type Page = 'SETTING' | 'HISTORY' | 'ALLOW' | 'HOME' | 'ACCOUNTS'

const Options: React.VFC = () => {
  const [page, setPage] = useState<Page>('HOME')

  const [openModal, setOpenModal] = useState(false)

  const [update, setUpdate] = useState(new Date())

  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) setOpenModal(true)
      setUpdate(new Date())
    })
  }, [])

  const reload = () => {
    setUpdate(new Date())
  }

  const getBody = () => {
    if (page === 'SETTING') {
    }

    if (page === 'HISTORY') {
    }

    if (page === 'ALLOW') {
    }
    if (page === 'ACCOUNTS') {
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
