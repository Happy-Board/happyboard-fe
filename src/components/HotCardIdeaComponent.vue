<template>
  <div class="px-2 py-1 mx-2 mb-5 border rounded-lg shadow-md shadow-gray-400">
    <div class="title ms-1 cursor-grab active:cursor-grabbing ">
      <div
        @click="viewDetailIdea(props.id)"
        class="ms-1 font-bold text-xl text-blue-900 hover:text-blue-900 hover:underline cursor-pointer w-fit line-clamp-1 text-left"
        v-html="`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, veritatis eius? Voluptatem
    dignissimos dicta vero reprehenderit, dolorem explicabo, quam minus, corporis tenetur similique
    rem nulla dolores expedita minima sit soluta!`"
      ></div>
    </div>
    <div class="content mt-2 ms-1">
      <!-- <div class="content mt-2 mb-2 ms-1 ql-toolbar ql-snow border-0 pb-2 border-b line-clamp-3">
          <div
            class="ql-editor line-clamp-3 text-sm"
            data-gram="false"
            contenteditable="false"
            readonly="true"
            v-html="props.description"
          ></div>
        </div> -->
      <div class="content mt-2 mb-1 ms-1 border-0 line-clamp-2  cursor-grab active:cursor-grabbing">
        <div
          class="line-clamp-2 text-sm text-left"
          data-gram="false"
          contenteditable="false"
          readonly="true"
          v-html="`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, veritatis eius? Voluptatem
    dignissimos dicta vero reprehenderit, dolorem explicabo, quam minus, corporis tenetur similique
    rem nulla dolores expedita minima sit soluta!`"
        ></div>
      </div>
    </div>
    <div class="flex flex-row justify-start items-center text-[12px] pt-1">
        <img
          src="../assets/default-avatar.jpg"
          alt="avatar"
          class="w-[6%] aspect-square rounded-full cursor-pointer"
        />
        <span class="ms-2 me-6 font-semibold cursor-pointer">{{ "props.author" }}</span>

        <div class="flex ">
          <i :class="'fa-icons' + ' fa-solid   text-gray-700 fa-sm'"></i>
        </div>
        
      </div>
  </div>
</template>
<script setup>

</script>
<style scoped>
.ql-toolbar {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ql-editor {
  padding: 0 !important;
}
</style>
