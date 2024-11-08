<script setup>
import { onMounted } from 'vue';
import axios from 'axios';

function loadData() {

  axios.get('http://localhost/ccpl_wp/wp-json/myapi/v1/data', {
    headers: {
      Accept: 'application/json'
    },
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });

}

onMounted(() => {
  loadData(); // Call the function when the component is mounted
});
</script>

<template>
  <div class="about" >
    
    <div :disabled="isButtonDisabled"><h1>About</h1></div>
  </div>
</template>