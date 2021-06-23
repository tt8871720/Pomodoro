<template>
  <div class="nav">
    <router-link to="pomo" class="nav__title pomoclicked">Pomodoro</router-link>
    <router-link to="break" class="nav__title breakclicked"
      >Short Break</router-link
    >
  </div>
</template>
<script>
export default {
  name: "Nav"
};
</script>
