<template>
  <div id="app">
    <Navbar />
    <router-view class="position-adjustment" />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
.position-adjustment {
  margin-top: 5rem;
}
</style>
