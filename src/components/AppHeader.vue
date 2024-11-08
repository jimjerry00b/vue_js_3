<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>

                    <li class="nav-item" v-if="token">
                        <RouterLink class="nav-link" to="/users">Users</RouterLink>
                    </li>

                </ul>
            </div>

            <span class="navbar-text float-end">
                
                </span>

                <button v-if="token" class="btn btn-primary" @click="logout">Logout</button>
                <RouterLink v-else class="btn btn-primary" to="/login">Login</RouterLink>
        </div>
    </nav>
</template>

<script>
import router from '@/router';


export default {
  setup() {
    const token = localStorage.getItem('token');
    const logout = () => {
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    };

    return {
      token,
      logout,
    };
  },
};
</script>
