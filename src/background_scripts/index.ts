import { addExtensionAccount, setStorage } from '../_general/lib/Storage'
import { ExtensionAccount } from '../_general/model/ExtensionAccount'

export {
  EncryptedPriKey,
  Address,
  PublicKey,
} from '../_general/lib/Storage/Type'
console.log('background')

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()

  setStorage({
    extensionAccounts: [],
    accountsCount: 0,
    activeAccount: null,
    transaction: null,
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_ACCOUNT') {
    console.log('msg[bg]', message)
    // setStorage({
    //   EncryptedPriKey: message.pk,
    //   Address: message.addr,
    //   PublicKey: message.pubKey,
    // })
    const extensionAccount = new ExtensionAccount(
      message.pk,
      message.pubKey,
      message.addr
    )
    addExtensionAccount(extensionAccount)
  }
})
