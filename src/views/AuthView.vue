<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mt-5">
                    <div class="card-body">
                        <h2 class="card-title">Login</h2>
                        <div v-if="errorMessage" class="invalid-feedback">
                            {{ errorMessage }}
                        </div>
                        <form class="row g-3 needs-validation">

                            <div class="card-body">
                                <div class="mb-3 group-email">
                                    <label for="">Email</label>
                                    <input type="email" name="email" v-model="model.user.email" class="form-control" />
                                    <div class="invalid-feedback"></div>
                                </div>

                                <div class="mb-3 group-password">
                                    <label for="">Password</label>
                                    <input type="password" name="password" v-model="model.user.password"
                                        class="form-control" />
                                    <div class="invalid-feedback"></div>
                                </div>

                                <div class="mb-3">
                                    <button type="button" @click="loginUser" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        
        return {
            errorMessage: '',
            model: {
                user: {
                    email: '',
                    password: '',
                }
            },
        }
    },

    methods: {
        loginUser() {
            this.errorMessage = '';
            axios.post(this.$api_base_url + 'user/login', this.model.user)
                .then(res => {

                    localStorage.setItem('token', res.data);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
                    this.$router.push('/users');

                })

                
                .catch((error) => {

                    const elements = document.getElementsByClassName('invalid-feedback');
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].textContent = '';
                    }

                    if (error.response && error.response.data.errors) {
                        for (let i in error.response.data.errors) {
                            document.querySelector('.group-'+i+' .invalid-feedback').innerText = error.response.data.errors[i];
                        }
                    }else{
                        this.errorMessage = error.response?.data?.message;
                    }
                })
        },

    },
}
</script>