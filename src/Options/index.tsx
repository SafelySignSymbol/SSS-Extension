import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJson from '../_general/utils/locales/en.json'
import jaJson from '../_general/utils/locales/ja.json'
import koJson from '../_general/utils/locales/ko.json'
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
  getSetting,
  setSetting,
} from '../_general/lib/Storage/Setting'

export type Page = 'SETTING' | 'ALLOW' | 'HOME' | 'ACCOUNTS'

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    EN: { translation: enJson },
    JA: { translation: jaJson },
    KO: { translation: koJson },
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

  const [pageSetting, setPageSetting] = useState<Setting>({} as Setting)

  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) setOpenModal(true)
    })
  }, [])

  useEffect(() => {
    getSetting().then((s) => {
      const lang = (() => {
        if (s.lang === 'INIT') return window.navigator.language.toUpperCase()
        if (s.lang.toUpperCase() === 'KR') return 'KO'
        return s.lang.toUpperCase()
      })()
      if (s.lang !== lang) {
        const st = {
          lang: lang,
          session: s.session,
        }
        setPageSetting(st)
        setSetting(st)
        reload()
      }
      i18n.changeLanguage(lang)
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
          setting={pageSetting}
          setSetting={setPageSetting}
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
