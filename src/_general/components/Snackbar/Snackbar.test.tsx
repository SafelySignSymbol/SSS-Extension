import { render, screen } from '@testing-library/react'
import { Snackbar, SnackbarType } from '.'

export {}

const test_snackbar_text = 'スナックバーに表示されるテキスト'
const test_snackbar_text_long =
  'テスト用のプログラムでスナックバーに表示されるとても長いテキストです'
describe('/components/Snackbar', () => {
  const Target: React.FC<{
    open: boolean
    text: string
    type: SnackbarType
  }> = ({ open, text, type }) => (
    <Snackbar isOpen={open} snackbarMessage={text} snackbarStatus={type} />
  )

  describe('活性時', () => {
    it('適切にレンダーできる: <DEFAULT>', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.DEFAULT}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('適切にレンダーできる: <INFO>', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.INFO}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('適切にレンダーできる: <ERROR>', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.ERROR}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('適切にレンダーできる: <WARN>', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.WARN}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('適切にレンダーできる: <SUCCESS>', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.SUCCESS}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('適切にレンダーできる: 長いテキスト', () => {
      const { container } = render(
        <Target
          open={true}
          text={test_snackbar_text_long}
          type={SnackbarType.DEFAULT}
        />
      )
      expect(container).toMatchSnapshot()
    })
    it('スナックバーに表示されるテキスト', () => {
      render(
        <Target
          open={true}
          text={test_snackbar_text}
          type={SnackbarType.DEFAULT}
        />
      )
      expect(screen.queryByText(test_snackbar_text)).toBeTruthy()
    })
  })
  // describe('非活性時にnullが帰る', () => {
  //   const { container } = render(
  //     <Target open={false} text="" type={SnackbarType.DEFAULT} />
  //   )
  //   console.log(container)
  //   expect(container).toEqual(null)
  // })
})
