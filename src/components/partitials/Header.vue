<template>
    <header class="p-3 bg-dark text-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img  width="250px" src="https://www.pixzelle.mx/assets/img/logo/pixzelle-logo.svg" class="img-fluid" alt="">
                </a>

                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link to="/admin/video-games" class="nav-link px-2 text-white">Video Juegos</router-link></li>
                    <li><router-link to="/admin/companies" class="nav-link px-2 text-white">Empresas</router-link></li>
                    <li><router-link to="/admin/consoles" class="nav-link px-2 text-white">Consolas</router-link></li>
                    <li><router-link to="/admin/users" class="nav-link px-2 text-white">Usuarios</router-link></li>
                </ul>

                <div class="dropdown text-end" v-if="user">
                    <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle text-white" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <strong>
                            {{user.nombre}}
                        </strong>
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
                    </a>
                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
                        <li>{{user.correo}}</li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="javascript:;" @click="logout">Cerrar sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters("auth", ["user"])
    },
    methods: {
        ...mapActions("auth", ["sendLogoutRequest"]),

        logout() {
            this.sendLogoutRequest();
        }
    },
}
</script>