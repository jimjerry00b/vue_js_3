<template>


<main>
      <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h4>Edit User</h4>
                </div>
                <form @submit.prevent="updateUser">
                    <div class="card-body">
                        <div class="mb-3 group-name">
                            <label for="">Name</label>
                            <input type="text" name="name" v-model="model.user.name" class="form-control"/>
                            <div class="invalid-feedback"></div>
                        </div>

                        <div class="mb-3 group-email">
                            <label for="">Email</label>
                            <input type="text" name="email" v-model="model.user.email" class="form-control"/>
                            <div class="invalid-feedback"></div>
                        </div>

                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
      </div>
    </main>

</template>

<style>
    .invalid-feedback{
        display: block!important;
    }
</style>


<script>

import axios from 'axios';

    export default {
        name: 'users',
        data(){
            return {
                userId: '',
                model: {
                    user: {
                        name: '',
                        email: '',
                    }
                }
            }
        },

        mounted() {
            this.userId = this.$route.params.id;
            this.getUserData(this.$route.params.id);
        },

        methods: {
            getUserData(){
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    return; // Exit if no token
                }
                
                const url = this.$api_base_url+`user/edit/${this.userId}`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                axios.get(url, { headers }).then((res)=>{
                    this.model.user = res.data.data
                }).catch((e)=>{
                    this.errors =  e.response.data.errors;
                });               

            },

            updateUser() {

                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    return; // Exit if no token
                }

                const url = `http://localhost:8000/api/user/update/${this.userId}`;
                const body = {
                    name: this.model.user.name,
                    email: this.model.user.email,
                };
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                axios.post(url, body, { headers }).then((res)=>{
                    this.$router.push('/users');
                }).catch((e)=>{
                    
                    
                    this.errors =  e.response.data.errors;

                    for(let i in e.response.data.errors){  

                        document.querySelector('.group-'+i+' .invalid-feedback').innerText = e.response.data.errors[i];
                        const searchInput = document.querySelector('.group-'+i+' input');
                        searchInput.classList.add('border-danger');

                    }
                            
                });

            },
        },
    }

</script>