<template>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Consola</th>
                <th>Año</th>
                <th>Registro</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(console, index) in consoles" :key="console.id">
                <td>{{index+1}}</td>
                <td>{{console.name}}</td>
                <td>{{console.year}}</td>
                <td>
                    <strong v-if="console.user_registered">
                        {{console.user_registered.name}}
                    </strong>
                </td>
                <td>{{console.created_at | dateFormat}}</td>
                <td>{{console.updated_at | dateFormat}}</td>
                <td width="10%">
                    <button class="btn btn-warning m-1" @click="loadFieldEdit(console)">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger m-1" @click="deleteConsole(console.id)">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
    props:['consoles'],
    data() {
        return {

        }
    },
    methods: {
        deleteConsole(userId){
            Swal.fire({
                title: 'Estas Seguro?',
                text: "¡Se dara de baja la consola!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                    .delete(`/admin/consoles/${userId}`)
                    .then(response => {
                        if(response.data.message != 'success'){
                            // Toast.fire({
                            //     icon: 'error',
                            //     title: 'Error al dar de baja'
                            // });
                            return;
                        }
                        Swal.fire({
                            title: 'Consola!',
                            html:'<strong>Consola dado de baja correctamente</strong>',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        this.$emit('loadConsoles');
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