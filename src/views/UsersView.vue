<template>


  <main class="mt-3">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4 class="float-start">Users</h4>
          <RouterLink to="/user/create" class="btn btn-primary float-end">
            Add User
          </RouterLink>
        </div>



        <div class="card-body">
          <table class="table table-border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>

            

            <tbody v-if="this.users.length">
                        <tr v-for="(users, index) in this.users" :key="index">
                            <td>{{ users.id }}</td>
                            <td>{{ users.name }}</td>
                            <td>{{ users.email }}</td>
                            <td>
                                <RouterLink class="btn btn-success btn-sm float-end mx-1" :to="{ path: '/user/edit/'+users.id }">Edit</RouterLink>
                                <button type="button" @click="deleteUser(users.id)" class="btn btn-danger btn-sm float-end mx-1">Delete</button>
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <td colspan="4" class="text-center">No record found</td>
                        </tr>
                    </tbody>


          </table>
        </div>
      </div>
    </div>
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
        mounted(){
            this.getUsers();
        },

        methods: {
            getUsers() {

                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    return; // Exit if no token
                }
                axios.get(this.$api_base_url+'user/get-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    },
                })
                .then(res => {
                    this.users = res.data.data.data;
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
            
            },

            deleteUser(userId){

                if(confirm("Are you sure to delete this user?")){
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No token found");
                        return; // Exit if no token
                    }

                    const url = `http://localhost:8000/api/user/delete/${userId}`;
                    
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    };

                    try {
                        const response = axios.delete(url, { headers });
                        this.getUsers();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            }
        },
    }

</script>