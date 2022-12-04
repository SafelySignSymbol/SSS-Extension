import { NetworkType } from 'symbol-sdk'
export const getGenerationHash = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4'
  } else {
    return '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6'
  }
}
export const getEpoch = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return 1667250467
  } else {
    return 1615853185
  }
}

export const getXymId = (type: NetworkType) => {
  if (type === NetworkType.TEST_NET) {
    return '72C0212E67A08BCE'
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

export const getExplorerLinkFromHash = (type: NetworkType, hash: string) => {
  if (type === NetworkType.TEST_NET) {
    return `https://testnet.symbol.fyi/transactions/${hash}`
  } else {
    return `https://symbol.fyi/transactions/${hash}`
  }
}
