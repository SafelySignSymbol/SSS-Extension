import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Spacer from '../../../../_general/components/Spacer'
import Typography from '../../../../_general/components/Typography'
import { AddressQR, QRCodeGenerator } from 'symbol-qr-library'
import { Address } from 'symbol-sdk'
import SymbolLogo from '../../../../_general/components/Logo/SymbolLogo'
import {
  getGenerationHash,
  getNetworkTypeByAddress,
} from '../../../../_general/lib/Symbol/Config'
import { getAddressXym } from '../../../../_general/lib/Symbol/SymbolService'

export type Props = {
  address: string
}

const Component: React.VFC<Props> = ({ address }) => {
  const [amount, setAmount] = useState(['0', '0'])
  const [src, setSrc] = useState('')
  useEffect(() => {
    const net_type = getNetworkTypeByAddress(address)

    getAddressXym(Address.createFromRawAddress(address)).then((xym) => {
      setAmount((xym / Math.pow(10, 6)).toString().split('.'))
    })
    const qrCode: AddressQR = QRCodeGenerator.createExportAddress(
      'name',
      address,
      net_type,
      getGenerationHash(net_type)
    )
    qrCode.toBase64().subscribe((base64) => {
      setSrc(base64 || '')
    })
  }, [address])
  return (
    <Wrapper>
      <Flex direction="column">
        <Flex direction="row">
          <Mock src={src} />
          <Center direction="column">
            <Spacer MTop="16px">
              <Typography text="XYM Balance" variant="h3" />
            </Spacer>
            <Div>
              <Spacer MTop="16px">
                <AmountViewer>
                  <SymbolLogo onClick={() => console.log('')} />
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
                </AmountViewer>
              </Spacer>
            </Div>
          </Center>
        </Flex>
      </Flex>
      <Center direction="column">
        <Typography text={address} variant="h6" />
      </Center>
    </Wrapper>
  )
}

export default Component

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

const Flex = styled('div')((p: { direction: FlexDirection }) => ({
  display: 'flex',
  flexDirection: p.direction,
}))

const Center = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center',
})

const Wrapper = styled('div')({
  padding: '16px',
  background: 'white',
  maxWidth: '560px',
  border: '1px solid black',
  borderRadius: '8px',
})

const Mock = styled('img')({
  width: '200px',
  height: '200px',
  margin: '16px',
})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '28px' : '32px',
}))

const AmountViewer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
})
const Wrap = styled('div')({
  marginBottom: '4px',
})
const Div = styled('div')({
  width: '100%',
})
