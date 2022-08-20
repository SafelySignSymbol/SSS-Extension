import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
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

import Avatar from 'boring-avatars'
import Color from '../../../../_general/utils/Color'
export type Props = {
  address: Address
}

type MosaicData = {
  mosaicId: MosaicId
  mosaic: Mosaic
  mosaicInfo: MosaicInfo
  namespaces: string[]
}

const Component: React.VFC<Props> = ({ address }) => {
  const net_type = getNetworkTypeByAddress(address.plain())

  const NODE_URL = getNodeUrl(net_type)

  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const accountHttp = repositoryFactory.createAccountRepository()
  const mosaicHttp = repositoryFactory.createMosaicRepository()
  const nsRep = repositoryFactory.createNamespaceRepository()
  const [mosaics, setMosaics] = useState<MosaicData[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    accountHttp.getAccountInfo(address).subscribe(
      (accountInfo) => {
        repositoryFactory
          .createChainRepository()
          .getChainInfo()
          .subscribe((chainInfo) => {
            nsRep
              .getMosaicsNames(
                accountInfo.mosaics.map((m) => new MosaicId(m.id.id.toHex()))
              )
              .toPromise()
              .then((data) => {
                data.forEach((val, index) => {
                  mosaicHttp
                    .getMosaic(val.mosaicId)
                    .toPromise()
                    .then((mosaicInfo) => {
                      if (
                        mosaicInfo.duration.toString() === '0' ||
                        chainInfo.height <
                          mosaicInfo.startHeight.add(mosaicInfo.duration)
                      ) {
                        // 期限なし OR 期限ありで期限が切れていないもの
                        const d: MosaicData = {
                          mosaicId: val.mosaicId,
                          mosaic: accountInfo.mosaics[index],
                          mosaicInfo,
                          namespaces: val.names.map((n) => n.name),
                        }
                        setMosaics((prev) => [...prev, d])
                      }
                    })
                })
              })
              .catch(() => {
                console.log('catch')
              })
              .finally(() => {
                console.log('fin')
              })
          })
      },
      (err) => console.error('acc', err)
    )

    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getText = (texts: string[]) => {
    return (
      <Wrapper>
        {texts.map((val, i) => {
          if (count % texts.length === i) {
            return (
              <AnimationWrapper>
                <MosaicWrapper>
                  <Typography text={val} fontSize={20} />
                </MosaicWrapper>
              </AnimationWrapper>
            )
          } else {
            return <></>
          }
        })}
      </Wrapper>
    )
  }

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
                  {getText([m.mosaic.id.toHex(), ...m.namespaces])}
                </MosaicName>
                <AmountWrapper>
                  <Amount color={Color.base_black} float={false}>
                    {amount[0]}
                  </Amount>
                  <Amount color={Color.base_black} float={false}>
                    {amount.length === 2 && '.'}
                  </Amount>
                  <Amount color={Color.base_black} float={true}>
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
  padding: '40px',
  width: '800px',
  background: 'white',
  display: 'flex',
})

const MosaicViewer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
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
  width: '100%',
  '> :nth-child(1)': {
    marginRight: '16px',
  },
})

const feedIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

const AnimationWrapper = styled('div')({
  height: '60px',
  animation: `${feedIn} 1s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,
  display: 'flex',
  alignItems: 'center',
})

const MosaicWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
})
