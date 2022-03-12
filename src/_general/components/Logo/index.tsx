import styled from '@emotion/styled'

import { ReactComponent as SVG } from './logo.svg'
import { ReactComponent as SSVG } from './squarelogo.svg'

export interface Props {
  onClick: () => void
}

const Component: React.VFC<Props> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <SVG />
    </Wrapper>
  )
}

export default Component

export const SquareLogo: React.VFC<Props> = ({ onClick }) => {
  return (
    <SWrapper onClick={onClick}>
      <SSVG />
    </SWrapper>
  )
}

const Wrapper = styled('span')({
  cursor: 'pointer',
  '& > svg': {
    height: '80px',
  },
})
const SWrapper = styled('span')({
  cursor: 'pointer',
  '& > svg': {
    height: '64px',
  },
})
