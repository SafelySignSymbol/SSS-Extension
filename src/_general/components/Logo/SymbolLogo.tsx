import styled from '@emotion/styled'

import { ReactComponent as SVG } from './symbol.svg'

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

const Wrapper = styled('span')({
  cursor: 'pointer',
  width: '48px',
})
