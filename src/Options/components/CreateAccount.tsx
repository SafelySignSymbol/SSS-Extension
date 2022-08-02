import React, { Dispatch } from 'react'
import styled from '@emotion/styled'

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
    <List>
      <Typography variant="h5" text="新規アカウント" />
    </List>
  )
}

export default Component

const List = styled('div')({
  width: '100%',
})
