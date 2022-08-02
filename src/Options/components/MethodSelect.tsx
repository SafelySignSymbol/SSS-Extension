import React, { Dispatch } from 'react'
import styled from '@emotion/styled'
import { ListItemButton, Divider } from '@mui/material'

import Typography from '../../_general/components/Typography'
import { Method } from './AccountModal'

export type Props = {
  setMethod: Dispatch<Method>
  setState: Dispatch<number>
}

const Component: React.FC<Props> = ({ setMethod, setState }) => {
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
      <ListItemButton onClick={() => handleClick('CREATE')}>
        <Typography variant="h5" text="新規アカウント" />
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
