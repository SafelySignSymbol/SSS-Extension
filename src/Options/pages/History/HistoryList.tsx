import React from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import Color from '../../../_general/utils/Color'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'
import { deleteAllowList } from '../../../_general/lib/Storage'
import { SignedTransaction } from 'symbol-sdk'

export type Props = {
  history: SignedTransaction[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ history, reload }) => {
  const save = () => {
    const historyText =
      'SSS Extension Sign History \n======================\n' +
      history.map((h) => JSON.stringify(h)).join('\n======================\n')
    const blob = new Blob([historyText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const now = new Date()
    const filename = `SSS_SignHistory-${now.getFullYear()}/${now.getMonth()}/${now.getDate()}-.txt`
    a.download = filename
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (history.length === 0) return <div></div>

  return (
    <Wrapper>
      <Center>
        <CardHeader>
          <Typography variant="h4" text="署名履歴" />
          <IconButton onClick={save}>
            <IconContext.Provider value={{ size: '24px' }}>
              <RiSettings2Fill style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </CardHeader>
        {/* {history.map((h) => {
          console.log('tx', h)
          return (
            <Wrap key={h.hash}>
              <Typography text={h.hash} variant="h6" />
              <IconButton onClick={() => ''}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <RiSettings2Fill style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </Wrap>
          )
        })} */}
      </Center>
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  width: '60vw',
  margin: '16px 20vw',
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
  flexDirection: 'column',
})

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
})
