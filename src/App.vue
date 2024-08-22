<script setup>
import { RouterView } from 'vue-router'

// const route = useRoute()
const initializeGA = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-5FZMKCHBXF";
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5FZMKCHBXF');
  };
};

initializeGA();

</script>

<template>
  <router-view></router-view>
</template>
