import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../../../_general/components/Typography'
import { Address, NetworkType } from 'symbol-sdk'

import { getAddressXym } from '../../../../_general/lib/Symbol/SymbolService'
import Color, {
  MainNetColors,
  TestNetColors,
} from '../../../../_general/utils/Color'

import { useTranslation } from 'react-i18next'
import { getNetworkTypeByAddress } from '../../../../_general/lib/Symbol/Config'
import Avatar from 'boring-avatars'

export type Props = {
  address: Address
  name: string
}

const Component: React.VFC<Props> = ({ address, name }) => {
  const [t] = useTranslation()

  const [amount, setAmount] = useState(['0', '0'])
  useEffect(() => {
    getAddressXym(address).then((xym) => {
      setAmount((xym / Math.pow(10, 6)).toString().split('.'))
    })
  }, [address])

  return (
    <Root>
      <HeaderWrapper>
        <NameWrapper>
          <Avatar
            size={48}
            name={address.plain()}
            variant="beam"
            colors={
              getNetworkTypeByAddress(address.plain()) === NetworkType.MAIN_NET
                ? MainNetColors
                : TestNetColors
            }
          />
          <Typography text={name} fontSize={48} />
        </NameWrapper>
        <Wrap>
          <Amount color={Color.base_black} float={false}>
            {amount[0]}
          </Amount>
          <Amount color={Color.base_black} float={false}>
            {amount.length === 2 && '.'}
          </Amount>
          <Amount color={Color.base_black} float={true}>
            {amount[1]}
          </Amount>
          <XYM>XYM</XYM>
        </Wrap>
      </HeaderWrapper>
      <AddressWrapper>
        <Typography text={address.pretty()} fontSize={32} />
      </AddressWrapper>
    </Root>
  )
}

export default Component

const Root = styled('div')({
  padding: '40px',
  width: '1000px',
  background: Color.pure_white,
})

const HeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const NameWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '> :nth-child(1)': {
    marginRight: '16px',
  },
})

const XYM = styled('span')({
  marginLeft: '8px',
  color: Color.base_black,
  fontSize: '28px',
})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '32px' : '40px',
}))

const Wrap = styled('div')({
  marginBottom: '4px',
})

const AddressWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  marginTop: '16px',
})
