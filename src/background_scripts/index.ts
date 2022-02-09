import {
  getTransaction,
  initialize,
  removeTransaction,
} from '../_general/lib/Storage'

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()

  initialize()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'removeTransaction') {
    console.log('remove tx')

    setTimeout(() => {
      getTransaction().then((tx) => {
        console.log('tx', tx)
        if (tx !== null) {
          removeTransaction()
        }
        sendResponse({ status: 200 })
      })
    }, 60 * 1000)
    return true
  }
})
