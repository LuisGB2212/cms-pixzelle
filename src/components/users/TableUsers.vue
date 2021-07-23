<template>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Rol</th>
                <th>Cantidad de video Juegos</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <td>{{index+1}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.type_user}}</td>
                <td>{{user.rol_id}}</td>
                <td>{{user.user_video_games_count}}</td>
                <td>{{user.created_at | dateFormat}}</td>
                <td>{{user.updated_at | dateFormat}}</td>
                <td>
                    <div v-if="user.deleted_at">
                        <button class="btn btn-dark m-1">
                            Activar
                        </button>
                    </div>
                    <div v-else>
                        <button class="btn btn-info m-1">
                            <i class="fa fa-info"></i>
                        </button>
                        <button class="btn btn-warning m-1" @click="loadFieldEdit(user)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-danger m-1" @click="deleteUser(user.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                    
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
    props:['users'],
    data() {
        return {

        }
    },
    methods: {
        deleteUser(userId){
            Swal.fire({
                title: 'Estas Seguro?',
                text: "¡Se dara de baja al usuario!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                    .delete(`/admin/users/${userId}`)
                    .then(response => {
                        if(response.data.message != 'success'){
                            // Toast.fire({
                            //     icon: 'error',
                            //     title: 'Error al dar de baja'
                            // });
                            return;
                        }
                        Swal.fire({
                            title: 'Usuario!',
                            html:'<strong>Usuario dado de baja correctamente</strong>',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        this.$emit('loadUsers');
                    })
                    .catch((e) => {
                        this.$store.commit("setErrors", e);
                    });
                }
            })
        },
        loadFieldEdit(data){
            this.$emit('loadFieldEdit', data);
        }
    },
}
</script>