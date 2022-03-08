import React, { Dispatch, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import Typography from '../../_general/components/Typography'
import { Address } from 'symbol-sdk'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { checkPassword } from '../../_general/lib/validator'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'

export interface Props {
  extensionAccount: ExtensionAccount
  loginSuccess: (pass: string) => void
}

const Login: React.VFC<Props> = ({ extensionAccount, loginSuccess }) => {
  const [pass, setPass] = useState('default password')
  const [isVPass, setIsVPass] = useState(false)

  const address = Address.createFromRawAddress(
    extensionAccount.address
  ).pretty()

  const login = () => {
    const check = checkPassword(
      extensionAccount.encriptedPrivateKey,
      pass,
      extensionAccount.address
    )
    if (check) {
      loginSuccess(pass)
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
          <PasswordTextField
            label="Password"
            setPass={setPass}
            isVisible={isVPass}
            updateIsVisible={() => setIsVPass((prev) => !prev)}
          />
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
