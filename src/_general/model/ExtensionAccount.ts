export interface IExtensionAccount {
  encriptedPrivateKey: string
  publicKey: string
  address: string
  type: 'PASS' | 'NOPASS' | 'HARD'
}

export class ExtensionAccount implements IExtensionAccount {
  constructor(
    public encriptedPrivateKey: string,
    public publicKey: string,
    public address: string,
    public type: 'PASS' | 'NOPASS' | 'HARD'
  ) {}

  public getAccount(): IExtensionAccount {
    return {
      encriptedPrivateKey: this.encriptedPrivateKey,
      publicKey: this.publicKey,
      address: this.address,
      type: this.type,
    }
  }
}
