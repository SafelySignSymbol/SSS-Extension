import React, { Dispatch, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import Typography from '../../_general/components/Typography'
import { Address } from 'symbol-sdk'
import TextField from '../../_general/components/TextField'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { checkPassword } from '../../_general/lib/validator'

export interface Props {
  extensionAccount: ExtensionAccount
  loginSuccess: (pass: string) => void
}

const Login: React.VFC<Props> = ({ extensionAccount, loginSuccess }) => {
  const address = Address.createFromRawAddress(
    extensionAccount.address
  ).pretty()

  const passRef = useRef<HTMLInputElement>(null)

  const login = () => {
    if (passRef === null || passRef.current === null) return
    const check = checkPassword(
      extensionAccount.encriptedPrivateKey,
      passRef.current.value,
      extensionAccount.address,
      extensionAccount.seed
    )
    if (check) {
      loginSuccess(passRef.current.value)
    }
  }

  useEffect(() => {
    if (extensionAccount.type === 'NOPASS') {
      login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensionAccount.type])

  return (
    <Container>
      <Spacer margin="16px 8px">
        <Spacer margin="32px 0px">
          <Wrapper>
            <Typography text="ログイン" variant="h4" />
          </Wrapper>
        </Spacer>
        <Spacer margin="16px 0px">
          <Typography text={address} variant="h6" />
        </Spacer>
        <Spacer margin="48px 0px">
          <TextField text="Password" inputRef={passRef} type="password" />
        </Spacer>
        <Spacer margin="48px 0px">
          <Flex>
            <Button text="LOGIN" onClick={login} />
          </Flex>
        </Spacer>
      </Spacer>
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
