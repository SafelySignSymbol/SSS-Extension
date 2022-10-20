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
import {
  Setting,
  getSetting,
  checkLoginSession,
  resetLocalSession,
} from '../_general/lib/Storage/Setting'
import Footer from './components/Footer'
import { getExtensionAccounts } from '../_general/lib/Storage'

import { useRecoilState } from 'recoil'

import { networkAtom } from '../_general/utils/Atom'

import { getActiveNode } from 'symbol-node-util'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNetwork] = useRecoilState(networkAtom)

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
        setPageSetting(s)
      }
      getActiveNode(s.networkType as number).then((node) => {
        setNetwork(node)
      })
    })

    if (!checkLoginSession()) {
      resetLocalSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  width: 'calc(100vw - 128px)',
  margin: '0px 64px',
})
