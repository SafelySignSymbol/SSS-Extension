import {
  getActiveAccount,
  setCosignatories,
  setSignStatus,
  setTransaction,
} from '../_general/lib/Storage'

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
    setTimeout(() => {
      window.postMessage(
        {
          type: 'INJECT_SSS',
          publicKey: activeAccount.publicKey,
        },
        window.opener
      )
    }, 50)
  })
}

const isAllowedDoamin = () => {
  chrome.runtime.sendMessage(
    {
      type: 'isAllowDoamin',
      domain: document.URL.split('://')[1].split('/')[0],
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

window.addEventListener('message', (event) => {
  if (event.data.function === 'setTransaction') {
    setTransaction(event.data.tx)
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
  if (event.data.function === 'requestSSS') {
    isAllowedDoamin()
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SIGNED_TRANSACTION') {
    window.postMessage(
      {
        type: 'SIGNED_TRANSACTION',
        signedTx: message.signedTx,
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
