import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import Typography from '../../../_general/components/Typography'
import Button from '../../../_general/components/Button'
import { NetworkType, SignedTransaction } from 'symbol-sdk'
import {
  deleteAllAccount,
  deleteAllDomain,
  getHistory,
  initializeSetting,
} from '../../../_general/lib/Storage'
import {
  Setting,
  changeLang,
  changeNetwork,
  changeSession,
  resetLocalSession,
} from '../../../_general/lib/Storage/Setting'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'

import { MdExpandMore } from 'react-icons/md'
import { IconContext } from 'react-icons'
import Color from '../../../_general/utils/Color'
interface Props {
  reload: () => void
  update: Date
  setting: Setting
  setSetting: Dispatch<Setting>
}

const langs = [
  {
    key: '日本語',
    value: 'JA',
  },
  {
    key: 'English',
    value: 'EN',
  },
  {
    key: '한국어',
    value: 'KO',
  },
  {
    key: 'Русский',
    value: 'RU',
  },
  {
    key: 'Italian',
    value: 'IT',
  },
  // {
  //   key: '中文简体',
  //   value: 'ZH',
  // },
  // {
  //   key: 'ウクライナ',
  //   value: 'UK',
  // },
]

const sessionTimes = [
  {
    key: '0',
  },
  {
    key: '1 min',
  },
  {
    key: '5 min',
  },
  {
    key: '10 min',
  },
  {
    key: '15 min',
  },
  {
    key: '30 min',
  },
]

const networks = [
  {
    name: 'TEST NET',
    value: NetworkType.TEST_NET,
  },
  {
    name: 'MAIN NET',
    value: NetworkType.MAIN_NET,
  },
]

const Options: React.VFC<Props> = ({ reload, update, setting, setSetting }) => {
  const [history, setHistory] = useState<SignedTransaction[]>([])

  const [t] = useTranslation()

  useEffect(() => {
    getHistory().then((h) => {
      setHistory(h)
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

  const changeLanguage = (val: string) => {
    changeLang(val)
      .then((data) => {
        setSetting(data)
      })
      .finally(() => {
        reload()
      })
  }

  const init = () => {
    if (window.confirm(`${t('setting_delete_all')} : OK ?`)) {
      initializeSetting()
    }
  }
  const initAccount = () => {
    if (window.confirm(`${t('setting_delete_account')} : OK ?`)) {
      deleteAllAccount()
    }
  }
  const initDomain = () => {
    if (window.confirm(`${t('setting_delete_domain')} : OK ?`)) {
      deleteAllDomain()
    }
  }

  const changeNet = (val: NetworkType) => {
    changeNetwork(
      val === NetworkType.MAIN_NET ? NetworkType.MAIN_NET : NetworkType.TEST_NET
    ).then(() => {
      reload()
    })
  }

  const changeSessionTime = (min: string) => {
    changeSession(Number(min.split(' ')[0]) * 60 * 1000).then(() => {
      resetLocalSession()
      reload()
    })
  }

  return (
    <Root>
      <Wrapper>
        <Column>
          <Typography text={t('setting_sign_history')} fontSize={24} />
          <Typography text={t('setting_sign_history_e')} fontSize={16} />
        </Column>
        <Center>
          <Button text={t('setting_sign_history_btn')} onClick={save} />
        </Center>
      </Wrapper>

      <Wrapper>
        <Column>
          <Typography text={t('setting_change_network')} fontSize={24} />
          <Typography text={t('setting_change_network_e')} fontSize={16} />
        </Column>
        <Center>
          <FormControl sx={{ width: 160 }}>
            <InputLabel id="demo-multiple-name-label">Network</InputLabel>
            <Select
              labelId="setting-network-label"
              id="setting-network-name"
              value={setting.networkType}
              label="Network"
              onChange={(e) => changeNet(e.target.value as NetworkType)}>
              {networks.map((n) => (
                <MenuItem key={n.name} value={n.value}>
                  {n.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Center>
      </Wrapper>

      <Wrapper>
        <Column>
          <Typography text={t('setting_change_langage')} fontSize={24} />
          <Typography text={t('setting_change_langage_e')} fontSize={16} />
        </Column>
        <Center>
          <FormControl sx={{ width: 160 }}>
            <InputLabel id="demo-multiple-name-label">Langage</InputLabel>
            <Select
              labelId="setting-lang-label"
              id="setting-lang-name"
              value={setting.lang}
              label="Language"
              onChange={(e) => changeLanguage(e.target.value as string)}>
              {langs.map((l) => (
                <MenuItem key={l.key} value={l.value}>
                  {l.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Center>
      </Wrapper>

      <Wrapper>
        <Column>
          <Typography text={t('setting_change_session')} fontSize={24} />
          <Typography text={t('setting_change_session_e')} fontSize={16} />
        </Column>
        <Center>
          <FormControl sx={{ width: 160 }}>
            <InputLabel id="demo-multiple-name-label">Session Time</InputLabel>
            <Select
              labelId="setting-session-label"
              id="setting-session"
              label="Session Time"
              value={
                setting.session === 0
                  ? '0'
                  : `${setting.session / (1000 * 60)} min`
              }
              onChange={(e) => changeSessionTime(String(e.target.value))}>
              {sessionTimes.map((n) => (
                <MenuItem key={n.key} value={n.key}>
                  {n.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Center>
      </Wrapper>

      <SDivider />
      <Wrapper>
        <SAccordion>
          <AccordionSummary
            expandIcon={
              <IconContext.Provider value={{ size: '24px' }}>
                <MdExpandMore style={{ margin: '6px' }} />
              </IconContext.Provider>
            }
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography text={t('setting_delete')} fontSize={24} />
          </AccordionSummary>
          <AccordionDetails>
            <Wrapper>
              <Column>
                <Typography text={t('setting_delete_account')} fontSize={24} />
              </Column>
              <Center>
                <Button
                  text="RESET"
                  onClick={() => {
                    initAccount()
                    reload()
                  }}
                />
              </Center>
            </Wrapper>
            <Wrapper>
              <Column>
                <Typography text={t('setting_delete_domain')} fontSize={24} />
              </Column>
              <Center>
                <Button
                  text="RESET"
                  onClick={() => {
                    initDomain()
                    reload()
                  }}
                />
              </Center>
            </Wrapper>
            <Wrapper>
              <Column>
                <Typography text={t('setting_delete_all')} fontSize={24} />
              </Column>
              <Center>
                <Button
                  text="RESET"
                  onClick={() => {
                    init()
                    reload()
                  }}
                />
              </Center>
            </Wrapper>
          </AccordionDetails>
        </SAccordion>
      </Wrapper>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  margin: '40px 0px',
  minWidth: '60vw',
  width: '1000px',
})
const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '8px',
  padding: '24px',
  background: 'white',
  borderBottom: `solid 1px ${Color.grayscale}`,
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

const SAccordion = styled(Accordion)({
  boxShadow: 'none',
  background: 'white',
  width: '100%',
  '> div': {
    padding: '0px',
    paddingRight: '16px',
  },
  ':before': {
    opacity: '0 !important',
  },
})

const SDivider = styled('div')({
  height: '32px',
  width: '100%',
})
