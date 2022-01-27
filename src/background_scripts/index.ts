export {}
console.log('background')

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()
})
