<template>
    <div class="row justify-content-center">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex">
                    <h4 class="col">Usuarios registrados</h4>
                    <div align="right" class="col-lg-4">
                        <button align="right" class="btn btn-success" data-bs-target="#addUserModal" data-bs-toggle="modal">Agregar usuario</button>
                    </div>
                </div>
                <div class="card-body">
                    <TableUsers @loadFieldEdit="loadFieldEdit" @loadUsers="getUsers" :users="users"/>
                </div>
            </div>
        </div> 
        <AddUsers ref="addUserModal" @loadUsers="getUsers"/>      
    </div>
</template>
<script>
import axios from "axios";
import TableUsers from "./TableUsers";
import AddUsers from "./AddUsers";
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            users:[],
            paginates: {
                total: 0,
                per_page: 15,
                from: 0,
                to: 0,
                current_page: 1
            },
        }
    },
    components: {
        TableUsers,
        AddUsers
    },
    created() {
        this.getUsers();
    },
    methods: {
        getUsers(){
            axios
            .get(`/admin/users?page=${this.paginates.current_page}`)
            .then(response => {
                this.users = response.data.data.data;
                this.paginates = response.data.pagination;
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
        loadFieldEdit(data){
            this.$refs.addUserModal.loadFieldUser(data);
            var myModal = new Modal(document.getElementById('addUserModal'));
            myModal.show();
            // $('#addUserModal').modal('show');
        }
    },
}
</script>