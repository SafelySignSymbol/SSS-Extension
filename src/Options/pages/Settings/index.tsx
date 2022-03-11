import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'
import Button from '../../../_general/components/Button'
import { SignedTransaction } from 'symbol-sdk'
import { getHistory } from '../../../_general/lib/Storage'
import {
  getSetting,
  InitSetting,
  Setting,
  setSetting as setExtensionSetting,
} from '../../../_general/lib/Storage/Setting'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [history, setHistory] = useState<SignedTransaction[]>([])
  const [setting, setSetting] = useState<Setting>(InitSetting)

  useEffect(() => {
    getHistory().then((h) => {
      setHistory(h)
    })

    getSetting().then((s) => {
      setSetting(s)
    })
  }, [update])

  const save = () => {
    const historyText =
      'SSS Extension Sign History \n======================\n' +
      history.map((h) => JSON.stringify(h)).join('\n======================\n')
    const blob = new Blob([historyText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const now = new Date()
    const filename = `SSS_SignHistory-${now.getFullYear()}/${now.getMonth()}/${now.getDate()}-.txt`
    a.download = filename
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const changeLang = () => {
    const newSetting: Setting = {
      lang: setting.lang === 'JA' ? 'JA' : 'JA',
      session: setting.session,
    }

    setSetting(newSetting)
    setExtensionSetting(newSetting)
  }

  return (
    <Root>
      <Wrapper>
        <Column>
          <Typography text="署名履歴" variant="h5" />
          <Typography
            text="SSS Extensionを用いて署名を行ったトランザクションの情報を保存します。"
            variant="subtitle1"
          />
        </Column>
        <Center>
          <Button text="ダウンロード" onClick={save} />
        </Center>
      </Wrapper>
      <Wrapper>
        <Column>
          <Typography text="言語設定" variant="h5" />
          <Typography
            text="SSS上のテキストの言語を設定します。(*現在は日本語のみ)"
            variant="subtitle1"
          />
        </Column>
        <Center>
          <Button text={setting.lang || 'JA'} onClick={changeLang} />
        </Center>
      </Wrapper>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  margin: '32px 10vw',
  minWidth: '60vw',
  width: '600px',
})
const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px',
  padding: '16px',
  background: 'white',
})
const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'column',
})
