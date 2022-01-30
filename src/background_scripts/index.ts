import { addExtensionAccount, initialize } from '../_general/lib/Storage'
import { ExtensionAccount } from '../_general/model/ExtensionAccount'

console.log('background')

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()

  initialize()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_ACCOUNT') {
    console.log('msg[bg]', message)
    const extensionAccount = new ExtensionAccount(
      message.pk,
      message.pubKey,
      message.addr
    )
    addExtensionAccount(extensionAccount)
  }
})
