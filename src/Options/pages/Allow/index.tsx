import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getAllowList } from '../../../_general/lib/Storage'
import AllowList from './AllowList'
import Typography from '../../../_general/components/Typography'
import { useTranslation } from 'react-i18next'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [allowList, setAllowList] = useState<string[]>([])
  const [t] = useTranslation()

  useEffect(() => {
    getAllowList().then((list) => {
      setAllowList(list)
    })
  }, [update])

  return (
    <Wrapper>
      <Wrap>
        <Typography text={t('allowlist_title')} variant="h5" />
        <Typography text={t('allowlist_title_e')} variant="subtitle1" />
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
