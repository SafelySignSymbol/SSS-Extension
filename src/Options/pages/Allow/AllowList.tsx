import React, { useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiAddFill } from 'react-icons/ri'
import { BsBoxArrowUpRight, BsXSquare } from 'react-icons/bs'
import { addAllowList, deleteAllowList } from '../../../_general/lib/Storage'

import Spacer from '../../../_general/components/Spacer'

import { useTranslation } from 'react-i18next'
import TextField from '../../../_general/components/TextField'
export type Props = {
  allowlist: string[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ allowlist, reload }) => {
  const [t] = useTranslation()
  const [domainName, setDomainName] = useState('')
  const deny = (num: number) => {
    deleteAllowList(num).then(() => {
      reload()
    })
  }

  const allow = () => {
    addAllowList(domainName).then(() => {
      reload()
    })
  }

  if (allowlist.length === 0)
    return (
      <div>
        <div>{t('allowlist_howuse_e')}</div>
        <Spacer MBottom="40px" MTop="20px">
          <Wrap>
            <TextField
              label="Domain Name"
              setText={setDomainName}
              variant="text"
            />
            <IconButton size="small" onClick={allow}>
              <IconContext.Provider value={{ size: '24px' }}>
                <RiAddFill style={{ margin: '6px' }} />
              </IconContext.Provider>
            </IconButton>
          </Wrap>
        </Spacer>
      </div>
    )

  return (
    <Wrapper>
      <Spacer MBottom="40px" MTop="20px">
        <Wrap>
          <TextField
            label="Domain Name"
            setText={setDomainName}
            variant="text"
          />
          <IconButton size="small" onClick={allow}>
            <IconContext.Provider value={{ size: '24px' }}>
              <RiAddFill style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Wrap>
      </Spacer>
      {allowlist.map((e, i) => {
        return (
          <Wrap key={i}>
            <Typography text={e} variant="h5" />
            <IconWrapper>
              <IconButton size="small" onClick={() => window.open(e, '_blank')}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <BsBoxArrowUpRight style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
              <IconButton size="small" onClick={() => deny(i)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <BsXSquare style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </IconWrapper>
          </Wrap>
        )
      })}
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  display: 'flex',
  flexFlow: 'column wrap',
})

const Wrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'white',
  padding: '16px',
  margin: '8px',
})
const IconWrapper = styled('div')({
  margin: '8px',
})
