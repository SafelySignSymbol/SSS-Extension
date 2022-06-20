import { setPopup } from './../_general/lib/Storage/Popup'
export const openPopup = () => {
  setTimeout(() => {
    chrome.windows
      .create({
        url: '/popup.html',
        type: 'popup',
        width: 816, // 800
        height: 639, // 600
      })
      .then((popup) => {
        setPopup(popup.id)
      })
  }, 100)
}
