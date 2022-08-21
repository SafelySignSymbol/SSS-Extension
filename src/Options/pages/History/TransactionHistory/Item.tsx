import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { NetworkType, UInt64 } from 'symbol-sdk'
import { getTimeStamp } from '../../../../_general/lib/Symbol/SymbolService'
import { getExplorerLinkFromHash } from '../../../../_general/lib/Symbol/Config'
import Color, { UtilColors } from '../../../../_general/utils/Color'
import { Link } from '@mui/material'
import Avatar from 'boring-avatars'
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
      }/${t.getDate()} ${format(t.getHours())}:${format(t.getMinutes())}`
      setTime(formatTime)
    })
  }, [height, netType])

  return (
    <Wrap>
      <HashWrapper>
        <Avatar size={32} name={hash} variant="bauhaus" colors={UtilColors} />
        <SLink href={getExplorerLinkFromHash(netType, hash)} target="_brank">
          {hash}
        </SLink>
      </HashWrapper>
      <Right>
        <Text>{type}</Text>
        <Time>{time}</Time>
      </Right>
    </Wrap>
  )
}

const format = (time: number) => {
  return ('00' + String(time)).slice(-2)
}

export default Component

const Wrap = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '16px',
})

const Right = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  width: '100%',
})

const Text = styled('div')({
  fontSize: '16px',
})
const Time = styled('div')({
  fontSize: '16px',
  width: '140px',
  textAlign: 'end',
})

const SLink = styled(Link)({
  fontSize: '20px',
  textDecoration: 'none',
  color: Color.base_black,
})

const HashWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '> :nth-child(1)': {
    marginRight: '32px',
  },
})
