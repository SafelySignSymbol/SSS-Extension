import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import {
  Mosaic,
  NamespaceId,
  NamespaceService,
  RepositoryFactoryHttp,
} from 'symbol-sdk'
import { getActiveAccount } from '../../../lib/Storage'

export type Props = {
  mosaic: Mosaic
}

const test_net = 'https://sym-test.opening-line.jp:3001'
const main_net = 'https://sym-main.opening-line.jp:3001'

const TxMosaic: React.VFC<Props> = ({ mosaic }) => {
  const [id, setId] = useState('')
  const [div, setDiv] = useState(0)
  useEffect(() => {
    getActiveAccount().then((extensionAccount) => {
      const addr = extensionAccount.address
      const url = addr.charAt(0) === 'T' ? test_net : main_net
      const rep = new RepositoryFactoryHttp(url)
      const nsRep = rep.createNamespaceRepository()
      const nsService = new NamespaceService(nsRep)
      const mosaicHttp = rep.createMosaicRepository()
      if (mosaic.id instanceof NamespaceId) {
        const nsId = NamespaceId.createFromEncoded(mosaic.id.toHex())
        nsService.namespace(nsId).subscribe(
          (x) => {
            setId(x.name)
            if (x.alias.mosaicId) {
              mosaicHttp.getMosaic(x.alias.mosaicId).subscribe(
                (mosaicInfo) => {
                  setDiv(mosaicInfo.divisibility)
                },
                (err) => console.error(err)
              )
            }
          },
          (err) => {
            // console.log('err', err)
            setId('NameSpace Not Found')
          }
        )
      } else {
        setId(mosaic.id.toHex())
        mosaicHttp.getMosaic(mosaic.id).subscribe(
          (mosaicInfo) => {
            // console.log(
            //   'amount',
            //   mosaic.amount.compact() / Math.pow(10, mosaicInfo.divisibility)
            // )
            setDiv(mosaicInfo.divisibility)
          },
          (err) => console.error(err)
        )
      }
    })
  }, [mosaic])

  return (
    <Wrapper>
      <Center>
        <Typography text={id} variant="h5" />
        <Typography
          text={String(mosaic.amount.compact() / Math.pow(10, div))}
          variant="subtitle1"
        />
      </Center>
    </Wrapper>
  )
}

export default TxMosaic

const Wrapper = styled('div')({
  margin: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
