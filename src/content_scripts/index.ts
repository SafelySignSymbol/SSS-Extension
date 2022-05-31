import {
  INJECT_SSS,
  REMOVE_DATA,
  REQUEST_SIGN,
  SET_TRANSACTION,
  SIGN_TRANSACTION,
} from './../_general/model/MessageType'
import {
  getActiveAccount,
  setCosignatories,
  setSignStatus,
  setTransaction,
  setTransactionHash,
  setEncriptionMessage,
  setTransactionV2,
} from '../_general/lib/Storage'
import { getSetting } from '../_general/lib/Storage/Setting'

import { OPEN_POPUP } from '../_general/model/MessageType'

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
      type: 'isAllowDoamin',
      domain: domain,
    },
    (res) => {
      // console.log('res', res)
      if (res.status) {
        injectSSS()
      }
    }
  )
}

injectScript('inject_script.js', 'body')
injectStylefile('snackbar.css', 'body')
isAllowedDoamin()

// receive message
window.addEventListener('message', async (event) => {
  console.log('data', event.data)
  if (event.data.to === 'CONTENT') {
    console.log('signed data receiced!!!')
  }
  if (event.data.function === 'setEncriptionMessage') {
    setEncriptionMessage(event.data.message, event.data.pubkey)
  }
  if (event.data.function === 'requestEncriptMessage') {
    setSignStatus(event.data.function)
    chrome.runtime.sendMessage({ type: 'removeMessage' })
  }
  if (event.data.function === 'requestGetToken') {
    setSignStatus(event.data.function)
    chrome.runtime.sendMessage({ type: 'removeMessage' })
  }
  if (event.data.function === 'requestSign') {
    setSignStatus(event.data.function)
    chrome.runtime.sendMessage({ type: 'removeTransaction' })
  }
  if (event.data.function === 'requestSignWithCosignatories') {
    setSignStatus(event.data.function)
    setCosignatories(event.data.cosignatories)
    chrome.runtime.sendMessage({ type: 'removeTransaction' })
  }
  if (event.data.function === 'requestSignCosignatureTransaction') {
    setSignStatus(event.data.function)
    chrome.runtime.sendMessage({ type: 'removeTransaction' })
  }
  if (event.data.function === 'requestSSS') {
    isAllowedDoamin()
  }

  // ==========================================

  if (event.data.function === SET_TRANSACTION) {
    chrome.runtime.sendMessage({
      type: SET_TRANSACTION,
      transaction: event.data.tx,
    })
    chrome.runtime.sendMessage({ type: OPEN_POPUP })
  }
  if (event.data.function === REQUEST_SIGN) {
    setSignStatus(event.data.function)
    chrome.runtime.sendMessage({ type: REMOVE_DATA })
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
  if (message.type === 'SIGNED_MESSAGE') {
    window.postMessage(
      {
        type: 'SIGNED_MESSAGE',
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
