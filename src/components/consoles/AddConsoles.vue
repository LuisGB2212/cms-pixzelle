<template>
    <div class="modal fade" id="addConsoleModal" data-backdrop="static" aria-modal="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Consola</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="cleanField()" aria-label="Close"></button>
                </div>
                <form @submit.prevent="loadForm">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="name">Nombre de consola</label>
                                <input type="text" id="name" v-model="name" class="form-control" required placeholder="Consola">
                            </div>
                            <div class="col-lg-6">
                                <label for="year">Año</label>
                                <input type="number" id="year" v-model="year" class="form-control" required placeholder="2021">
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
            year:"",
        }
    },
    methods: {
        cleanField(){
            this.update = 0;
            this.name = "";
            this.year = "";
        },
        loadForm(){
            if(this.update != 0){
                this.updateUser();
            }else{
                this.saveUser();
            }
        },
        saveUser(){
            axios.post('/admin/consoles',{
                'name' : this.name,
                'year': this.year,
            })
            .then(response => {
                if(response.data.message != 'success'){
                    Swal.fire({
                        title:'Error al procesar solicitud',
                        html:'No se logro guardar el Consola, intente nuevamente',
                        icon:'error'
                    });

                    return ;
                }
                
                Swal.fire({
                    title:'Consola Guardado',
                    html:'Se agrego al Consola con exito',
                    icon:'success'
                });
                this.cleanField();
                this.$emit('loadConsoles')
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
        loadFieldUser(data){
            this.update = data.id;
            this.name = data.name;
            this.year = data.year;
        },
        updateUser(){
            axios.post(`/admin/consoles/${this.update}`,{
                'name' : this.name,
                'year': this.year,
                '_method': 'PUT',
            })
            .then(response => {
                if(response.data.message != 'success'){
                    Swal.fire({
                        title:'Error al procesar solicitud',
                        html:'No se logro actualizar el Consola, intente nuevamente',
                        icon:'info'
                    });

                    return ;
                }
                this.loadFieldUser(response.data.data);
                Swal.fire({
                    title:'Consola Actualizado',
                    html:'Se actualizo al Consola con exito',
                    icon:'success'
                });
                
                this.$emit('loadConsoles');
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
    },
}
</script>