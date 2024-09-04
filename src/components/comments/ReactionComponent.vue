<template>
  <div
    @mouseover="emits('showReactions')"
    @mouseleave="emits('closeReactions')"
    class="reactions-container flex bg-white w-[210px] px-2 rounded-full py-1 absolute top-[20px] left-[-15px] bottom-[-40px] z-50"
  >
    <div class="relative flex">
      <img
        @click="react('like')"
        src="../../assets//icons/png/like.png"
        alt=""
        :class="props.currentReact === 'like' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[-2px] transition hover:scale-150"
      />
      <img
        @click="react('love')"
        src="../../assets//icons/png/love.png"
        :class="props.currentReact === 'love' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[32px] transition hover:scale-150"
        alt=""
      />
      <img
        @click="react('haha')"
        src="../../assets//icons/png/haha.png"
        :class="props.currentReact === 'haha' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[66px] transition hover:scale-150"
        alt=""
      />
      <img
        @click="react('wow')"
        src="../../assets//icons/png/wow.png"
        :class="props.currentReact === 'wow' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[100px] transition hover:scale-150"
        alt=""
      />
      <img
        @click="react('sad')"
        src="../../assets//icons/png/sad.png"
        :class="props.currentReact === 'sad' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[134px] transition hover:scale-150"
        alt=""
      />
      <img
        @click="react('angry')"
        src="../../assets//icons/png/angry.png"
        :class="props.currentReact === 'angry' ? 'bg-[#cce0ff]' : ''"
        class="absolute top-[-1px] left-[168px] transition hover:scale-150"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  currentReact: String,
})

const emits = defineEmits(['reaction', 'cancelReaction', 'showReactions', 'closeReactions'])

const react = (type) => {
    if(props.currentReact === type){
        emits('cancelReaction')
    } else {
        emits('reaction', type)
    }
}
</script>
<style scoped>
.reactions-container img {
  max-width: 40px;
  cursor: pointer;
  padding: 3px;
  border-radius: 50%;
}
</style>
