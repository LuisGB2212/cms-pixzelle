<template>
    <div class="row justify-content-center">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex">
                    <h4 class="col">Consolas registradas</h4>
                    <div align="right" class="col-lg-4">
                        <button align="right" class="btn btn-success" data-bs-target="#addConsoleModal" data-bs-toggle="modal">Agregar consola</button>
                    </div>
                </div>
                <div class="card-body">
                    <TableConsoles @loadFieldEdit="loadFieldEdit" @loadConsoles="getConsoles" :consoles="consoles"/>
                </div>
            </div>
        </div> 
        <AddConsoles ref="addConsoleModal" @loadConsoles="getConsoles"/>
    </div>
</template>
<script>
import axios from "axios";
import TableConsoles from "./TableConsoles";
import AddConsoles from "./AddConsoles";
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            consoles:[],
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
        TableConsoles,
        AddConsoles
    },
    created() {
        this.getConsoles();
    },
    methods: {
        getConsoles(){
            axios
            .get(`/admin/consoles?page=${this.paginates.current_page}`)
            .then(response => {
                this.consoles = response.data.data;
                this.paginates = response.data.pagination;
            })
            .catch((e) => {
                this.$store.commit("setErrors", e);
            });
        },
        loadFieldEdit(data){
            this.$refs.addConsoleModal.loadFieldUser(data);
            var myModal = new Modal(document.getElementById('addConsoleModal'));
            myModal.show();
        }
    },
}
</script>