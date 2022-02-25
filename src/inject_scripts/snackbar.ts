export const showSnackbar = (text: string) => {
  const snackbar = document.getElementById('SSS_snackbar')
  snackbar.innerText = text
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
