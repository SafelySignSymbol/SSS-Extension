import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import { SquareLogo } from '../../_general/components/Logo/'
import {
  Chip,
  IconButton,
  List,
  ListItemButton,
  Modal,
  Paper,
} from '@mui/material'
import { IconContext } from 'react-icons'
import { MdSupervisorAccount } from 'react-icons/md'
import Typography from '../../_general/components/Typography'
import Button from '../../_general/components/Button'
import Color, { addAlpha } from '../../_general/utils/Color'
import Spacer from '../../_general/components/Spacer'
import TransactionInfo from './components/TransactionInfo'
import {
  addHistory,
  getData,
  getExtensionAccounts,
  resetLocalSession,
  setActiveAccount,
} from '../../_general/lib/Storage'
import { TransactionURI } from 'symbol-uri-scheme'
import {
  Address,
  Convert,
  EncryptedMessage,
  SignedTransaction,
  Transaction,
  TransactionMapping,
} from 'symbol-sdk'
import NotFoundTx from './components/NotFoundTx'
import {
  ENCRYPTED_MESSAGE,
  MESSAGE,
  TRANSACTION,
} from '../../_general/model/Data'
import {
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  REQUEST_MESSAGE_DECODE,
  REQUEST_MESSAGE_ENCODE,
  REQUEST_SIGN,
  SIGN_TRANSACTION,
} from '../../_general/model/MessageType'
import MessageEncription from './components/MessageEncription'
import { getNetworkTypeByAddress } from '../../_general/lib/Symbol/Config'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { SymbolLedger, LedgerNetworkType } from 'symbol-ledger-typescript'
import { useTranslation } from 'react-i18next'
import { EncriptionMessage } from '../../_general/model/EncriptionMessage'
import MessageDecription from './components/MessageDecription'

export interface Props {
  extensionAccount: ExtensionAccount
  type: string
  signTx: (tx: Transaction | null) => void
  encriptMessage: (message: string, pubkey: string) => void
  decriptMessage: (message: EncriptionMessage, pubkey: string) => void
  logout: () => void
}

