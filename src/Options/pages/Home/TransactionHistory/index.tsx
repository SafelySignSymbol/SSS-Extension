import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Address, Transaction } from 'symbol-sdk'
import { getTransactions } from '../../../../_general/lib/Symbol/SymbolService'
import { getTransactionType } from '../../../../_general/lib/TransactionType'
import Item from './Item'
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import Spacer from '../../../../_general/components/Spacer'
import Typography from '../../../../_general/components/Typography'
import Color from '../../../../_general/utils/Color'
import {
  changeSize,
  getSetting,
  Setting,
} from '../../../../_general/lib/Storage'

import { useTranslation } from 'react-i18next'

export type Props = {
  address: Address
}

const values = [10, 25, 50, 100]

const Component: React.VFC<Props> = ({ address }) => {
  const [t] = useTranslation()
  const [setting, setSetting] = useState<Setting>({} as Setting)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    getTransactions(address, 1, setting.transactionSize).then((txs) => {
      setTransactions(txs)
    })
    getSetting().then((data) => {
      setSetting(data)
    })
  }, [address, setting.transactionSize])
  return (
    <Wrapper>
      <Spacer margin="0px 32px 16px">
        <Title>
          <FormControl sx={{ width: 160 }}>
            <InputLabel id="demo-multiple-name-label">Display</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={setting.transactionSize}
              onChange={(e) => {
                changeSize(Number(e.target.value)).then((data) => {
                  setSetting(data)
                })
              }}
              input={<OutlinedInput label="Display" />}>
              {values.map((l) => (
                <MenuItem value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            text={t('recent_transaction')}
            variant="h5"
            color={Color.grayscale}
          />
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
  maxHeight: 'calc(100% - 64px)',
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
})
