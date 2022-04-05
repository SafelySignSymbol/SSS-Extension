import i18next from 'i18next'
import enJson from '../_general/utils/locales/en.json'
import jaJson from '../_general/utils/locales/ja.json'

const getLang = () => {
  const l = window.navigator.language

  if (l === 'ja') {
    return 'JA'
  } else {
    return 'EN'
  }
}

i18next.init({
  debug: true,
  resources: {
    EN: { translation: enJson },
    JA: { translation: jaJson },
  },
  lng: getLang(),
  fallbackLng: 'JA',
  returnEmptyString: false,
})

export const showSnackbar = (text: string) => {
  const snackbar = document.getElementById('SSS_snackbar')
  snackbar.innerText = i18next.t(text)
  snackbar.classList.add('show_SSS_snackbar')

  setTimeout(() => {
    snackbar.classList.remove('show_SSS_snackbar')
  }, 3000)
}

export const createSnackbar = () => {
  const sn = document.getElementById('SSS_snackbar')
  if (sn === null) {
    const snackbar = document.createElement('div')
    snackbar.classList.add('SSS_snackbar')
    snackbar.id = 'SSS_snackbar'
    document.body.appendChild(snackbar)
  }
}
