<template>
    <main>
      <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h4>Add User</h4>
                </div>
                <form class="needs-validation" @submit.prevent="saveUser">
                    <div class="card-body">
                        <div class="mb-3 group-name">
                            <label for="">Name</label>
                            <input type="text" name="name" v-model="user.name" class="form-control"/>
                            <div class="invalid-feedback"></div>
                        </div>

                        <div class="mb-3 group-email">
                            <label for="">Email</label>
                            <input type="text" name="email" v-model="user.email" class="form-control"/>
                            <div class="invalid-feedback"></div>
                        </div>

                        <div class="mb-3 group-password">
                            <label for="">Password</label>
                            <input type="password" name="password" v-model="user.password" class="form-control"/>
                            <div class="invalid-feedback"></div>
                        </div>

                        <div class="mb-3">
                            <label for="">Confirm Password</label>
                            <input type="password" name="password_confirmed" v-model="user.password_confirmation" class="form-control"/>
                        </div>

                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Save</button>
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
    name : 'userCreate',
    data(){
        return {
            errors: null,
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                }
        }
    },
    

    methods: {
        saveUser() {

            const activeElements = document.querySelectorAll('form .border-danger');

            activeElements.forEach((element) => {
                element.classList.remove('border-danger');
            });

            const elements = document.getElementsByClassName('invalid-feedback');
            for (let i = 0; i < elements.length; i++) {
                elements[i].textContent = '';
            }


            this.error = {};
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("No token found");
                return;
            }
            
            const url = this.$api_base_url+"user/store";

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            axios.post(url, this.user, { headers }).then((res)=>{
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