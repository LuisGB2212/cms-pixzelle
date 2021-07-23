<template>
    <div class="modal fade" id="addUserModal" data-backdrop="static" aria-modal="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="cleanField()" aria-label="Close"></button>
                </div>
                <form @submit.prevent="loadForm">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="name">Nombre</label>
                                <input type="text" id="name" v-model="name" class="form-control" required placeholder="Juanito">
                            </div>
                            <div class="col-lg-6">
                                <label for="email">Nombre</label>
                                <input type="email" id="email" v-model="email" class="form-control" required placeholder="juanito@gmail.com">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="type_user">Tipo de usuario:</label>
                                <select v-model="type_user" id="type_user" required class="form-control">
                                    <option value="">Seleccione tipo de usario</option>
                                    <option value="admin">Administrador</option>
                                    <option value="user">Usuario</option>
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <label for="password">Contraseña</label>
                                <input v-if="update == 0" type="password" id="password" v-model="password" class="form-control" required placeholder="**********">
                                <input v-else type="password" id="password" v-model="password" class="form-control" placeholder="**********">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-whitesmoke br">
                        <button type="submit" :class="[update == 0 ? 'btn-dark' : 'btn-danger']" class="btn">{{update == 0 ? 'Guardar' : 'Actualizar'}}</button>
                        <button type="button" class="btn btn-secondary" @click="cleanField()" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name:"AddUser",
    data() {
        return {
            update:0,
            name:"",
            email:"",
            password:"",
            type_user:""
        }
    },
    methods: {
        cleanField(){
            this.update = 0;
            this.name = "";
            this.email = "";
            this.password = "";
            this.type_user = "";
        },
        loadForm(){
            if(this.update != 0){
                this.updateUser();
            }else{
                this.saveUser();
            }
        },
        saveUser(){
            axios.post('/admin/users',{
                'name' : this.name,
                'email': this.email,
                'password': this.password,
                'type_user': this.type_user
            })
            .then(response => {
                if(response.data.message != 'success'){
                    Swal.fire({
                        title:'Error al procesar solicitud',
                        html:'No se logro guardar el usuario, intente nuevamente',
                        icon:'error'
                    });

                    return ;
                }

                Swal.fire({
                    title:'Usuario Guardado',
                    html:'Se agrego al usuario con exito',
                    icon:'success'
                });

                this.$emit('loadUsers')
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
        loadFieldUser(data){
            this.update = data.id;
            this.name = data.name;
            this.email = data.email;
            this.type_user = data.type_user;
        },
        updateUser(){
            axios.post(`/admin/users/${this.update}`,{
                'name' : this.name,
                'email': this.email,
                'password': this.password,
                'type_user': this.type_user,
                '_method': 'PUT',
            })
            .then(response => {
                if(response.data.message != 'success'){
                    Swal.fire({
                        title:'Error al procesar solicitud',
                        html:'No se logro actualizar el usuario, intente nuevamente',
                        icon:'info'
                    });

                    return ;
                }

                Swal.fire({
                    title:'Usuario Actualizado',
                    html:'Se actualizo al usuario con exito',
                    icon:'success'
                });

                this.$emit('loadUsers');
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
    },
}
</script>