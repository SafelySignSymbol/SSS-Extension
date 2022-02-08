import { initialize } from '../_general/lib/Storage'

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()

  initialize()
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {})
