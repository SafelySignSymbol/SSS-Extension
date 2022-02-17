import React from 'react'

import styled from '@emotion/styled'

import Typography from '../../_general/components/Typography'

import Color from '../../_general/utils/Color'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { deleteAllowList } from '../../_general/lib/Storage'

export type Props = {
  allowlist: string[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ allowlist, reload }) => {
  const deny = (num: number) => {
    console.log('deny', num)
    deleteAllowList(num).then(() => {
      reload()
    })
  }
  if (allowlist.length === 0) return <div></div>

  return (
    <Wrapper>
      <Center>
        <CardHeader>
          <Typography variant="h5" text="許可リスト" />
        </CardHeader>
      </Center>
      {allowlist.map((e, i) => {
        return (
          <Wrap key={i}>
            <Typography text={e} variant="h5" />
            <IconButton size="small" onClick={() => deny(i)}>
              <IconContext.Provider value={{ size: '24px' }}>
                <RiDeleteBin2Line style={{ margin: '6px' }} />
              </IconContext.Provider>
            </IconButton>
          </Wrap>
        )
      })}
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  width: 'calc(100% - 64px)',
  margin: '16px',
  padding: '16px',
  display: 'flex',
  flexFlow: 'column wrap',
  border: '1px solid ' + Color.sky,
  borderRadius: '32px',
})

const CardHeader = styled('div')({
  margin: '8px',
  display: 'flex',
  alignItems: 'center',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
