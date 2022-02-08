export const showSnackbar = (text: string) => {
  const snackbar = document.getElementById('snackbar')
  snackbar.innerText = text
  snackbar.classList.add('show')

  setTimeout(() => {
    snackbar.classList.remove('show')
  }, 3000)
}