const Main: React.VFC<Props> = ({
  extensionAccount,
  type,
  signTx,
  encriptMessage,
  decriptMessage,
  logout,
}) => {
  const [transaction, setTransaction] = useState<string>('')
  const [enMsg, setEnMsg] = useState<EncriptionMessage | null>(null)
  const [open, setOpen] = useState(false)
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([])

  const [t] = useTranslation()

  useEffect(() => {
    getData().then((data) => {
      if (data.dataType === TRANSACTION && !!data.transaction) {
        setTransaction(data.transaction)
      }
      if (data.dataType === MESSAGE && !!data.message) {
        setEnMsg(
          new EncriptionMessage(data.message.msg, data.message.publicKey)
        )
      }
      if (data.dataType === ENCRYPTED_MESSAGE && !!data.message) {
        setEnMsg(
          new EncriptionMessage(data.message.msg, data.message.publicKey)
        )
      }

      getExtensionAccounts().then((accs) => {
        setAccounts(accs)
      })

      if (extensionAccount.type === 'HARD') {
        TransportWebHID.create(5000, 5000).then(async (transport) => {
          const ledger = new SymbolLedger(transport, 'XYM')
          try {
            const ledgerNetworkType = LedgerNetworkType.MAIN_NET
            const path = extensionAccount.encriptedPrivateKey
            const publicKey = await ledger.getAccount(
              path,
              ledgerNetworkType,
              false,
              false,
              false
            )
            const gh = extensionAccount.getGenerationHash()

            const t = data.transaction || ''
            const tx = TransactionURI.fromURI(
              t,
              TransactionMapping.createFromPayload
            ).toTransaction()

            if (type === REQUEST_SIGN) {
              ledger
                .signTransaction(path, tx, gh, publicKey, false)
                .then(({ payload }) => {
                  const signedTx = new SignedTransaction(
                    payload,
                    Transaction.createTransactionHash(
                      payload,
                      Array.from(Convert.hexToUint8(gh))
                    ),
                    publicKey,
                    tx.type,
                    tx.networkType
                  )

                  addHistory(signedTx)
                  chrome.runtime.sendMessage({
                    type: SIGN_TRANSACTION,
                    signedTx: signedTx,
                  })
                })
            } else {
              setTimeout(() => {
                window.close()
              }, 1000)
            }
            // if (type === REQUEST_SIGN_COSIGNATURE) {
            //   const hash = Transaction.createTransactionHash(
            //     t,
            //     Array.from(Convert.hexToUint8(gh))
            //   )
            //   ledger
            //     .signCosignatureTransaction(path, tx, hash, publicKey, false)
            //     .then((data) => {
            //       console.log(data)
            //     })
            // }
            // if (type === REQUEST_SIGN_WITH_COSIGNATORIES) {
            //   ledger
            //     .signTransaction(path, tx, gh, publicKey, false)
            //     .then(({ payload }) => {
            //       const signedTx = new SignedTransaction(
            //         payload,
            //         Transaction.createTransactionHash(
            //           payload,
            //           Array.from(Convert.hexToUint8(gh))
            //         ),
            //         publicKey,
            //         tx.type,
            //         tx.networkType
            //       )
            //       addHistory(signedTx)
            //       chrome.runtime.sendMessage({
            //         type: SIGN_TRANSACTION,
            //         signedTx: signedTx,
            //       })
            //     })
            // }
          } catch {
          } finally {
            await ledger.close()
            setTimeout(() => {
              window.close()
            }, 1000)
          }
        })
      }
    })
  }, [extensionAccount, type])

  const hundleClick = () => {
    console.log({ type })
    if (
      (type === REQUEST_MESSAGE_ENCODE ||
        type === REQUEST_ACTIVE_ACCOUNT_TOKEN) &&
      enMsg !== null
    ) {
      encriptMessage(enMsg.message, enMsg.pubkey)
    } else if (type === REQUEST_MESSAGE_DECODE && enMsg !== null) {
      decriptMessage(enMsg, enMsg.pubkey)
    } else {
      const tx = TransactionURI.fromURI(
        transaction,
        TransactionMapping.createFromPayload
      ).toTransaction()
      signTx(tx)
    }
    setTimeout(() => {
      window.close()
    }, 1000)
  }

  const contents = () => {
    if (type === REQUEST_MESSAGE_ENCODE && enMsg !== null) {
      return (
        <Contents>
          <MessageEncription message={enMsg.message} />
        </Contents>
      )
    }
    if (type === REQUEST_MESSAGE_DECODE && enMsg !== null) {
      return (
        <Contents>
          <MessageDecription />
        </Contents>
      )
    }
    if (type === REQUEST_ACTIVE_ACCOUNT_TOKEN && enMsg !== null) {
      const addr = Address.createFromPublicKey(
        enMsg.pubkey,
        getNetworkTypeByAddress(extensionAccount.address)
      )
      return (
        <Contents>
          <Center>
            <M>
              <Typography text={t('authntication_to')} fontSize={48} />
            </M>
            <Typography text={addr.plain().substring(0, 19)} fontSize={32} />
            <Typography text={addr.plain().substring(19)} fontSize={32} />
          </Center>
        </Contents>
      )
    }
    return (
      <Contents>
        {transaction !== '' ? (
          <TransactionInfo transaction={transaction} />
        ) : (
          <NotFoundTx />
        )}
      </Contents>
    )
  }

  const handleClick = (i: number) => {
    setActiveAccount(i).then(() => {
      resetLocalSession()
      logout()
    })
  }

  return (
    <Container>
      <Header>
        <SquareLogo onClick={() => console.log('')} />
        <Grid>
          <Typography text={extensionAccount.address} fontSize={24} />
        </Grid>
        <IconButton onClick={() => setOpen(true)}>
          <IconContext.Provider value={{ size: '32px' }}>
            <MdSupervisorAccount style={{ margin: '6px' }} />
          </IconContext.Provider>
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <SPaper>
            <Typography fontSize={20} text={t('change_account')} />
            <List
              sx={{
                width: '100%',
                maxHeight: 400,
                position: 'relative',
                overflow: 'auto',
              }}>
              {accounts.map((a, i) => {
                return (
                  <SListItem onClick={() => handleClick(i)} key={a.address}>
                    <Typography fontSize={24} text={a.name} />
                    <Chip
                      label={
                        getNetworkTypeByAddress(a.address) === 152
                          ? 'TEST NET'
                          : 'MAIN NET'
                      }
                    />
                  </SListItem>
                )
              })}
            </List>
          </SPaper>
        </Modal>
      </Header>
      {contents()}
      <Footer>
        <Spacer margin="8px">
          {extensionAccount.type === 'HARD' ? (
            <Typography
              fontSize={16}
              text="Please approve it in the hardware wallet"
            />
          ) : (
            <Button text="SIGN" onClick={hundleClick} />
          )}
        </Spacer>
      </Footer>
    </Container>
  )
}

export default Main

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

const M = styled('div')({
  marginBottom: '32px',
})

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Header = styled('div')({
  display: 'flex',
  height: '64px',
  margin: '8px',
  justifyContent: 'space-between',
})

const Contents = styled('div')({
  margin: '16px 32px',
  width: 'calc(100% - 64px)',
  height: '408px',
  border: 'solid ' + addAlpha(Color.blue, 0.4),
  borderWidth: '4px 0px 4px 4px',
  boxSizing: 'border-box',
  overflowY: 'scroll',
  '::-webkit-scrollbar-track': {
    background: addAlpha(Color.blue, 0.4),
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    background: addAlpha(Color.blue, 0.9),
  },
  '::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '4px',
  },
})

const Grid = styled('div')({
  display: 'grid',
  alignItems: 'center',
})

const Footer = styled('div')({
  display: 'flex',
  height: '64px',
  margin: '8px',
  justifyContent: 'center',
})

const SPaper = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70vw',
  transform: 'translate(-50%, -50%)',
  padding: '16px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const SListItem = styled(ListItemButton)({
  margin: '16px',
  display: 'flex',
  justifyContent: 'space-between',
})
