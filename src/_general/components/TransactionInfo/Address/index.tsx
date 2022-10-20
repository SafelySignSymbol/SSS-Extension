import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import {
  NamespaceId,
  NamespaceService,
  RepositoryFactoryHttp,
  UnresolvedAddress,
} from 'symbol-sdk'

import { useRecoilState } from 'recoil'
import { networkAtom } from '../../../utils/Atom'

export type Props = {
  address: UnresolvedAddress
}

const TxAddress: React.VFC<Props> = ({ address }) => {
  const [network] = useRecoilState(networkAtom)
  const [addr, setAddr] = useState('')
  useEffect(() => {
    if (address instanceof NamespaceId) {
      const url = network
      console.log({ network })
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
  }, [address])
  return (
    <Wrapper>
      <Typography
        text={address instanceof NamespaceId ? 'NameSpace' : 'Address'}
        fontSize={24}
      />
      <Center>
        <Typography text={addr} fontSize={20} />
      </Center>
    </Wrapper>
  )
}

export default TxAddress

const Wrapper = styled('div')({})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})
