import {
  FOCUS_PAGE,
  INJECT_SSS,
  IS_ALLOW_DOMAIN,
  REMOVE_DATA,
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  REQUEST_MESSAGE_ENCODE,
  REQUEST_SIGN,
  REQUEST_SIGN_COSIGNATURE,
  REQUEST_SIGN_WITH_COSIGNATORIES,
  REQUEST_SSS,
  SET_MESSAGE,
  SET_TRANSACTION,
  SIGN_MESSAGE,
  SIGN_TRANSACTION,
} from './../_general/model/MessageType'
import {
  getActiveAccount,
  setCosignatories,
  setSignStatus,
} from '../_general/lib/Storage'
import { getSetting } from '../_general/lib/Storage/Setting'

import { OPEN_POPUP } from '../_general/model/MessageType'

const INJECT_SCRIPT = 'inject_script.js'
const SNACKBAR = 'snackbar.css'
const BODY = 'body'

export {}
const injectScript = function (file: string, node: any) {
  const th = document.getElementsByTagName(node)[0]
  const s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', chrome.runtime.getURL(file))
  return th.appendChild(s)
}

const injectStylefile = function (file: string, node: string) {
  const th = document.getElementsByTagName(node)[0]
  const s = document.createElement('link')
  s.setAttribute('rel', 'stylesheet')
  s.setAttribute('type', 'text/css')
  s.setAttribute('href', chrome.runtime.getURL(file))
  return th.appendChild(s)
}

const injectSSS = () => {
  getActiveAccount().then((activeAccount) => {
    getSetting().then((setting) => {
      setTimeout(() => {
        window.postMessage(
          {
            type: INJECT_SSS,
            publicKey: activeAccount.publicKey,
            address: activeAccount.address,
            name: activeAccount.name,
            lang: setting.lang,
          },
          window.opener
        )
      }, 50)
    })
  })
}

const isAllowedDoamin = () => {
  const domain = document.URL.split('://')[1].split('/')[0]
  chrome.runtime.sendMessage(
    {
      type: IS_ALLOW_DOMAIN,
      domain: domain,
    },
    (res) => {
      if (res.status) {
        injectSSS()
      }
    }
  )
}

injectScript(INJECT_SCRIPT, BODY)
injectStylefile(SNACKBAR, BODY)
isAllowedDoamin()

// receive message
window.addEventListener('message', async (event) => {
  if (event.data.function === REQUEST_MESSAGE_ENCODE) {
    setSignStatus(event.data.function)
  }
  if (event.data.function === REQUEST_ACTIVE_ACCOUNT_TOKEN) {
    setSignStatus(event.data.function)
  }
  if (event.data.function === FOCUS_PAGE) {
    isAllowedDoamin()
  }

  if (event.data.function === REMOVE_DATA) {
    chrome.runtime.sendMessage({ type: REMOVE_DATA })
  }

  if (event.data.function === REQUEST_SSS) {
    isAllowedDoamin()
  }

  if (event.data.function === SET_MESSAGE) {
    chrome.runtime.sendMessage({
      type: SET_MESSAGE,
      message: event.data.message,
      publicKey: event.data.pubkey,
    })
    chrome.runtime.sendMessage({ type: OPEN_POPUP })
  }

  if (event.data.function === SET_TRANSACTION) {
    chrome.runtime.sendMessage({
      type: SET_TRANSACTION,
      transaction: event.data.tx,
    })
    chrome.runtime.sendMessage({ type: OPEN_POPUP })
  }

  if (event.data.function === REQUEST_SIGN) {
    setSignStatus(event.data.function)
  }

  if (event.data.function === REQUEST_SIGN_WITH_COSIGNATORIES) {
    setSignStatus(event.data.function)
    setCosignatories(event.data.cosignatories)
  }

  if (event.data.function === REQUEST_SIGN_COSIGNATURE) {
    setSignStatus(event.data.function)
  }
})

// send message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === SIGN_TRANSACTION) {
    window.postMessage(
      {
        type: SIGN_TRANSACTION,
        signedTx: message.signedTx,
      },
      window.opener
    )
  }
  if (message.type === SIGN_MESSAGE) {
    window.postMessage(
      {
        type: SIGN_MESSAGE,
        encryptMessage: message.encryptMessage,
      },
      window.opener
    )
  }

  return true
  // if (message.type === 'SIGN_HARDWARE') {
  //   window.postMessage({
  //     type: 'SIGN_HARDWARE',
  //     tx: message.tx,
  //   }, '*')
  // }
})
