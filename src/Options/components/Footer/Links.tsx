import styled from '@emotion/styled'

import Color from '../../../_general/utils/Color'

export interface LinksProps {
  title: string
  links: LinkType[]
}

export interface LinkType {
  label: string
  href: string
}

export const Links = ({ title, links }: LinksProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <LinksWrapper>
        {links.map((link) => {
          return <Link href={link.href}>{link.label}</Link>
        })}
      </LinksWrapper>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '200px',
  height: 'calc(100% - 80px)',
  marginTop: '20px',
})

const Title = styled('div')({
  marginBottom: '16px',
  fontSize: '16px',
})

const LinksWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
})

const Link = styled('a')({
  textDecoration: 'none',
  color: Color.blue,
  display: 'block',
  margin: '4px 8px',
  fontSize: '14px',
})
