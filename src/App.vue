<script setup>
import { RouterView } from 'vue-router'


const initializeGA = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-4P7TBE1K7V";
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-4P7TBE1K7V');
  };
};

initializeGA();

</script>

<template>
  <router-view></router-view>
</template>
