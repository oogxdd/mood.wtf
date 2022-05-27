import { UploadClient } from '@uploadcare/upload-client'

const uploadClient = new UploadClient({ publicKey: '4655e209ca4c19200e9d' })
const toUpload = true
// const toUpload = false

const onProgress = ({ value }) => {
  console.log('uploading: ' + Math.floor(value * 100) + '%')
}

export const uploadImage = (file, callback) => {
  if (toUpload) {
    uploadClient.uploadFile(file, { onProgress }).then(callback)
  }
}
