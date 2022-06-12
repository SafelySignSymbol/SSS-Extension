import { setPopup } from './../_general/lib/Storage/Popup'
export const openPopup = () => {
  setTimeout(() => {
    chrome.windows
      .create({
        url: '/popup.html',
        type: 'popup',
        width: 814, // 800
        height: 637, // 600
      })
      .then((popup) => {
        setPopup(popup.id)
      })
  }, 100)
}
