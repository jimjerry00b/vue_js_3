<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>

                    <li class="nav-item" v-if="token">
                        <RouterLink class="nav-link" to="/users">Users</RouterLink>
                    </li>

                    <li class="nav-item" v-if="token">
                        <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
                    </li>

                    <li class="nav-item" v-else>
                        <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {

    setup() {
        return {
            token: localStorage.getItem('token')
        }
    }
}

</script>