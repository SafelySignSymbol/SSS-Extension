import { getEpoch, getNetworkTypeByAddress, getXymId } from './Config'
import {
  Address,
  Mosaic,
  MosaicId,
  MosaicInfo,
  NetworkType,
  Order,
  Page,
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

export const getAddressMosaics = (
  address: Address,
  url: string
): Promise<MosaicData[]> => {
  const NODE_URL = url
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
                    mosaics.push({
                      mosaicInfo: mosaicInfo,
                      mosaic: m,
                    })
                  } else if (
                    chainInfo.height <
                    mosaicInfo.startHeight.add(mosaicInfo.duration)
                  ) {
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
export const getAddressXym = (
  address: Address,
  url: string
): Promise<number> => {
  const net_type = getNetworkTypeByAddress(address.plain())

  const NODE_URL = url
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const accountHttp = repositoryFactory.createAccountRepository()

  return new Promise((resolve, reject) => {
    accountHttp
      .getAccountInfo(address)
      .toPromise()
      .then((accountInfo) => {
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
  pageNum: number,
  url: string,
  pageSize: number = 50
): Promise<Page<Transaction>> => {
  const NODE_URL = url
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const transactionHttp = repositoryFactory.createTransactionRepository()
  const searchCriteria: TransactionSearchCriteria = {
    group: TransactionGroup.Confirmed,
    address,
    pageNumber: pageNum,
    pageSize: pageSize,
    order: Order.Desc,
  }
  return new Promise((resolve, reject) => {
    transactionHttp
      .search(searchCriteria)
      .toPromise()
      .then((txs) => {
        resolve(txs)
      })
      .catch(() => {
        reject()
      })
  })
}
export const getTimeStamp = (
  height: UInt64,
  netType: NetworkType,
  url: string
): Promise<Date> => {
  const NODE_URL = url
  const repositoryFactory = new RepositoryFactoryHttp(NODE_URL)
  const blockRep = repositoryFactory.createBlockRepository()
  return new Promise((resolve, reject) => {
    blockRep
      .getBlockByHeight(height)
      .toPromise()
      .then((block) => {
        const d = new Date(block.timestamp.compact() + getEpoch(netType) * 1000)
        resolve(d)
      })
  })
}
