import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import Typography from '../../_general/components/Typography'
import { Address } from 'symbol-sdk'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { checkPassword } from '../../_general/lib/validator'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'
import { useTranslation } from 'react-i18next'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { SymbolLedger, LedgerNetworkType } from 'symbol-ledger-typescript'
import { Snackbar, SnackbarType } from '../../_general/components/Snackbar'
import {
  checkLoginSession,
  getSession,
  resetLocalSession,
} from '../../_general/lib/Storage'
import { decrypt, encrypt } from '../../_general/lib/Crypto'

export interface Props {
  extensionAccount: ExtensionAccount
  loginSuccess: (pass: string) => void
}

const Login: React.VFC<Props> = ({ extensionAccount, loginSuccess }) => {
  const [pass, setPass] = useState('')
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(0)

  const [t] = useTranslation()

  useEffect(() => {
    if (extensionAccount.type === 'HARD') {
      const timer = setInterval(() => {
        connectHardwareWallet()
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    } else {
      getSession().then((data) => {
        setSession(data)

        if (0 < data) {
          const login_session = JSON.parse(
            localStorage.getItem('login_session') || '{}'
          )
          if (checkLoginSession()) {
            const p = decrypt(
              login_session.sessionPass,
              String(login_session.session)
            )
            setPass(p)
            login(p)
          } else {
            resetLocalSession()
          }
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const address = Address.createFromRawAddress(
    extensionAccount.address
  ).pretty()

  const login = (p: string) => {
    const check = checkPassword(
      extensionAccount.encriptedPrivateKey,
      p,
      extensionAccount.address
    )
    if (check) {
      loginSuccess(p)
      if (0 < session) {
        const now = new Date().getTime()
        const s = now + session
        const sessionPass = encrypt(p, String(s))
        localStorage.setItem(
          'login_session',
          JSON.stringify({
            session: s,
            sessionPass: sessionPass,
          })
        )
      }
    } else {
      setOpen(true)
    }
  }

  const connectHardwareWallet = () => {
    TransportWebHID.create(100, 100).then(async (transport) => {
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

        if (publicKey === extensionAccount.publicKey) {
          loginSuccess(path)
        }
      } catch {
      } finally {
        await ledger.close()
      }
    })
  }

  useEffect(() => {
    if (extensionAccount.type === 'NOPASS') {
      login(pass)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensionAccount.type])

  if (extensionAccount.type === 'HARD') {
    return (
      <Container>
        <Spacer margin="16px 8px">
          <Spacer margin="32px 0px">
            <Wrapper>
              <Typography text="Login" fontSize={32} />
            </Wrapper>
          </Spacer>
          <Spacer margin="16px 0px">
            <Container>
              <Typography text={extensionAccount.name} fontSize={28} />
              <Typography text={address} fontSize={20} />
            </Container>
          </Spacer>
          <Wrapper>
            <Typography
              text="1. ハードウェアウォレットを接続してください"
              fontSize={20}
            />
          </Wrapper>
          <Wrapper>
            <Typography
              text="2. Symbolアプリを起動してください"
              fontSize={20}
            />
          </Wrapper>
        </Spacer>
      </Container>
    )
  }

  return (
    <Container>
      <Spacer margin="16px 8px">
        <Spacer margin="32px 0px">
          <Wrapper>
            <Typography text="Login" fontSize={32} />
          </Wrapper>
        </Spacer>
        <Spacer margin="16px 0px">
          <Container>
            <Typography text={extensionAccount.name} fontSize={28} />
            <Typography text={address} fontSize={20} />
          </Container>
        </Spacer>
        <Spacer margin="48px 0px">
          <TFWrapper>
            <PasswordTextField label="Password" autoFocus setPass={setPass} />
          </TFWrapper>
        </Spacer>
        <Spacer margin="48px 0px">
          <Flex>
            <Button text="LOGIN" onClick={() => login(pass)} />
          </Flex>
        </Spacer>
      </Spacer>
      <Snackbar
        isOpen={open}
        snackbarMessage={t('alert_wrong_pass')}
        snackbarStatus={SnackbarType.ERROR}
      />
    </Container>
  )
}

export default Login

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const TFWrapper = styled('div')({
  width: '100%',
  '& > div': {
    width: '100%',
  },
})
