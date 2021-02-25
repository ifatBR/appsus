import navBar from './nav-bar.cmp.js'

export default{
    template:`
    <header class="main-header flex align-center space-between">  
        <img src="../../imgs/logo.png" class="logo">
        <nav-bar/>
    </header>
    `,
    components:{
        navBar,
    }
}