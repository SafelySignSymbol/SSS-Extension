import { initialize } from '../_general/lib/Storage'

console.log('background')

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()

  initialize()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {})
