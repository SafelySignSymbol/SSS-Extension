import {
  addAllowList,
  getAllowList,
  getTransaction,
  initialize,
  isAllowDomain,
  removeTransaction,
} from '../_general/lib/Storage'

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
      sendResponse({ status: isAllow })
    })
    return true
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const protocol = info.pageUrl.split('://')[0]
  const domain = info.pageUrl.split('://')[1].split('/')[0]
  addAllowList(protocol + '://' + domain)
})
