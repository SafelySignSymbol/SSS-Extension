import { validateAddress, validatePrivateKey } from './index'

describe('validateAddress', (): void => {
  test('ok', (): void => {
    const res = validateAddress('TDEC5VUUAUYHKI2Y45WBDMGODAS42P3PPCTMGUY')
    expect(res).toBe('TDEC5VUUAUYHKI2Y45WBDMGODAS42P3PPCTMGUY')
  })
  test('not length 39', (): void => {
    const res = validateAddress('TDEC5VUUAUYHKI2Y45WBDMGODAS42P3PPCTMGUYA')
    expect(res).toBe('')
  })
  test('not A-Z0-9', (): void => {
    const res = validateAddress('TDEC5VUUAUYHKI2Y45WBDMGODAS42P3PPCTMGUa')
    expect(res).toBe('')
  })
})
describe('validatePriKey', (): void => {
  test('ok', (): void => {
    const res = validatePrivateKey(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    )
    expect(res).toBe(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    )
  })
  test('not length 64', (): void => {
    const res = validatePrivateKey(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    )
    expect(res).toBe('')
  })
  test('not A-F0-9', (): void => {
    const res = validatePrivateKey(
      'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
    )
    expect(res).toBe('')
  })
})
