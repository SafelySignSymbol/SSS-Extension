import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Address, Transaction } from 'symbol-sdk'
import { getTransactions } from '../../../../_general/lib/Symbol/SymbolService'
import { getTransactionType } from '../../../../_general/lib/TransactionType'
import Item from './Item'
import { Divider, IconButton } from '@mui/material'
import Spacer from '../../../../_general/components/Spacer'
import Typography from '../../../../_general/components/Typography'
import Color from '../../../../_general/utils/Color'

import { useTranslation } from 'react-i18next'
import { IconContext } from 'react-icons'
import { MdArrowRight, MdArrowLeft } from 'react-icons/md'

export type Props = {
  address: Address
}

const Component: React.VFC<Props> = ({ address }) => {
  const [t] = useTranslation()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  useEffect(() => {
    getTransactions(address, pageNum, 10).then((txs) => {
      setTransactions(txs.data)
      setIsLastPage(txs.isLastPage)
    })
  }, [address, pageNum])

  const back = () => {
    setPageNum((prev) => prev - 1)
  }
  const next = () => {
    setPageNum((prev) => prev + 1)
  }
  return (
    <Wrapper>
      <Spacer MBottom="16px">
        <Title>
          <Typography
            text={t('recent_transaction')}
            variant="h5"
            color={Color.grayscale}
          />
          <Pagination>
            <Margin>
              <IconButton size="small" onClick={back} disabled={pageNum === 1}>
                <IconContext.Provider value={{ size: '32px' }}>
                  <MdArrowLeft
                    style={{
                      color:
                        pageNum === 1 ? Color.base_white : Color.base_black,
                    }}
                  />
                </IconContext.Provider>
              </IconButton>
            </Margin>
            <Margin>
              <Typography
                text={String(pageNum)}
                variant="subtitle2"
                color={Color.base_black}
              />
            </Margin>
            <Margin>
              <IconButton size="small" onClick={next} disabled={isLastPage}>
                <IconContext.Provider value={{ size: '32px' }}>
                  <MdArrowRight
                    style={{
                      color: isLastPage ? Color.base_white : Color.base_black,
                    }}
                  />
                </IconContext.Provider>
              </IconButton>
            </Margin>
          </Pagination>
        </Title>
      </Spacer>
      <Divider />
      {transactions.map((tx) => {
        if (!!tx.transactionInfo) {
          const txInfo = tx.transactionInfo
          const type = tx.type
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
  padding: '32px',
  background: 'white',
  maxHeight: 'calc(100% - 32px)',
  overflowY: 'scroll',
  '::-webkit-scrollbar-track': {
    background: 'white',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    background: Color.grayscale,
    borderRight: '2px solid white',
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
  },
  '::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '4px',
  },
})

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
})

const Pagination = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

const Margin = styled('div')({
  margin: '0px 4px',
})
