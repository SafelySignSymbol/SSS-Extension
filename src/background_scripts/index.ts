import { getData, setMessageV2 } from './../_general/lib/Storage/Data'
import {
  IS_ALLOW_DOMAIN,
  OPEN_POPUP,
  REMOVE_DATA,
  REQUEST_SSS,
  SET_MESSAGE,
  SET_TRANSACTION,
  SIGN_MESSAGE,
  SIGN_TRANSACTION,
} from './../_general/model/MessageType'
import {
  addAllowList,
  getAllowList,
  getTransaction,
  initialize,
  isAllowDomain,
  removeData,
  removeTransaction,
  setTransactionV2,
} from '../_general/lib/Storage'

import { openPopup } from './utils'

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()
  chrome.contextMenus.create({
    type: 'normal',
    id: 'contextmenu',
    title: 'Link to SSS',
  })
  initialize()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'removeTransaction') {
    setTimeout(() => {
      getTransaction().then((tx) => {
        // console.log('tx', tx)
        if (tx !== null) {
          removeTransaction()
        }
        sendResponse({ status: 200 })
      })
    }, 60 * 1000)
    return true
  }

  if (message.type === REQUEST_SSS) {
    getAllowList().then((list) => {
      // console.log('list', list)
    })
    return true
  }

  if (message.type === IS_ALLOW_DOMAIN) {
    isAllowDomain(message.domain).then((isAllow) => {
      console.log({ isAllow })
      sendResponse({ status: isAllow })
    })
    return true
  }

  // +++++++++++++++++++++++++++++++++++++++

  if (message.type === OPEN_POPUP) {
    openPopup()
  }

  if (message.type === REMOVE_DATA) {
    removeData()
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

  if (message.type === SET_TRANSACTION) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setTransactionV2(message.transaction, tab.id)
    })
  }
  if (message.type === SET_MESSAGE) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setMessageV2(message.message, message.publicKey, tab.id)
    })
  }

  sendResponse({ status: 200 })
  return true
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const protocol = info.pageUrl.split('://')[0]
  const domain = info.pageUrl.split('://')[1].split('/')[0]
  addAllowList(protocol + '://' + domain)
})
