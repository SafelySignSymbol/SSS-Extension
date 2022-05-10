import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJson from '../_general/utils/locales/en.json'
import jaJson from '../_general/utils/locales/ja.json'
import krJson from '../_general/utils/locales/kr.json'
import ruJson from '../_general/utils/locales/ru.json'
import itJson from '../_general/utils/locales/it.json'

import Home from './pages/Home'
import Header from './components/Header'
import AccountModal from './components/AccountModal'
import { getActiveAccount } from '../_general/lib/Storage'
import Settings from './pages/Settings'
import Allow from './pages/Allow'
import Accounts from './pages/Accounts'
import {
  Setting,
  InitSetting,
  getSetting,
} from '../_general/lib/Storage/Setting'

export type Page = 'SETTING' | 'ALLOW' | 'HOME' | 'ACCOUNTS'

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    EN: { translation: enJson },
    JA: { translation: jaJson },
    KR: { translation: krJson },
    RU: { translation: ruJson },
    IT: { translation: itJson },
    // ZH: { translation: jaJson },
    // UK: { translation: enJson },
  },
  lng: 'EN',
  fallbackLng: 'EN',
  returnEmptyString: false,
})

const Options: React.VFC = () => {
  const [page, setPage] = useState<Page>('HOME')

  const [openModal, setOpenModal] = useState(false)

  const [update, setUpdate] = useState(new Date())

  const [setting, setSetting] = useState<Setting>(InitSetting)

  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) setOpenModal(true)
      // setUpdate(new Date())
    })
  }, [])

  useEffect(() => {
    getSetting().then((s) => {
      setSetting(s)
      i18n.changeLanguage(s.lang)
    })
  }, [update])

  const reload = () => {
    setUpdate(new Date())
  }

  const getBody = () => {
    if (page === 'SETTING') {
      return (
        <Settings
          reload={reload}
          update={update}
          setting={setting}
          setSetting={setSetting}
        />
      )
    }

    if (page === 'ALLOW') {
      return <Allow reload={reload} update={update} />
    }
    if (page === 'ACCOUNTS') {
      return <Accounts reload={reload} update={update} />
    }

    if (page === 'HOME') {
      return <Home reload={reload} update={update} />
    }
  }

  const handleOpen = () => {
    setOpenModal(true)
    reload()
  }
  return (
    <Root>
      <Header page={page} setPage={setPage} handleOpen={handleOpen} />
      <AccountModal open={openModal} setOpen={setOpenModal} reload={reload} />
      <Contents>{getBody()}</Contents>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  height: '100vh',
})

const Contents = styled('div')({
  display: 'flex',
})
