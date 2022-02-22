import React from 'react'
import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { GoHome } from 'react-icons/go'
import { BsClockHistory } from 'react-icons/bs'
import { RiSettings2Fill } from 'react-icons/ri'
import { MdOutlineDomainVerification } from 'react-icons/md'

const Component: React.VFC = () => {
  return (
    <Sideber>
      <IconButton size="small" onClick={() => console.log('')}>
        <IconContext.Provider value={{ size: '48px' }}>
          <GoHome style={{ margin: '6px' }} />
        </IconContext.Provider>
      </IconButton>
      <IconButton size="small" onClick={() => console.log('')}>
        <IconContext.Provider value={{ size: '48px' }}>
          <BsClockHistory style={{ margin: '6px' }} />
        </IconContext.Provider>
      </IconButton>
      <IconButton size="small" onClick={() => console.log('')}>
        <IconContext.Provider value={{ size: '48px' }}>
          <MdOutlineDomainVerification style={{ margin: '6px' }} />
        </IconContext.Provider>
      </IconButton>
      <IconButton size="small" onClick={() => console.log('')}>
        <IconContext.Provider value={{ size: '48px' }}>
          <RiSettings2Fill style={{ margin: '6px' }} />
        </IconContext.Provider>
      </IconButton>
    </Sideber>
  )
}

export default Component

const Sideber = styled('div')({
  height: 'calc(100vh - 64px)',
  minWidth: '64px',
  maxWidth: '64px',
  background: 'gray',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
})
