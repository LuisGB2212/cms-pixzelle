<template>
    <div class="row justify-content-center">
        <div class="col-lg-6">
            Pagina no encontrada <br>
            <button class="btn btn-danger" @click="$route.go(-1)">
                Regresar a la página anterior.
            </button>
        </div>
    </div>
</template>