<template>
    <main>
        <Header />
        <div class="container my-5">
            <router-view></router-view>
        </div>
    </main>
</template>
<script>
import Header from '../partitials/Header';
export default {
    name:"TemplateDashboard",
    data() {
        return {
            
        }
    },
    components:{
        Header,
    }
    
}
</script>