import mainHeader from './cmps/main-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { myRouter } from './routes.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
        <user-msg />
        <main-header/>
        <router-view />
    </section>
    `,
    components: {
        mainHeader,
        userMsg
    },
};

const app = new Vue(options);
