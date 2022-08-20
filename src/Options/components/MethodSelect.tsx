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
      <Divider />
      <ListItemButton onClick={() => handleClick('IMPORT')}>
        <TextWrapper>
          <Typography fontSize={20} text={t('accmodal_import')} />
        </TextWrapper>
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClick('CREATE')
          setNettype(NetworkType.MAIN_NET)
        }}>
        <TextWrapper>
          <Typography fontSize={20} text={t('accmodal_create')} />
        </TextWrapper>
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClick('HARDWARE')
        }}>
        <TextWrapper>
          <Typography fontSize={20} text={t('accmodal_hardware')} />
        </TextWrapper>
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

const TextWrapper = styled('div')({
  marginLeft: '16px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
})
