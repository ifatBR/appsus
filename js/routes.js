// general
import homePage from './pages/home-page.cmp.js'
import about from './pages/about.cmp.js'
// email
import emailApp from './apps/email/pages/email-app.cmp.js'
import emailInbox from './apps/email/pages/email-inbox.cmp.js'
import emailStarred from './apps/email/pages/email-starred.cmp.js'
import emailSent from './apps/email/pages/email-sent.cmp.js'
import emailDraft from './apps/email/pages/email-draft.cmp.js'
import emailDeleted from './apps/email/pages/email-deleted.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
// keep
import keepApp from './apps/keep/pages/keep-app.cmp.js'
import keepNotes from './apps/keep/pages/keep-notes.cmp.js'
import keepDeleted from './apps/keep/pages/keep-deleted.cmp.js'
import keepReminder from './apps/keep/pages/keep-reminder.cmp.js'


const routes = [
    {
        path:'/',
        component: homePage
    },
    {
        path:'/about',
        component: about
    },
    {
        path:'/email',
        component: emailApp,
        children:[
            {
                path:'/',
                component: emailInbox,
            },
            {
                path:'/inbox',
                component: emailInbox,
            },
            {
                path:'/starred',
                component: emailStarred,
            },
            {
                path:'/sent',
                component: emailSent,
            },
            {
                path:'/draft',
                component: emailDraft,
            },
            {
                path:'/deleted',
                component: emailDeleted,
            },
            {
                path:'/?/:emailId',
                component: emailDetails,
            },
        ]
    },
    {
        path:'/keep',
        component: keepApp,
        children:[
            {
                path:'/',
                component: keepNotes,
            },
            {
                path:'/notes',
                component: keepNotes,
            },
            {
                path:'/reminder',
                component: keepReminder,
            },
            {
                path:'/deleted',
                component: keepDeleted,
            },
        ]
    },
    // {
    //     path:'/book',
    //     component: bookApp,
    //     children:[
    //         {
    //             path:'/',
    //             component: books,
    //         },
    //         {
    //             path:'/books',
    //             component: books,
    //         },
    //         {
    //             path: '/about',
    //             component: about,
    //         },
    //         {
    //             path: '/book/addBooks',
    //             component: bookAdd
    //         },
    //         {
    //             path: '/book/:bookId',
    //             component: bookDetails,
    //         },
    //         {
    //             path: '/book/:bookId/:bookTitle/review',
    //             component: reviewAdd,
    //         },
    //     ]
    // },
]

export const myRouter = new VueRouter({routes});