import { fileDropperInit } from './file-dropper'
import './style.sass'

document.addEventListener('DOMContentLoaded', () => {
  let BASE_URL: string, API_URL: string, TOKEN: string

  const html = document.querySelector('html')

  if (html && html.dataset.baseurl && html.dataset.apiurl) {
    BASE_URL = html.dataset.baseurl
    API_URL = html.dataset.apiurl
    TOKEN = html.dataset.baseurl
  } else {
    console.log(
      'Вы не указали базовую ссылку и ссылку апи в атрибутах тега <html></html>'
    )

    BASE_URL = 'http://example.com'
    API_URL = 'api/test'
    TOKEN = '' // оставить пустым если не нужна авторизация
  }

  fileDropperInit(BASE_URL, API_URL, TOKEN)
})
