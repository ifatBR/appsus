import keepNavBar from '../cmps/keep-nav-bar.cmp.js';
import keepNotes from './keep-notes.cmp.js';
import keepDeleted from './keep-deleted.cmp.js';
import keepReminder from './keep-reminder.cmp.js';

export default {
    template: `
        <section>
            <keep-nav-bar/>
            <h1>keep app</h1>
            <router-view/>
        </section>
    `,

    components: {
        keepNavBar,
        keepNotes,
        keepDeleted,
        keepReminder,
    },
};
