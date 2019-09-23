<template>
  <div id="app">
    <Navbar class="mb-3" />
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
