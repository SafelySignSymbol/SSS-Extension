export interface IEncriptionMessage {
  message: string
  pubkey: string
}

export class EncriptionMessage implements IEncriptionMessage {
  constructor(public message: string, public pubkey: string) {}

  public getEncriptionMessage(): IEncriptionMessage {
    return {
      message: this.message,
      pubkey: this.pubkey,
    }
  }
}
