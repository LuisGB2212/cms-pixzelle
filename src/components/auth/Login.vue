<template>
    <div class="col-lg-12 d-flex justify-content-center mt-5">
        <div class="col-lg-5">
            <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-body">
                    <!-- Icon -->
                    <div class="fadeIn first">
                        <img src="https://www.pixzelle.mx/assets/img/logo/pixzelle-logo.svg" id="icon" alt="User Icon" />
                    </div>

                    <!-- Login Form -->
                    <form class="my-3" @submit.prevent="login">
                        <div class="mb-3">
                            <label for="correo" class="form-label">Correo electrónico</label>
                            <input type="email" v-model="user.correo" required class="form-control rounded-3" id="correo">
                        </div>
                        <div class="mb-3">
                            <label for="contrasenia" class="form-label">Contraseña</label>
                            <input type="password" v-model="user.contrasenia" class="form-control rounded-3" id="contrasenia" required>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-danger btn-lg">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"; 

export default {
    data() {
        return {
            user:{
                correo:"",
                contrasenia:""
            }
        }
    },
    mounted() {
        this.$store.commit("setErrors", {});
    },
    computed: {
        ...mapGetters(["errors"]),
    },
    methods: {
        ...mapActions("auth", ["sendLoginRequest"]),
        login() {
            this.sendLoginRequest(this.user).then(() => {
                if(JSON.stringify(this.$store.getters.errors).length < 3){
                    this.$router.push({ name: "TemplateDashboard" });
                    //window.location.reload();
                }else{
                    //var message = "";
                    // $.each(this.$store.getters.errors, function(key, value) {
                    //     message = value;
                    // });
                    // Toast.fire({
                    //     icon: 'warning',
                    //     title: 'Error: '+message
                    // })
                }
            });
            }
    },
}
</script>