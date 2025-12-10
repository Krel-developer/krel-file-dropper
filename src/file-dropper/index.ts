// Два варианта использования krelToast (интерфейс для выведения сообщений),
// в первом случае будет красивый уведомления, но при этом размер конечного файла будет больше на 3 кб,
// во втором случае сообщения будут выводиться в консоль

//.................................................................//

import { krelToast } from '../libs/krel-toast/krel-toast'
import '../libs/krel-toast/krel-toast.sass'
import { KrelPreloader } from '../prelaoder'

//.................................................................//

// const krelToast = {
//   toast: (m: string) => console.log(m),
//   error: (m: string) => console.error(m),
//   success: (m: string) => console.log(m),
// }

//.................................................................//

import type { IFileItem, IFileItemInfo } from '../types'
import { renderFilesTableItem } from './renderFilesTableItem'

export function fileDropperInit(
  BASE_URL: string,
  API_URL: string,
  TOKEN: string
) {
  const dropArea = document.getElementById('app')

  const $answer = document.querySelector('.answer')

  const dropEventList = ['dragenter', 'dragover', 'dragleave', 'drop']

  const preloader = new KrelPreloader()

  let tableItems: IFileItem[] = []

  dropEventList.forEach((eventName) => {
    if (dropArea) {
      dropArea.addEventListener(eventName, preventDefaults, false)

      if (eventName === 'drop') {
        dropArea.addEventListener('drop', handleDrop, false)
      }
    }
  })
  // dropArea.addEventListener('mouseover', (e) => {
  //   console.log('Hover: ', e)
  // })

  const fileInput = document.getElementById('fileInput')
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        addFilesToList(target.files)
      }
    })
  }

  const table = document.getElementById('files__list')
  if (table) {
    table.addEventListener('click', (e) => {
      const target = e.target as HTMLElement

      if (target.classList.contains('close__btn')) {
        const itemNameToDelete = target.dataset.delete

        tableItems = tableItems.filter((item) => {
          if (item.info.fileName === itemNameToDelete && item.node != null) {
            item.node.remove()
          }
          return itemNameToDelete !== item.info.fileName
        })
      }
    })
  }
  const btnSend = document.getElementById('btn__send')
  if (btnSend) {
    btnSend.addEventListener('click', async () => {
      if (tableItems.length) {
        const sendData = tableItems.map((item) => item.info)
        console.log(sendData)
        await sendFile(sendData)
      } else {
        krelToast.error('Файлы не выбраны')
      }
    })
  }

  function preventDefaults(e: Event) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: DragEvent) {
    const dt = e.dataTransfer
    if (dt) {
      const files = dt.files
      addFilesToList(files)
    }
  }

  function addFilesToList(files: FileList) {
    // Здесь вы можете обрабатывать выбранные файлы

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      let isExistOnTable = false

      tableItems.forEach((el) => {
        if (el.info.fileName === file.name) {
          isExistOnTable = true
        }
      })

      if (!isExistOnTable && table) {
        const fileItem: IFileItem = {
          info: {
            fileName: file.name,
            data: '',
          },
        }
        const reader = new FileReader()
        reader.onload = () => {
          fileItem.info.data = reader.result

          const node = renderFilesTableItem(fileItem.info)
          fileItem.node = node
          table.appendChild(node)

          tableItems.push(fileItem)
        }
        reader.readAsDataURL(file)
      } else {
        krelToast.error(
          `Файл "${file.name}" уже существует в таблице на загрузку`
        )
      }
    }
  }

  async function sendFile(data: IFileItemInfo[]) {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (TOKEN) {
        headers['Authorization'] = `bearer ${TOKEN}`
      }

      const url = `${BASE_URL}/${API_URL}`
      console.log('url', url)
      preloader.start()

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
      console.log(response)
      if (response.status === 200) {
        krelToast.success('Файлы успешно переданы')

        const answerData = await response.json()
        if ($answer) {
          $answer.textContent = JSON.stringify(answerData, null, 2)
        }
      } else {
        krelToast.error(`Сервер ответил с ошибкой: ${response.status}`)

        if ($answer) {
          $answer.textContent = 'ошибка'
        }
      }
    } catch (error: unknown) {
      if (error) {
        krelToast.error(`${error}`)
        console.log(error)
      }
    } finally {
      preloader.stop()
    }
  }
}
