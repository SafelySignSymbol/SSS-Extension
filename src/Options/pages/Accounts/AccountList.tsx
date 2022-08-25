import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import AccountMenu from './AccountMenu'
import { Setting } from '../../../_general/lib/Storage'

import Avatar from 'boring-avatars'
import { NetworkType } from 'symbol-sdk'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import Color, {
  MainNetColors,
  TestNetColors,
} from '../../../_general/utils/Color'
import { useTranslation } from 'react-i18next'
import { Snackbar, SnackbarProps } from '../../../_general/components/Snackbar'
export type Props = {
  extensionAccounts: ExtensionAccount[]
  setting: Setting
  reload: () => void
}

const Component: React.VFC<Props> = ({
  extensionAccounts,
  reload,
  setting,
}) => {
  const [t] = useTranslation()
  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  useEffect(() => {}, [extensionAccounts, setting.networkType])

  if (extensionAccounts.length === 0) return <div></div>

  return (
    <Root>
      {extensionAccounts.map((acc, i) => {
        const copyAddress = (value: string) => {
          navigator.clipboard.writeText(value)

          setSnackbar({
            isOpen: true,
            snackbarMessage: t('copied_address').replace(
              '{{address}}',
              acc.address
            ),
            snackbarStatus: 'success',
          })
        }
        const copyPubkey = (value: string) => {
          navigator.clipboard.writeText(value)

          setSnackbar({
            isOpen: true,
            snackbarMessage: t('copied_pubkey').replace(
              '{{pubkey}}',
              acc.publicKey
            ),
            snackbarStatus: 'success',
          })
        }

        const name = acc.name || `Account ${i + 1}`
        return (
          <Wrapper>
            <Name>
              <NameWrpper>
                <AvatarWrapper>
                  <Avatar
                    size={32}
                    name={acc.address}
                    variant="beam"
                    colors={
                      getNetworkTypeByAddress(acc.address) ===
                      NetworkType.MAIN_NET
                        ? MainNetColors
                        : TestNetColors
                    }
                  />
                </AvatarWrapper>
                <Typography text={name} fontSize={28} />
              </NameWrpper>
              <AccountMenu account={acc} reload={reload} setting={setting} />
            </Name>
            <Flex isLast={false}>
              <VerticalMargin onClick={() => copyAddress(acc.address)}>
                <Typography text="Address" fontSize={24} />
                <Typography
                  text={acc.address}
                  fontSize={20}
                  color={Color.gray_black}
                />
              </VerticalMargin>
            </Flex>
            <Flex isLast={true}>
              <VerticalMargin onClick={() => copyPubkey(acc.address)}>
                <Typography text="PublicKey" fontSize={24} />
                <Typography
                  text={acc.publicKey}
                  fontSize={20}
                  color={Color.gray_black}
                />
              </VerticalMargin>
            </Flex>
          </Wrapper>
        )
      })}
      <Snackbar
        isOpen={snackbar.isOpen}
        snackbarMessage={snackbar.snackbarMessage}
        snackbarStatus={snackbar.snackbarStatus}
      />
    </Root>
  )
}

export default Component

const Wrapper = styled('div')({
  background: 'white',
  padding: '40px',
  margin: '16px 8px',
  borderBottom: `solid 1px ${Color.grayscale}`,
})

const Root = styled('div')({
  minWidth: '60vw',
  width: '800px',
})

const Flex = styled('div')((p: { isLast: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: p.isLast ? '0px' : '4px',
}))

const Name = styled('div')({
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
})

const AvatarWrapper = styled('div')({
  marginRight: '16px',
})

const NameWrpper = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

const VerticalMargin = styled('div')({
  cursor: 'pointer',
  padding: '8px 16px',
  width: '100%',
  '> :nth-child(1)': {
    marginBottom: '8px',
  },
  ':hover': {
    background: Color.base_white,
  },
})
