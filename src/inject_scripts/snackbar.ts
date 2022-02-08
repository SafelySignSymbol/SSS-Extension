export const showSnackbar = (text: string) => {
  const snackbar = document.getElementById('SSS_snackbar')
  snackbar.innerText = text
  snackbar.classList.add('show_SSS_snackbar')

  setTimeout(() => {
    snackbar.classList.remove('show_SSS_snackbar')
  }, 3000)
}
