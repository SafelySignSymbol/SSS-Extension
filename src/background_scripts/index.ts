import { getData } from './../_general/lib/Storage/Data'
import {
  OPEN_POPUP,
  REMOVE_DATA,
  SET_TRANSACTION,
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

  if (message.type === 'requestSSS') {
    // console.log('requestSSS')
    getAllowList().then((list) => {
      // console.log('list', list)
    })
    return true
  }

  if (message.type === 'isAllowDoamin') {
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
    console.log('sign transaction')
    getData().then((data) => {
      chrome.tabs.sendMessage(data.tabId, {
        data,
        type: SIGN_TRANSACTION,
        signedTx: message.signedTx,
      })
    })
  }

  if (message.type === SET_TRANSACTION) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
      const [tab] = data
      setTransactionV2(message.transaction, tab.id)
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
