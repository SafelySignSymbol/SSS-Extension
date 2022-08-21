import React from 'react'
import styled from '@emotion/styled'
import Logo from '../../../_general/components/Logo'
import Color from '../../../_general/utils/Color'
import { version } from '../../../_general/lib/Storage'
import { Links } from './Links'
import { communityLinks, infoLinks, helpLinks } from './link'

const copyright = 'Copyright © 2022 Safely Sign Symbol.'
const versionText = `version ${version}`

const Component: React.VFC = () => {
  return (
    <Root>
      <Container>
        <LogoWrapper>
          <Logo onClick={() => ''} />
        </LogoWrapper>
        <Right>
          <Links title="Community" links={communityLinks} />
          <Links title="Infomation" links={infoLinks} />
          <Links title="Help & Guide" links={helpLinks} />
        </Right>
      </Container>
      <FooterWrapper>
        <Text>{copyright}</Text>
        <Text>{versionText}</Text>
      </FooterWrapper>
    </Root>
  )
}

export default Component

const Root = styled('div')({
  position: 'relative',
  height: '240px',
})

const Container = styled('div')({
  display: 'flex',
  height: '220px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'white',
  position: 'absolute',
  bottom: 20,
})

const FooterWrapper = styled('div')({
  background: 'white',
  height: '20px',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const LogoWrapper = styled('div')({
  margin: '0px 64px',
})

const Text = styled('div')({
  color: Color.default,
  display: 'block',
  margin: '2px 64px',
  fontSize: '14px',
})

const Right = styled('div')({
  display: 'flex',
})
