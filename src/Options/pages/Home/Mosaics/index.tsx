import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import {
  Address,
  Mosaic,
  MosaicId,
  MosaicInfo,
  RepositoryFactoryHttp,
} from 'symbol-sdk'
import Typography from '../../../../_general/components/Typography'
import Spacer from '../../../../_general/components/Spacer'
import { Divider } from '@mui/material'
import {
  getNetworkTypeByAddress,
  getNodeUrl,
} from '../../../../_general/lib/Symbol/Config'

export type Props = {
  address: Address
}

type MosaicData = {
  mosaic: Mosaic
  mosaicInfo: MosaicInfo
}

const Component: React.VFC<Props> = ({ address }) => {
  const net_type = getNetworkTypeByAddress(address.plain())

  const NODE_URL = getNodeUrl(net_type)

  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const accountHttp = repositoryFactory.createAccountRepository()
  const mosaicHttp = repositoryFactory.createMosaicRepository()
  const [mosaics, setMosaics] = useState<MosaicData[]>([])

  useEffect(() => {
    accountHttp.getAccountInfo(address).subscribe(
      (accountInfo) => {
        repositoryFactory
          .createChainRepository()
          .getChainInfo()
          .subscribe((chainInfo) => {
            console.log('chain', chainInfo)
            for (let m of accountInfo.mosaics) {
              mosaicHttp.getMosaic(new MosaicId(m.id.id.toHex())).subscribe(
                (mosaicInfo) => {
                  if (mosaicInfo.duration.toString() === '0') {
                    console.log('mosaic', mosaicInfo)
                    setMosaics((prev) => [
                      ...prev,
                      { mosaicInfo: mosaicInfo, mosaic: m },
                    ])
                  } else if (
                    chainInfo.height <
                    mosaicInfo.startHeight.add(mosaicInfo.duration)
                  ) {
                    setMosaics((prev) => [
                      ...prev,
                      { mosaicInfo: mosaicInfo, mosaic: m },
                    ])
                  }
                },
                (err) => console.error(err)
              )
            }
          })
      },
      (err) => console.error(err)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Wrapper>
      <Tmp>
        <Spacer MBottom="16px">
          <Typography text="Mosaics" variant="h4" />
        </Spacer>
        <Divider />
        {mosaics.map((m) => {
          const amount = (
            m.mosaic.amount.compact() / Math.pow(10, m.mosaicInfo.divisibility)
          )
            .toString()
            .split('.')

          return (
            <>
              <MosaicViewer key={m.mosaic.id.id.toString()}>
                <Typography text={m.mosaic.id.id.toHex()} variant="h5" />
                <AmountWrapper>
                  <Amount color="black" float={false}>
                    {amount[0]}
                  </Amount>
                  <Amount color="black" float={false}>
                    {amount.length === 2 && '.'}
                  </Amount>
                  <Amount color="#555" float={true}>
                    {amount[1]}
                  </Amount>
                </AmountWrapper>
              </MosaicViewer>
              <Divider />
            </>
          )
        })}
      </Tmp>
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  width: 'calc(100% - 64px)',
  margin: '16px',
  padding: '16px',
  display: 'flex',
  border: '1px solid',
  borderRadius: '8px',
})

const MosaicViewer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '2px',
})

const AmountWrapper = styled('div')({})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '12px' : '14px',
}))

const Tmp = styled('div')({
  width: '100%',
})
