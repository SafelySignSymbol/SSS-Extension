import { NetworkType } from 'symbol-sdk'
import { ExtensionAccount } from './ExtensionAccount'
export interface IActiveAccount {
  account: ExtensionAccount
  net_type: NetworkType
}

export class ActiveAccount implements IActiveAccount {
  constructor(public account: ExtensionAccount, public net_type: NetworkType) { }
}
