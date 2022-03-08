import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Address, Transaction } from 'symbol-sdk'
import { getTransactions } from '../../../../_general/lib/Symbol/SymbolService'
import { getTransactionType } from '../../../../_general/lib/TransactionType'
import Item from './Item'
import { Divider } from '@mui/material'

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
          const txInfo = tx.transactionInfo
          const type = tx.type
          // console.log(tx.transactionInfo)
          // console.log(tx.transactionInfo.height.toString())
          return (
            <div key={txInfo.hash}>
              <Item
                type={getTransactionType(type)}
                hash={txInfo.hash || ''}
                netType={tx.networkType}
                height={txInfo.height}
              />
              <Divider />
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

const Wrapper = styled('div')({
  padding: '16px',
  background: 'white',
  border: '1px solid black',
  borderRadius: '8px',
})
