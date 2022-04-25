import i18next from 'i18next'
import enJson from '../_general/utils/locales/en.json'
import jaJson from '../_general/utils/locales/ja.json'
import krJson from '../_general/utils/locales/kr.json'

const getLang = (lang?: string) => {
  const l = lang === undefined ? window.navigator.language : lang

  if (l.toUpperCase() === 'JA') {
    return 'JA'
  } else if (l.toUpperCase() === 'EN') {
    return 'EN'
  } else if (l.toUpperCase() === 'KR') {
    return 'KR'
  }
}

export const showSnackbar = (text: string) => {
  const snackbar = document.getElementById('SSS_snackbar')
  if (snackbar !== null) {
    snackbar.innerText = i18next.t(text)
    snackbar.classList.add('show_SSS_snackbar')

    setTimeout(() => {
      snackbar.classList.remove('show_SSS_snackbar')
    }, 3000)
    return
  } else {
    createSnackbar()
    const sn = document.getElementById('SSS_snackbar')
    sn.innerText = i18next.t(text)
    sn.classList.add('show_SSS_snackbar')

    setTimeout(() => {
      sn.classList.remove('show_SSS_snackbar')
    }, 3000)
    return
  }
}

export const createSnackbar = (lang?: string) => {
  i18next.init({
    debug: true,
    resources: {
      EN: { translation: enJson },
      JA: { translation: jaJson },
      KR: { translation: krJson },
    },
    lng: getLang(lang),
    fallbackLng: 'JA',
    returnEmptyString: false,
  })
  const sn = document.getElementById('SSS_snackbar')
  if (sn === null) {
    const snackbar = document.createElement('div')
    snackbar.classList.add('SSS_snackbar')
    snackbar.id = 'SSS_snackbar'
    document.body.appendChild(snackbar)
  }
}
