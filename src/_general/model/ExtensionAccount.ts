import { NetworkType } from "symbol-sdk"
import { decrypt } from "../lib/Crypto"
import { getNetworkTypeByAddress } from "../lib/Symbol/Config"

export interface IExtensionAccount {
  name: string
  encriptedPrivateKey: string
  publicKey: string
  address: string
  type: 'PASS' | 'NOPASS' | 'HARD'
  seed: number
}

export class ExtensionAccount implements IExtensionAccount {
  constructor(
    public name: string,
    public encriptedPrivateKey: string,
    public publicKey: string,
    public address: string,
    public type: 'PASS' | 'NOPASS' | 'HARD',
    public seed: number
  ) {}

  public getAccount(): IExtensionAccount {
    return {
      name: this.name,
      encriptedPrivateKey: this.encriptedPrivateKey,
      publicKey: this.publicKey,
      address: this.address,
      type: this.type,
      seed: this.seed,
    }
  }

  public getNetworktype(): NetworkType {
    return getNetworkTypeByAddress(this.address)
  }

  public decrypt(password: string): string {
    return decrypt(this.encriptedPrivateKey, password, this.seed)
  }
}
