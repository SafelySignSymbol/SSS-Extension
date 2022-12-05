import { getPopup, removePopup } from './../_general/lib/Storage/Popup'
import { getData, setMessageV2 } from './../_general/lib/Storage/Data'
import {
  IS_ALLOW_DOMAIN,
  OPEN_POPUP,
  RELOAD_PAGE,
  REMOVE_DATA,
  SET_ENCRYPTED_MESSAGE,
  SET_MESSAGE,
  SET_TRANSACTION,
  SIGN_MESSAGE,
  SIGN_MESSAGE_DECRYPT,
  SIGN_TRANSACTION,
} from './../_general/model/MessageType'
import {
  addAllowList,
  initialize,
  isAllowDomain,
  removeData,
  setTransactionV2,
} from '../_general/lib/Storage'

import { openPopup } from './utils'

chrome.runtime.onInstalled.addListener((detail) => {
  initialize()
  if (detail.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.openOptionsPage()
  }
  chrome.contextMenus.create({
    type: 'normal',
    id: 'contextmenu',
    title: 'Link to SSS',
  })
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === IS_ALLOW_DOMAIN) {
    isAllowDomain(message.domain).then((isAllow) => {
      if (isAllow) {
        chrome.action.setIcon({ path: 'sss64.png' })
      } else {
        chrome.action.setIcon({ path: 'sss64_gray.png' })
      }
      sendResponse({ status: isAllow })
    })
    return true
  }

  if (message.type === OPEN_POPUP) {
    openPopup()
  }
  if (message.type === REMOVE_DATA) {
    getPopup().then((id) => {
      removeData()
      removePopup()
      try {
        chrome.windows.remove(id)
      } catch {}
    })
  }

  if (message.type === SIGN_TRANSACTION) {
    getData().then((data) => {
      chrome.tabs.sendMessage(data.tabId, {
        data,
        type: SIGN_TRANSACTION,
        signedTx: message.signedTx,
      })
    })
  }
  if (message.type === SIGN_MESSAGE) {
    getData().then((data) => {
      chrome.tabs.sendMessage(data.tabId, {
        data,
        type: SIGN_MESSAGE,
        encryptMessage: message.encryptMessage,
      })
    })
  }
  if (message.type === SIGN_MESSAGE_DECRYPT) {
    console.log({ message })
    getData().then((data) => {
      chrome.tabs.sendMessage(data.tabId, {
        data,
        type: SIGN_MESSAGE_DECRYPT,
        decryptMessage: message.decryptMessage,
      })
    })
  }

  if (message.type === SET_TRANSACTION) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setTransactionV2(message.transaction, tab.id || 0)
    })
  }
  if (message.type === SET_MESSAGE) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setMessageV2(message.message, message.publicKey, 'PLAIN', tab.id || 0)
    })
  }
  if (message.type === SET_ENCRYPTED_MESSAGE) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setMessageV2(message.message, message.publicKey, 'ENCRYPTED', tab.id || 0)
    })
  }

  sendResponse({ status: 200 })
  return true
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const protocol = info.pageUrl.split('://')[0]
  const domain = info.pageUrl.split('://')[1].split('/')[0]
  addAllowList(protocol + '://' + domain)
  // console.log({ tab })
  chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
    // console.log({ data })
    const [tab] = data
    chrome.tabs.sendMessage(tab.id || 0, {
      type: RELOAD_PAGE,
    })
  })
})
