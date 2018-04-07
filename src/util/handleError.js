export const handleError = (err) => {
  console.error(err.response.data)
  window.M.toast({html: err.response.data})
}