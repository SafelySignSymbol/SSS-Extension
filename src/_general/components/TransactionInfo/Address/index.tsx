import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import {
  NamespaceId,
  NamespaceService,
  RepositoryFactoryHttp,
  UnresolvedAddress,
} from 'symbol-sdk'
import {
  // getActiveAccount,
  getActiveAccountV2,
  getSetting,
} from '../../../lib/Storage'
import { getNetworkTypeByAddress, getNodeUrl } from '../../../lib/Symbol/Config'

export type Props = {
  address: UnresolvedAddress
}

const TxAddress: React.VFC<Props> = ({ address }) => {
  const [addr, setAddr] = useState('')
  useEffect(() => {
    getSetting().then((s) => {
      getActiveAccountV2(s.networkType).then((extensionAccount) => {
        if (address instanceof NamespaceId) {
          const addr = extensionAccount.address
          const url = getNodeUrl(getNetworkTypeByAddress(addr))
          const rep = new RepositoryFactoryHttp(url)
          const nsRep = rep.createNamespaceRepository()
          const nsService = new NamespaceService(nsRep)

          const nsId = NamespaceId.createFromEncoded(address.toHex())
          nsService.namespace(nsId).subscribe(
            (x) => {
              setAddr(x.name)
            },
            (err) => {
              setAddr('NameSpace Not Found')
            }
          )
        } else {
          setAddr(address.plain())
        }
      })
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
