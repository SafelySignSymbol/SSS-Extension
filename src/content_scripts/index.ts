import {
  removeTransaction,
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

const injectStylefile = function (file, node) {
  const th = document.getElementsByTagName(node)[0]
  const s = document.createElement('link')
  s.setAttribute('rel', 'stylesheet')
  s.setAttribute('type', 'text/css')
  s.setAttribute('href', chrome.runtime.getURL(file))
  return th.appendChild(s)
}

injectScript('inject_script.js', 'body')
injectStylefile('snackbar.css', 'body')

window.addEventListener('message', (event) => {
  if (event.data.function === 'setTransaction') {
    setTransaction(event.data.tx)
  }
  if (event.data.function === 'removeTransaction') {
    removeTransaction()
    setSignStatus(false)
  }
  if (event.data.function === 'requestSign') {
    setSignStatus(true)
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('content', message)
  if (message.type === 'SIGNED_TRANSACTION') {
    window.postMessage(
      {
        type: 'SIGNED_TRANSACTION',
        signedTx: message.signedTx,
      },
      '*'
    )
  }
  // if (message.type === 'SIGN_HARDWARE') {
  //   window.postMessage({
  //     type: 'SIGN_HARDWARE',
  //     tx: message.tx,
  //   }, '*')
  // }
})
