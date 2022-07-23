import React from 'react'
import styled from '@emotion/styled'
import Logo from '../../_general/components/Logo'
import Color from '../../_general/utils/Color'
import { version } from '../../_general/lib/Storage'

const Component: React.VFC = () => {
  return (
    <Root>
      <Container>
        <LogoWrapper>
          <Logo onClick={() => ''} />
        </LogoWrapper>
        <Wrapper>
          <Title>Community</Title>
          <LinksWrapper>
            <Link href="https://twitter.com/SSS_Symbol">Twitter</Link>
            <Link href="https://discord.gg/t84XCanB8F">Discord</Link>
            <Link href="https://discord.gg/xymcity">XYM City</Link>
            <Link href="https://discord.gg/kKfUNhDCEJ">Japan User Group</Link>
          </LinksWrapper>
        </Wrapper>
        <Wrapper>
          <Title>Links</Title>
          <LinksWrapper>
            <Link href="https://github.com/inatatsu-tatsuhiro/SSS-Extension">
              GitHub
            </Link>
            <Link href="https://github.com/inatatsu-tatsuhiro/SSS-Extension/wiki">
              Wiki
            </Link>
            <Link href="https://inatatsu-tatsuhiro.github.io/SSS-Demo/">
              Demo
            </Link>
          </LinksWrapper>
        </Wrapper>
      </Container>
      <FooterWrapper>
        <Text>© 2022 Tatsuhiro Inagaki</Text>
        <Text>version {version}</Text>
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
  margin: '0px 220px',
})
const Wrapper = styled('div')({
  width: '200px',
  height: 'calc(100% - 80px)',
  marginTop: '80px',
})

const Title = styled('div')({
  marginBottom: '16px',
  fontSize: '16px',
})

const Link = styled('a')({
  textDecoration: 'none',
  color: Color.blue,
  display: 'block',
  margin: '0px 16px',
  fontSize: '14px',
})
const Text = styled('div')({
  color: Color.default,
  display: 'block',
  margin: '2px 20px',
  fontSize: '14px',
})

const LinksWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
})
