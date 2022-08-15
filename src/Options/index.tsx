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
import Settings from './pages/Settings'
import Allow from './pages/Allow'
import History from './pages/History'
import Accounts from './pages/Accounts'
import { Setting, getSetting } from '../_general/lib/Storage/Setting'
import Footer from './components/Footer'
import { getExtensionAccounts } from '../_general/lib/Storage'

export type Page = 'SETTING' | 'ALLOW' | 'HOME' | 'ACCOUNTS' | 'HISTORY'
export type Select = 'SETTING' | 'ACCOUNT' | 'NONE'

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

  const [state, setState] = useState(0)

  const [update, setUpdate] = useState(new Date())

  const [pageSetting, setPageSetting] = useState<Setting>({} as Setting)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  useEffect(() => {
    getSetting().then((s) => {
      if (s.lang === 'INIT') {
        const l = navigator.language.toUpperCase()
        i18n.changeLanguage(l)
        const setting = s
        setting.lang = l
        setPageSetting(setting)
      } else {
        i18n.changeLanguage(s.lang)
        console.log({ s })
        setPageSetting(s)
      }
    })
  }, [update])

  useEffect(() => {
    getExtensionAccounts().then((accs) => {
      if (accs.length === 0) {
        setState(1)
      }
    })
  }, [])

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
      return <Accounts reload={reload} update={update} setting={pageSetting} />
    }

    if (page === 'HOME') {
      return <Home reload={reload} update={update} setting={pageSetting} />
    }
    if (page === 'HISTORY') {
      return <History reload={reload} update={update} setting={pageSetting} />
    }
  }

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (select: Select) => {
    if (select === 'SETTING') {
      setPage('SETTING')
    }

    if (select === 'ACCOUNT') {
      setState(1)
    }
    setAnchorEl(null)
  }

  return (
    <Root>
      <Header
        page={page}
        setPage={setPage}
        handleOpen={handleOpen}
        handleClose={handleClose}
        anchorEl={anchorEl}
        setting={pageSetting}
        update={update}
      />
      <AccountModal state={state} setState={setState} reload={reload} />
      <Contents>{getBody()}</Contents>
      <Footer />
    </Root>
  )
}

export default Options

const Root = styled('div')({
  height: '100vh',
})

const Contents = styled('div')({
  display: 'flex',
  minHeight: 'calc(100% - 320px)',
})
