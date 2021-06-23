<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@com/Header.vue";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./assets/helpers/reset.css";
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50 !important;
  background-color: $main_bg;
  font-weight: bold;
}
body,
#app {
  height: 100%;
  background-color: $main_bg;
  margin: 0;
  padding: 0;
}
.nav {
  margin-bottom: 40px;
  padding-left: 10%;
  &__title {
    font-size: 20px;
    color: $mute;
    &:hover {
      color: $second_txt;
      border-bottom: 3px solid;
      padding-bottom: 8px;
    }
    & + .nav__title {
      margin-left: 60px;
    }
  }
}
.status-clicked {
  color: $second_txt;
  border-bottom: 3px solid;
  padding-bottom: 8px;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: none;
}
.content {
  color: white;
  background-color: $main_bg;
  justify-content: center;
  align-items: center;
  .button {
    margin-right: 145px;
  }
  &-btn {
    font-size: 24px;
    font-weight: bold;
    color: $second_txt;
    border: 2px solid $second_txt;
    border-radius: 5px;
    width: 334px;
    height: 85px;
    background-color: transparent;
    display: block;
    &:hover {
      color: $main_bg;
      background-color: $second_txt;
    }
  }
}
.content-btn:first-child {
  margin-bottom: 52px;
}
</style>
