import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Typography from '../../../../_general/components/Typography'
import { NetworkType, UInt64 } from 'symbol-sdk'
import { getTimeStamp } from '../../../../_general/lib/Symbol/SymbolService'
import Color from '../../../../_general/utils/Color'

export type Props = {
  type: string
  hash: string
  netType: NetworkType
  height: UInt64
}

const Component: React.VFC<Props> = ({ type, hash, netType, height }) => {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    getTimeStamp(height, netType).then((t) => {
      const formatTime = `${t.getFullYear()}/${
        t.getMonth() + 1
      }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`
      setTime(formatTime)
    })
  }, [height, netType])
  return (
    <Column>
      <Right>
        <Text>{type}</Text>
      </Right>
      <Wrap>
        <Typography text={hash} variant="h5" />
        <Typography text={time} variant="subtitle1" />
      </Wrap>
    </Column>
  )
}

export default Component

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '8px',
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '2px',
})

const Right = styled('div')({
  display: 'flex',
  justifyContent: 'end',
})

const Text = styled('span')({
  fontSize: '20px',
})
