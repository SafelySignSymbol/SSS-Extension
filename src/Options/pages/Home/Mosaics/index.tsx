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
import { Divider } from '@mui/material'
import {
  getNetworkTypeByAddress,
  getNodeUrl,
} from '../../../../_general/lib/Symbol/Config'

import { useTranslation } from 'react-i18next'
import Avatar from 'boring-avatars'

export type Props = {
  address: Address
}

type MosaicData = {
  mosaic: Mosaic
  mosaicInfo: MosaicInfo
}

const Component: React.VFC<Props> = ({ address }) => {
  const [t] = useTranslation()

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
            for (let m of accountInfo.mosaics) {
              mosaicHttp.getMosaic(new MosaicId(m.id.id.toHex())).subscribe(
                (mosaicInfo) => {
                  if (mosaicInfo.duration.toString() === '0') {
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
      (err) => console.error('acc', err)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Root>
      <Wrapper>
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
                <MosaicName>
                  <Avatar
                    size={24}
                    name={m.mosaic.id.id.toHex()}
                    variant="marble"
                  />
                  <Typography text={m.mosaic.id.id.toHex()} variant="h5" />
                </MosaicName>
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
      </Wrapper>
    </Root>
  )
}

export default Component

const Root = styled('div')({
  padding: '32px',
  width: '800px',
  background: 'white',
  display: 'flex',
})

const MosaicViewer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  margin: '2px',
})

const AmountWrapper = styled('div')({})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '12px' : '14px',
}))

const Wrapper = styled('div')({
  width: '100%',
})

const MosaicName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '> :nth-child(1)': {
    marginRight: '16px',
  },
})
