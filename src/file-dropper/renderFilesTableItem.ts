import type { IFileItemInfo } from '../types'

export function renderFilesTableItem(info: IFileItemInfo) {
  const tr = document.createElement('tr')
  const tdName = `<td>${info.fileName}</td>`
  const tdBtn = `<td><span class="close__btn" data-delete="${info.fileName}">&#10006</span></td>`
  tr.innerHTML = `<tr>${tdName}${tdBtn}</tr>`

  return tr
}
