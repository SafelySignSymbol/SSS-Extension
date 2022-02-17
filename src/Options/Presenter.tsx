import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Box, Grid } from '@mui/material'

import Spacer from '../_general/components/Spacer'
import Button from '../_general/components/Button'

import {
  getActiveAccount,
  getAllowList,
  getExtensionAccounts,
  getHistory,
} from '../_general/lib/Storage'
import { ExtensionAccount } from '../_general/model/ExtensionAccount'
import AccountList from './components/AccountList'
import AccountCard from './components/AccountCard'
import AccountModal from './components/AccountModal'
import Logo from '../_general/components/Logo'
import Typography from '../_general/components/Typography'
import AllowList from './components/AllowList'
import { SignedTransaction } from 'symbol-sdk'

const Options: React.VFC = () => {
  const [openModal, setOpenModal] = useState(false)

  const [account, setAccount] = useState<ExtensionAccount | null>(null)
  const [extensionAccounts, setExtensionAccounts] = useState<
    ExtensionAccount[]
  >([])
  const [allowList, setAllowList] = useState<string[]>([])
  const [history, setHistory] = useState<SignedTransaction[]>([])

  const [update, setUpdate] = useState(new Date())

  const reload = () => {
    setUpdate(new Date())
  }

  useEffect(() => {
    getActiveAccount().then((acc) => {
      setAccount(acc)
      if (acc === null) setOpenModal(true)
    })
    getExtensionAccounts().then((accounts) => {
      setExtensionAccounts(accounts)
    })
    getAllowList().then((al) => {
      setAllowList(al)
    })
    getHistory().then((his) => {
      setHistory(his)
    })
  }, [update])

  const clickAddButton = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <Container>
        <Logo onClick={() => console.log('')} />
        <Box sx={{ flexGrow: 1, height: '1px' }} />
        <Spacer margin="8px">
          <Button text="ADD ACCOUNT" onClick={clickAddButton} />
        </Spacer>
      </Container>
      <Wrapper>
        <Grid container>
          <Grid item xs={4}>
            <Spacer MTop="32px">
              {account !== null && (
                <AccountCard
                  address={account.address}
                  publicKey={account.publicKey}
                  isActive
                  header={
                    <Center>
                      <Typography variant="h4" text="Active Account" />
                    </Center>
                  }
                />
              )}
            </Spacer>
            <Spacer MTop="32px">
              <AllowList allowlist={allowList} reload={reload} />
            </Spacer>
          </Grid>
          <Grid item xs={8}>
            <Spacer margin="0px 16px">
              <AccountList
                extensionAccounts={extensionAccounts}
                reload={reload}
              />
            </Spacer>
          </Grid>
          <AccountModal
            open={openModal}
            setOpen={setOpenModal}
            reload={reload}
          />
        </Grid>
      </Wrapper>
    </div>
  )
}

export default Options

const Container = styled('div')({
  display: 'flex',
  height: '64px',
})

const Wrapper = styled('div')({
  margin: '32px 80px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
