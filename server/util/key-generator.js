export default (text) => {
  return text.replace(/[~!@#$%^&*()+`\\<>?/'":;\[\]{}]/g, '').replace(/\s/g, '-')  
}
