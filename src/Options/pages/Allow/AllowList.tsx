import React from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { deleteAllowList } from '../../../_general/lib/Storage'

export type Props = {
  allowlist: string[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ allowlist, reload }) => {
  const deny = (num: number) => {
    // console.log('deny', num)
    deleteAllowList(num).then(() => {
      reload()
    })
  }
  if (allowlist.length === 0)
    return (
      <div>
        <div>ドメイン許可に関する説明 (TODO)</div>
      </div>
    )

  return (
    <Wrapper>
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
  display: 'flex',
  flexFlow: 'column wrap',
})

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  background: 'white',
  padding: '16px',
  margin: '8px',
})
