export interface IExtensionAccount {
  encriptedPrivateKey: string
  publicKey: string
  address: string
}

export class ExtensionAccount implements IExtensionAccount {
  constructor(
    public encriptedPrivateKey: string,
    public publicKey: string,
    public address: string
  ) {}

  public getAccount(): IExtensionAccount {
    return {
      encriptedPrivateKey: this.encriptedPrivateKey,
      publicKey: this.publicKey,
      address: this.address,
    }
  }
}
