import React, { Dispatch } from 'react'
import styled from '@emotion/styled'
import { ListItemButton, Divider } from '@mui/material'

import Typography from '../../_general/components/Typography'
import { Method } from './AccountModal'
import { NetworkType } from 'symbol-sdk'

export type Props = {
  setMethod: Dispatch<Method>
  setState: Dispatch<number>
  setNettype: Dispatch<NetworkType>
}

const Component: React.FC<Props> = ({ setMethod, setState, setNettype }) => {
  const handleClick = (method: Method) => {
    setState(2)
    setMethod(method)
  }

  return (
    <Root>
      <ListItemButton onClick={() => handleClick('IMPORT')}>
        <Typography variant="h5" text="秘密鍵をインポート" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        onClick={() => {
          handleClick('CREATE')
          setNettype(NetworkType.TEST_NET)
        }}>
        <Typography variant="h5" text="新規テストネットアカウント" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleClick('CREATE')
          setNettype(NetworkType.MAIN_NET)
        }}>
        <Typography variant="h5" text="新規メインネットアカウント" />
      </ListItemButton>
      <Divider />
      <ListItemButton disabled onClick={() => handleClick('HARDWARE')}>
        <Typography variant="h5" text="ハードウェアウォレット" />
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
