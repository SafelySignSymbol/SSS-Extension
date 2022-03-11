import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Spacer from '../../../../_general/components/Spacer'
import Typography from '../../../../_general/components/Typography'
import { Address } from 'symbol-sdk'

import { getAddressXym } from '../../../../_general/lib/Symbol/SymbolService'

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

  return (
    <Root>
      <Spacer margin="0px 32px 16px">
        <Typography text="ActiveAccount Infomation" variant="h4" />
      </Spacer>
      <Spacer margin="8px 0px">
        <Typography text="Address" variant="h5" />
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
