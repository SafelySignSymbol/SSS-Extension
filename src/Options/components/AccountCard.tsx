import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

import { Box, IconButton } from '@mui/material'

import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import Color from '../../_general/utils/Color'
import Typography from '../../_general/components/Typography'
import Spacer from '../../_general/components/Spacer'

export type Props = {
  address: string
  publicKey: string
  header: ReactNode
  isActive?: boolean
}

const Component: React.VFC<Props> = ({
  address,
  publicKey,
  header,
  isActive = false,
}) => {
  const copy = (value: string) => {
    console.log('val', value)
    navigator.clipboard.writeText(value)
  }
  return (
    <Wrapper isActive={isActive}>
      <Card isActive={isActive}>
        {header}
        <Container>
          <Typography
            variant="h5"
            text={`Address: ${
              address.charAt(0) === 'T' ? 'TEST_NET' : 'MAIN_NET'
            }`}
          />
          <Box sx={{ flexGrow: 1, height: '1px' }} />
          <IconButton size="small" onClick={() => copy(address)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Container>
        <Spacer margin="0px 16px">
          <Typography variant="body1" text={address} />
        </Spacer>
        <Container>
          <Typography variant="h5" text="PublicKey:" />
          <Box sx={{ flexGrow: 1, height: '1px' }} />
          <IconButton size="small" onClick={() => copy(publicKey)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Container>
        <Spacer margin="0px 16px">
          <Typography variant="body1" text={publicKey} />
        </Spacer>
      </Card>
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')<{
  isActive: boolean
}>((props) => ({
  width: props.isActive ? '100%' : '50%',
  display: 'flex',
  flexDirection: 'column',
}))

const Card = styled('div')<{
  isActive: boolean
}>((props) => ({
  margin: '8px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 16px)',
  border: (props.isActive ? '2' : '1') + 'px solid ' + Color.pink,
  borderRadius: (props.isActive ? '16' : '4') + 'px',
  boxSizing: 'border-box',
}))

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})
