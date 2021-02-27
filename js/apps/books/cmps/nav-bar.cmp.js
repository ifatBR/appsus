export default{
    template:`
    <section class="nav-bar">
        <router-link active-class="active-link" to="/" exact>Home</router-link>
        <router-link active-class="active-link" to="/book" exact>Books</router-link>
        <router-link active-class="active-link" to="/about" exact>About</router-link>
    </section>
    `
}