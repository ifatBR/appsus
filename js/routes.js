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
                component: notes,
            },
            {
                path:'/notes',
                component: notes,
            },
            {
                path:'/reminder',
                component: reminder,
            },
            {
                path:'/deleted',
                component: deleted,
            },
        ]
    },
    {
        path:'/book',
        component: bookApp,
        children:[
            {
                path:'/',
                component: books,
            },
            {
                path:'/books',
                component: books,
            },
            {
                path: '/about',
                component: about,
            },
            {
                path: '/book/addBooks',
                component: bookAdd
            },
            {
                path: '/book/:bookId',
                component: bookDetails,
            },
            {
                path: '/book/:bookId/:bookTitle/review',
                component: reviewAdd,
            },
        ]
    },
]

export const myRouter = new VueRouter({routes});