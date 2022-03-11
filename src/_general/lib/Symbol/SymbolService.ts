import {
  getEpoch,
  getNetworkTypeByAddress,
  getNodeUrl,
  getXymId,
} from './Config'
import {
  Address,
  Mosaic,
  MosaicId,
  MosaicInfo,
  NetworkType,
  Order,
  RepositoryFactoryHttp,
  Transaction,
  TransactionGroup,
  TransactionSearchCriteria,
  UInt64,
} from 'symbol-sdk'

export type MosaicData = {
  mosaic: Mosaic
  mosaicInfo: MosaicInfo
}

export const getAddressMosaics = (address: Address): Promise<MosaicData[]> => {
  const net_type =
    address.plain().charAt(0) === 'T'
      ? NetworkType.TEST_NET
      : NetworkType.MAIN_NET

  const NODE_URL = getNodeUrl(net_type)
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const accountHttp = repositoryFactory.createAccountRepository()
  const mosaicHttp = repositoryFactory.createMosaicRepository()

  const mosaics: MosaicData[] = []

  return new Promise((resolve, reject) => {
    accountHttp
      .getAccountInfo(address)
      .toPromise()
      .then((accountInfo) => {
        repositoryFactory
          .createChainRepository()
          .getChainInfo()
          .toPromise()
          .then((chainInfo) => {
            for (let m of accountInfo.mosaics) {
              mosaicHttp.getMosaic(new MosaicId(m.id.id.toHex())).subscribe(
                (mosaicInfo) => {
                  if (mosaicInfo.duration.toString() === '0') {
                    console.log('mosaic', mosaicInfo)
                    mosaics.push({
                      mosaicInfo: mosaicInfo,
                      mosaic: m,
                    })
                  } else if (
                    chainInfo.height <
                    mosaicInfo.startHeight.add(mosaicInfo.duration)
                  ) {
                    console.log('mosaic', mosaicInfo)
                    mosaics.push({
                      mosaicInfo: mosaicInfo,
                      mosaic: m,
                    })
                  }
                },
                (err) => console.error(err)
              )
            }
            resolve(mosaics)
          })
          .catch(() => {
            reject()
          })
      })
      .catch(() => {
        reject()
      })
  })
}
export const getAddressXym = (address: Address): Promise<number> => {
  const net_type = getNetworkTypeByAddress(address.plain())

  const NODE_URL = getNodeUrl(net_type)
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const accountHttp = repositoryFactory.createAccountRepository()

  return new Promise((resolve, reject) => {
    accountHttp
      .getAccountInfo(address)
      .toPromise()
      .then((accountInfo) => {
        console.log('info', accountInfo)
        for (let m of accountInfo.mosaics) {
          if (m.id.id.toHex() === getXymId(net_type)) {
            resolve(m.amount.compact())
          }
        }
        reject()
      })
      .catch(() => {
        reject()
      })
  })
}
export const getTransactions = (
  address: Address,
  pageNum: number
): Promise<Transaction[]> => {
  const net_type = getNetworkTypeByAddress(address.plain())

  const NODE_URL = getNodeUrl(net_type)
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const transactionHttp = repositoryFactory.createTransactionRepository()
  const searchCriteria: TransactionSearchCriteria = {
    group: TransactionGroup.Confirmed,
    address,
    pageNumber: pageNum,
    pageSize: 50,
    order: Order.Desc,
  }
  return new Promise((resolve, reject) => {
    transactionHttp
      .search(searchCriteria)
      .toPromise()
      .then((txs) => {
        // console.log('txs', txs)
        resolve(txs.data)
      })
      .catch(() => {
        reject()
      })
  })
}
export const getTimeStamp = (
  height: UInt64,
  netType: NetworkType
): Promise<Date> => {
  const NODE_URL = getNodeUrl(netType)
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const blockRep = repositoryFactory.createBlockRepository()
  return new Promise((resolve, reject) => {
    blockRep
      .getBlockByHeight(height)
      .toPromise()
      .then((block) => {
        const d = new Date(block.timestamp.compact() + getEpoch(netType) * 1000)
        resolve(d)
        // console.log('block', (n.getMilliseconds() + d.getMilliseconds()).toString())
      })
  })
}
