import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getHistory } from '../../../_general/lib/Storage'
import Typography from '../../../_general/components/Typography'
import { SignedTransaction } from 'symbol-sdk'
import History from './HistoryList'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [history, setHistory] = useState<SignedTransaction[]>([])

  useEffect(() => {
    getHistory().then((his) => {
      setHistory(his)
    })
  }, [update])

  return (
    <Wrapper>
      <Typography text="History" variant="h4" />
      <History history={history} reload={reload} />
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '32px 80px',
  width: 'calc(100vw - 64px)',
})
