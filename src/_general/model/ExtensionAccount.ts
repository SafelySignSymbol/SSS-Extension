import { Account, Address, NetworkType, PublicAccount } from 'symbol-sdk'
import { decrypt } from '../lib/Crypto'
import {
  getGenerationHash,
  getNetworkTypeByAddress,
} from '../lib/Symbol/Config'

export type AccountType = 'PASS' | 'NOPASS' | 'HARD'

export interface IExtensionAccount {
  name: string
  encriptedPrivateKey: string
  publicKey: string
  address: string
  type: AccountType
  seed: number
}

export class ExtensionAccount implements IExtensionAccount {
  constructor(
    public name: string,
    public encriptedPrivateKey: string,
    public publicKey: string,
    public address: string,
    public type: AccountType,
    public seed: number
  ) {}

  public static createExtensionAccount(
    acc: ExtensionAccount
  ): ExtensionAccount {
    return new ExtensionAccount(
      acc.name,
      acc.encriptedPrivateKey,
      acc.publicKey,
      acc.address,
      acc.type,
      acc.seed
    )
  }

  public getAddress(): Address {
    return Address.createFromRawAddress(this.address)
  }

  public getExtensionAccount(): ExtensionAccount {
    return this
  }

  public getNetworktype(): NetworkType {
    const net = getNetworkTypeByAddress(this.address)
    return net
  }

  public getAccount(password: string): Account {
    const privateKey = this.decrypt(password)
    return Account.createFromPrivateKey(privateKey, this.getNetworktype())
  }

  public getPublicAccount(): PublicAccount {
    return PublicAccount.createFromPublicKey(
      this.publicKey,
      this.getNetworktype()
    )
  }

  public getGenerationHash(): string {
    return getGenerationHash(this.getNetworktype())
  }

  public decrypt(password: string): string {
    return decrypt(this.encriptedPrivateKey, password, this.seed)
  }
}
