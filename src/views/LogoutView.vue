<template>
  <main>
      <h1>Logout</h1>   
  </main>
</template>

<script>

import axios from 'axios';

export default {
  name: 'users',
        data(){
            return {
                users: []
            }
        },


        beforeMount() {
            this.logOutUser()
        },
        

        methods: {
        logOutUser() {
            if (!this.$token) {
                console.error("No token found");
                return;
            }
            
            const url = this.$api_base_url+"user/logout";

            const body = {
                token: this.$token,
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.$token}`,
            };

            try {
                const response = axios.post(url, body, { headers });
                localStorage.removeItem('token');
                this.$router.push('/login');
                // router.push({ name: 'login' });
                // window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }


        },
        
    },
}



</script>