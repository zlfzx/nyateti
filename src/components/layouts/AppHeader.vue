<template>
    <div class="header">
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand to="/">
            <img src="@/assets/img/icon.svg" class="icon d-inline-block align-top" alt="">
            Nyateti
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-item class="active" to="/login">Login</b-nav-item>
                <b-nav-item class="active" to="/notes">Notes</b-nav-item> -->
                <b-nav-item to="/profil"><b-icon-people-circle></b-icon-people-circle> Profil</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header{
    padding-top: 50px;
}
.icon{
    width: 30px;
}
</style>
