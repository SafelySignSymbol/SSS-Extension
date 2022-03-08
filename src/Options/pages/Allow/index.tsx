import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getAllowList } from '../../../_general/lib/Storage'
import AllowList from '../../components/AllowList'
import Typography from '../../../_general/components/Typography'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [allowList, setAllowList] = useState<string[]>([])

  useEffect(() => {
    getAllowList().then((list) => {
      setAllowList(list)
    })
  }, [update])

  return (
    <Wrapper>
      <Typography text="AllowList" variant="h4" />
      <AllowList allowlist={allowList} reload={reload} />
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '32px 80px',
  width: 'calc(100vw - 64px)',
})
