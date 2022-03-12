import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import {
  NamespaceId,
  NamespaceService,
  RepositoryFactoryHttp,
  UnresolvedAddress,
} from 'symbol-sdk'
import { getActiveAccount } from '../../../lib/Storage'

export type Props = {
  address: UnresolvedAddress
}

const test_net = 'https://sym-test.opening-line.jp:3001'
const main_net = 'https://sym-main.opening-line.jp:3001'

const TxAddress: React.VFC<Props> = ({ address }) => {
  const [addr, setAddr] = useState('')
  useEffect(() => {
    getActiveAccount().then((extensionAccount) => {
      if (address instanceof NamespaceId) {
        const addr = extensionAccount.address
        const url = addr.charAt(0) === 'T' ? test_net : main_net
        const rep = new RepositoryFactoryHttp(url)
        const nsRep = rep.createNamespaceRepository()
        const nsService = new NamespaceService(nsRep)
        // console.log('address', address)

        const nsId = NamespaceId.createFromEncoded(address.toHex())
        nsService.namespace(nsId).subscribe(
          (x) => {
            // console.log(x)
            setAddr(x.name)
          },
          (err) => {
            // console.log('err', err)
            setAddr('NameSpace Not Found')
          }
        )
      } else {
        setAddr(address.plain())
      }
    })
  }, [address])
  return (
    <Wrapper>
      <Typography
        text={address instanceof NamespaceId ? 'NameSpace' : 'Address'}
        variant="h5"
      />
      <Center>
        <Typography text={addr} variant="h6" />
      </Center>
    </Wrapper>
  )
}

export default TxAddress

const Wrapper = styled('div')({
  margin: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})
