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
    // console.log('remove tx')

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

  if (message.type === 'requestSSS') {
    getAllowList().then((list) => {
      // console.log('list', list)
    })
    return true
  }

  if (message.type === 'isAllowDoamin') {
    // console.log('domain', message.domain)
    // console.log('sender', sender)
    isAllowDomain(message.domain).then((isAllow) => {
      // console.log('isAllow', isAllow)
      sendResponse({ status: isAllow })
    })
    return true
  }
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // console.log('info', info)
  // console.log('tab', tab)
  const domain = info.pageUrl.split('://')[1].split('/')[0]
  addAllowList(domain)
})
