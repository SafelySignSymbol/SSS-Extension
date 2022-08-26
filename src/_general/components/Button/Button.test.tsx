import { fireEvent, render, screen } from '@testing-library/react'
import Button from '.'

const expected_label = 'EXPECTED'
const unexpected_label = 'UN EXPECTED'

describe('/components/Button', () => {
  const onClickMock = jest.fn()
  const Target: React.FC<{ text: string }> = ({ text }) => (
    <Button text={text} onClick={onClickMock} />
  )

  describe('適切にレンダーできる', () => {
    const { container } = render(<Target text="TEST" />)
    expect(container).toMatchSnapshot()
  })

  test('ボタンのラベルテキストの一致する場合、真になる', () => {
    render(<Target text={expected_label} />)
    expect(screen.queryByText(expected_label)).toBeTruthy()
  })
  test('ボタンのラベルテキストが一致しない場合、偽になる', () => {
    render(<Target text={expected_label} />)
    expect(screen.queryByText(unexpected_label)).toBeFalsy()
  })
  test('クリック時にハンドラが呼ばれる', () => {
    render(<Target text={expected_label} />)
    fireEvent.click(screen.getByText(expected_label))
    expect(onClickMock).toBeCalled()
  })
})
