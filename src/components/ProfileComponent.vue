<template>
  <div class="w-screen h-screen bg-gray-200/10 flex justify-center items-center">
    <div class="bg-white rounded-lg relative w-[40%] h-[60%] shadow-xl">
      <div
        class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-28 overflow-hidden"
      >
        <input type="file" class="hidden" @change="change" ref="file" />
        <img :src="`/avatar/${avatarName}`" alt="" class="aspect-square object-cover relative" />
        <button
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80"
          @click="upload"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </button>
      </div>
      <div class="mt-16">
        <span class="flex font-semibold text-xl justify-center">KhaiPN2</span>
      </div>
      <div class="bg-blue-100 my-5 mx-8 flex rounded-lg justify-center items-center px-4 py-2 line-clamp-2">
        Hi, nice to meet you all. I would like to introduce myself. My name is Huynh Ngoc Phuong,
        and you can call me Mia or Phương for short.
      </div>
      <div class="grid grid-cols-2 gap-3 mx-8">
        <div class="bg-blue-100 px-4 py-2 rounded-lg flex items-center justify-center font-bold">88 idea</div>
        <div class="bg-blue-100 px-4 py-2 rounded-lg flex items-center justify-center font-bold">1k8 votes</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// import AWSS3UploadAshClient from 'aws-s3-upload-ash'

const file = ref()
// const fileSelected = ref()
// const config = {
//   bucketName: 'happyboard-bucket',
//   dirName: 'media' /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */,
//   region: 'ap-southeast-1',
//   accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
//   secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
//   s3Url: 'https://happyboard-bucket.s3.ap-southeast-1.amazonaws.com/images/avatar'
// }
const avatarName = ref('default-avatar.jpg')
const change = (e) => {
  // fileSelected.value = e.target.files[0]
  console.log(e.target.files[0])
  avatarName.value = e.target.files[0].name
}
const upload = () => {
  file.value.click()
}
// const handleSendFile = () => {
//   console.log('send file', this.fileSelected)
//   let S3CustomClient = new AWSS3UploadAshClient(config)
//   S3CustomClient.uploadFile(
//     fileSelected.value,
//     fileSelected.value.type,
//     undefined,
//     fileSelected.value.name,
//     'public-read'
//   )
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err))
// }
</script>
<style scoped></style>
