import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Spacer from '../../../../_general/components/Spacer'
import Typography from '../../../../_general/components/Typography'
import { Address } from 'symbol-sdk'

import { getAddressXym } from '../../../../_general/lib/Symbol/SymbolService'
import Color from '../../../../_general/utils/Color'
import { Chip } from '@mui/material'

export type Props = {
  address: Address
}

const Component: React.VFC<Props> = ({ address }) => {
  const [amount, setAmount] = useState(['0', '0'])
  useEffect(() => {
    getAddressXym(address).then((xym) => {
      setAmount((xym / Math.pow(10, 6)).toString().split('.'))
    })
  }, [address])

  const net_type = address.plain().charAt(0) === 'T' ? 'TEST NET' : 'MAIN NET'
  const color: string = (() => {
    if (net_type === 'TEST NET') {
      return 'black'
    } else {
      return Color.sky
    }
  })()

  return (
    <Root>
      <Spacer margin="0px 32px 16px">
        <Title>
          <Typography
            text="ActiveAccount Infomation"
            variant="h5"
            color={Color.grayscale}
          />
        </Title>
      </Spacer>
      <Spacer margin="8px 0px 16px">
        <Addr>
          <Typography text="Address" variant="h5" />
          <SChip label={net_type} clr={color} />
        </Addr>
        <Typography text={address.pretty()} variant="subtitle1" />
      </Spacer>
      <Spacer margin="8px 0px">
        <Typography text="XYM Balance" variant="h5" />
        <Wrap>
          <Amount color="black" float={false}>
            {amount[0]}
          </Amount>
          <Amount color="black" float={false}>
            {amount.length === 2 && '.'}
          </Amount>
          <Amount color="#555" float={true}>
            {amount[1]}
          </Amount>
        </Wrap>
      </Spacer>
    </Root>
  )
}

export default Component

const Root = styled('div')({
  padding: '32px',
  background: 'white',
})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '28px' : '32px',
}))

const Wrap = styled('div')({
  marginBottom: '4px',
})

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'end',
})

const Addr = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

const SChip = styled(Chip)((p: { clr: string }) => ({
  margin: '0px 16px',
  color: p.clr,
}))
