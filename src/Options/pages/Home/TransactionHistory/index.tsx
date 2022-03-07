import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Address, Transaction } from 'symbol-sdk'
import {
  getTimeStamp,
  getTransactions,
} from '../../../../_general/lib/Symbol/SymbolService'

export type Props = {
  address: Address
}

const Component: React.VFC<Props> = ({ address }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    getTransactions(address, 1).then((txs) => {
      console.log('page', txs)
      setTransactions(txs)
    })
  }, [address])
  return (
    <Wrapper>
      {transactions.map((tx) => {
        if (!!tx.transactionInfo) {
          console.log(tx.transactionInfo)
          console.log(tx.transactionInfo.height.toString())
          getTimeStamp(tx.transactionInfo.height, tx.networkType).then(
            (time) => {
              console.log('then', time)
            }
          )
          return (
            <div key={tx.transactionInfo.hash}>
              <div>{tx.transactionInfo.hash}</div>
            </div>
          )
        } else {
          return <></>
        }
      })}
    </Wrapper>
  )
}

export default Component

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

const Flex = styled('div')((p: { direction: FlexDirection }) => ({
  display: 'flex',
  flexDirection: p.direction,
}))

const Center = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center',
})

const Wrapper = styled('div')({
  padding: '16px',
  background: 'white',
  maxWidth: '560px',
  border: '1px solid black',
  borderRadius: '8px',
})

const Mock = styled('img')({
  width: '200px',
  height: '200px',
  margin: '16px',
})

const Amount = styled('span')((p: { color: string; float: boolean }) => ({
  color: p.color,
  fontSize: p.float ? '28px' : '32px',
}))

const AmountViewer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
})
const Wrap = styled('div')({
  marginBottom: '4px',
})
const Div = styled('div')({
  width: '100%',
})
