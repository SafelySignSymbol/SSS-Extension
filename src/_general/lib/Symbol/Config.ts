import { NetworkType } from 'symbol-sdk'
export const getGenerationHash = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return '7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836'
  } else {
    return '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6'
  }
}
export const getEpoch = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return 1637848847
  } else {
    return 1615853185
  }
}

export const getXymId = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return '3A8416DB2D53B6C8'
  } else {
    return '6BED913FA20223F8'
  }
}

export const getNodeUrl = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return 'https://sym-test.opening-line.jp:3001'
  } else {
    return 'https://sym-main.opening-line.jp:3001'
  }
}

export const getNetworkTypeByAddress = (address: string) => {
  return address.charAt(0) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET
}
