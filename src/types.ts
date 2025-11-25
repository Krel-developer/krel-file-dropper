export interface IFileItemInfo {
  fileName: string
  data: string | null | ArrayBuffer
}
export interface IFileItem {
  info: IFileItemInfo
  node?: HTMLElement
}
