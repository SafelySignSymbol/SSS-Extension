import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getActiveAccount } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [account, setAccount] = useState<ExtensionAccount | null>(null)

  useEffect(() => {}, [update])

  // if (account === null) {
  //   return <>Plese set Account</>
  // }

  return <Wrapper>coming soon</Wrapper>
}

export default Options

const Wrapper = styled('div')({
  margin: '32px 80px',
  width: 'calc(100vw - 64px)',
})
