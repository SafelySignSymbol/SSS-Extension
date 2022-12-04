import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import {
  Mosaic,
  NamespaceId,
  NamespaceService,
  RepositoryFactoryHttp,
} from 'symbol-sdk'
import { getActiveAccountV2, getSetting } from '../../../lib/Storage'

import { networkAtom } from '../../../../_general/utils/Atom'
import { useRecoilState } from 'recoil'

export type Props = {
  mosaic: Mosaic
}

const TxMosaic: React.VFC<Props> = ({ mosaic }) => {
  const [id, setId] = useState('')
  const [div, setDiv] = useState(0)

  const [network] = useRecoilState(networkAtom)

  useEffect(() => {
    getSetting().then((s) => {
      getActiveAccountV2(s.networkType).then(async (extensionAccount) => {
        const rep = new RepositoryFactoryHttp(network)
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
                    console.log('mosaicInfo', mosaicInfo)
                    setDiv(mosaicInfo.divisibility)
                  },
                  (err) => console.error('transaction info', err)
                )
              }
            },
            (err) => {
              setId('NameSpace Not Found')
            }
          )
        } else {
          setId(mosaic.id.toHex())
          nsRep
            .getMosaicsNames([mosaic.id])
            .toPromise()
            .then((ms) => {
              if (!ms) return
              const m = ms[0]
              if (m.names.length !== 0) {
                setId(m.names[0].name)
              }
            })
          mosaicHttp.getMosaic(mosaic.id).subscribe(
            (mosaicInfo) => {
              setDiv(mosaicInfo.divisibility)
            },
            (err) => console.error('mosaic info div', err)
          )
        }
      })
    })
  }, [mosaic])

  return (
    <Wrapper>
      <Center>
        <Typography text={id} fontSize={20} />
        <Typography
          text={String(mosaic.amount.compact() / Math.pow(10, div))}
          fontSize={16}
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
