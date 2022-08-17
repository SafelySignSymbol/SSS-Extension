import React, { Dispatch } from 'react'
import styled from '@emotion/styled'
import { ListItemButton, Divider } from '@mui/material'

import Typography from '../../_general/components/Typography'
import { Method } from './AccountModal'
import { NetworkType } from 'symbol-sdk'
import { useTranslation } from 'react-i18next'

export type Props = {
  setMethod: Dispatch<Method>
  setState: Dispatch<number>
  setNettype: Dispatch<NetworkType>
}

const Component: React.FC<Props> = ({ setMethod, setState, setNettype }) => {
  const [t] = useTranslation()
  const handleClick = (method: Method) => {
    console.log('handleClick')
    setState(2)
    setMethod(method)
  }

  return (
    <Root>
      <ListItemButton onClick={() => handleClick('IMPORT')}>
        <Typography variant="h5" text={t('accmodal_import')} />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClick('CREATE')
          setNettype(NetworkType.TEST_NET)
        }}>
        <Typography variant="h5" text={t('accmodal_create_testnet')} />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClick('CREATE')
          setNettype(NetworkType.MAIN_NET)
        }}>
        <Typography variant="h5" text={t('accmodal_create_mainnet')} />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={() => handleClick('HARDWARE')}>
        <Typography variant="h5" text={t('accmodal_hardware')} />
      </ListItemButton>
      <Divider />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: '100%',
  height: '400px',
})
