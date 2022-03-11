import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getAllowList } from '../../../_general/lib/Storage'
import AllowList from './AllowList'
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
      <Wrap>
        <Typography text="許可リスト" variant="h5" />
        <Typography
          text="SSSを有効にしたドメインを確認・削除できます。"
          variant="subtitle1"
        />
      </Wrap>
      <AllowList allowlist={allowList} reload={reload} />
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '32px 10vw',
  minWidth: '60vw',
  width: '600px',
})
const Wrap = styled('div')({
  margin: '8px',
})
