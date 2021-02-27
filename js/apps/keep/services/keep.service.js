import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
export const keepService = {
    getNotes,
    saveNote,
    deleteNotePermanently,
    setNoteType,
    getNoteById,
    updateNote,
    getEmptyNote,
    getNewTask,
    markNoteDeleted,
    restoreNote,
    toggleNotePin,
    getNoteAsQuery,
    createNoteByQuery
};

const KEEP_NOTES_KEY = 'keepNotes';

function getNotes() {
    return storageService.query(KEEP_NOTES_KEY).then((keepNotes) => {
        if (!keepNotes.length) {
            keepNotes = _createKeepNotes();
            _save(KEEP_NOTES_KEY, keepNotes);
            return keepNotes;
        }
        return keepNotes;
    });
}

function getNoteById(id) {
    return storageService
        .get(KEEP_NOTES_KEY, id)
        .then((note) => note)
        .catch((err) => null);
}

function saveNote(note) {
    return getNoteById(note.id).then((isgotNote) => {
        if(isgotNote) return updateNote(note);
        return storageService.post(KEEP_NOTES_KEY, note);
    })
}

function updateNote(note) {
        return storageService.put(KEEP_NOTES_KEY, note);
}

function toggleNotePin(id){
    return getNoteById(id)
    .then(note => {
        note.isPinned = !note.isPinned;
        return storageService.put(KEEP_NOTES_KEY, note);
    })
}

function markNoteDeleted(id) {
    return getNoteById(id)
    .then(note => {
        note.isDeleted = true
        note.isPinned = false
        return storageService.put(KEEP_NOTES_KEY, note);
    })
    
}

function restoreNote(id){
    return getNoteById(id)
    .then(note => {
        note.isDeleted = false
        return storageService.put(KEEP_NOTES_KEY, note);
    })
}

function deleteNotePermanently(id){
    return getNoteById(id)
    .then(note => {
    return storageService.remove(KEEP_NOTES_KEY, id);
    })
}


function setNoteType(id, noteType, bgColor) {
    return storageService.get(KEEP_NOTES_KEY, id).then((note) => {
        if (note.type === noteType) return;
        note.type = noteType;
        note.style.bgColor = bgColor;
        note.info = _setInfoType(noteType);
        return note;
    });
}

function getNewTask() {
    const emptyTask = { txt: '', doneAt: null, id: utilService.makeId() };
    return Promise.resolve(emptyTask);
}

function getEmptyNote(noteType = 'noteTxt', bgColor='#fcfcfc') {
    const info = _setInfoType(noteType);
    return _createNewNote(noteType, info, bgColor ).then((note) => note)
}

function getNoteAsQuery(id){
    return getNoteById(id)
    .then(note => {
        const query = {title:note.title}
        if(note.type === 'noteTxt'){
             query['txt'] = note.info.txt;
        } else if(note.type === 'noteTodo'){
            query['txt'] = note.info.todos.map(({txt}) =>
            {
              return  '-'+txt
            }).join('/n')
        } else if(note.type === 'noteImg'){
            return;
            //query['url'] = note.info.url;
        }

        return query;
    })
}

function createNoteByQuery(query){
    return getEmptyNote()
    .then(note =>{ 
        if(query.title) note.title =query.title
        if(query.txt) note.info.txt = query.txt
        return saveNote(note)       
    })
}

function _setInfoType(noteType) {
    if (noteType === 'noteTxt') return { txt: '' };
    if (noteType === 'noteImg') return { url: '' };
    if (noteType === 'noteTodo') return { todos: [{ txt: '', doneAt: null, id: utilService.makeId() }] };
}

function _createNewNote(noteType, info, bgColor) {
    const note = {
        type: noteType,
        id: utilService.makeId(),
        title : '',
        isPinned: false,
        info: info,
        style: {
            bgColor,
        },
        isDeleted:false,
    };

    return Promise.resolve(note);
}

function _createKeepNotes() {
    return [
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'Blender I want-kenwood mx457',
            isPinned: true,
            info: {
                url: 'imgs/keep/blender.jpg',
            },
            style: {
                bgColor: '#fee7df',

            },
            isDeleted:false,
        },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'Picnic!',
            isPinned: false,
            info: {
                todos: [
                    { txt: 'salad', doneAt: 1614412680207, id: utilService.makeId() },
                    { txt: 'eggs', doneAt: 1614412680207, id: utilService.makeId() },
                    { txt: 'blanket', doneAt: 1614413640632, id: utilService.makeId() },
                ],
            },
            style: {
                bgColor: '#bee1e5',
            },
            isDeleted:true,

        },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'Par-ty!',
            isPinned: false,
            info: {
                todos: [
                    { txt: 'buy flowers', doneAt: null, id: utilService.makeId() },
                    { txt: 'bake cake', doneAt: 1614412680207, id: utilService.makeId() },
                    { txt: 'clean floor', doneAt: 1614413640632, id: utilService.makeId() },
                    { txt: 'call Debora about lights', doneAt: null, id: utilService.makeId() },
                    { txt: 'pink hearts napkins', doneAt: null, id: utilService.makeId() },
                ],
            },
            style: {
                bgColor: '#6ebfb9',
            },
            isDeleted:false,

        },
        
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'Affirmations',
            isPinned: true,
            info: {
                txt:'I should remember that I can do whatever I want, Im a capable strong woman',
            },
            style: {
                bgColor: '#bee1e5',
            },
            isDeleted:false,

        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'party hairdo',
            isPinned: false,
            info: {
                url: 'data:image/jpeg;base64,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',
            },
            style: {
                bgColor: '#fefefe',
            },
            isDeleted:false,

        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'teeth whitening',
            isPinned: false,
            info: {
                url: 'https://cdn.shopify.com/s/files/1/0811/9371/products/teeth-whitening.jpg?v=1434473309',
            },
            style: {
                bgColor: '#fefefe',
            },
            isDeleted:true,

        },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'bleach hair',
            isPinned: false,
            info: {
                todos: [
                    { txt: 'no heat styling ', doneAt: null, id: utilService.makeId() },
                    { txt: ' Condition', doneAt: 1614412680207, id: utilService.makeId() },
                    { txt: 'Coconut Oil ', doneAt: 1614413640632, id: utilService.makeId() },
                    { txt: 'Bleach Powder', doneAt: null, id: utilService.makeId() },
                ],
            },
            style: {
                bgColor: '#6ebfb9',
            },
            isDeleted:true,

        },

  
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'Ask martin',
            isPinned: false,
            info: {
                txt: 'About the amazing fruits he brought yesterday to the meeting',
            },
            style: {
                bgColor: '#f2c643',
            },
            isDeleted:false,

        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'Amazing cake!',
            isPinned: true,
            info: {
                url: 'imgs/keep/cake.jpg',
            },
            style: {
                bgColor: '#ebeae6',
            },
            isDeleted:false,

        },

        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'How to set up our tent',
            isPinned: false,
            info: {
                txt: `Lay a tarp down before putting up your tent. When setting up your tent, it's important to put a barrier in between the ground and the bottom of your tent to protect it from gathering moisture. A good-quality plastic or vinyl tarp should accompany any tent.[1]
                Fold the tarp into the relative shape of the tent, but slightly smaller. You don't want any part of the tarp to hang out beyond the edge of the tent, otherwise it'll collect water underneath in case it rains. Fold up longer edges and tuck them under the tent.`,
            },
            style: {
                bgColor: '#fefefe',
            },
            isDeleted:false,

        }, 
       
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'Show Karen',
            isPinned: false,
            info: {
                url: 'data:image/jpeg;base64,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',
            },
            style: {
                bgColor: '#fee7df',
            },
            isDeleted:false,

        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'talk w boss',
            isPinned: false,
            info: {
                txt: `Hi joe, I think its time I get a raise.\n I know I\'ve been doing a really good job and I think joey is not as good and he got a raise before me`,
            },
            style: {
                bgColor: '#ebeae6',
            },
            isDeleted:false,

        },
     

        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'Songs',
            isPinned: true,
            info: {
                todos: [
                    { txt: 'Bruce, the Rising', doneAt: null, id: utilService.makeId() },
                    { txt: 'Brown tugar- the stones', doneAt: null, id: utilService.makeId() },
                    { txt: 'I will survive', doneAt: null, id: utilService.makeId() },
                    { txt: 'Poissssoooon', doneAt: null, id: utilService.makeId() },
                    { txt: 'Neon like, bjork', doneAt: 1614413680207, id: utilService.makeId() },
                    { txt: 'Angel, the KING', doneAt: null, id: utilService.makeId() },
                    { txt: 'Bad girl, riha', doneAt: null, id: utilService.makeId() },
                    { txt: 'Can\'t remember', doneAt: 1614413680207, id: utilService.makeId() },
                    { txt: 'amazing aerosmith', doneAt: null, id: utilService.makeId() },
                ],
            },
            style: {
                bgColor: '#f2c643',
            },
            isDeleted:false,

        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'restaurants',
            isPinned: true,
            info: {
                txt: `chez loui is the best one for trying snails, and la belle has great steaks`,
            },
            style: {
                bgColor: '#ebeae6',
            },
            isDeleted:false,

        }, 
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'jenny\'s joke',
            isPinned: false,
            info: {
                txt: `Knock! Knock!
                Who’s there?
                Control Freak.
                Con…
                OK, now you say control freak who?`,
            },
            style: {
                bgColor: '#ebeae6',
            },
            isDeleted:true,

        }, 
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'paris',
            isPinned: true,
            info: {
                url: `data:image/jpeg;base64,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`,
            },
            style: {
                bgColor: '#fee7df',
            },
            isDeleted:false,

        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'marketing',
            isPinned: false,
            info: {
                txt: `Promote your organization’s updates to targeted audiences on desktop, mobile, and tablet. Drive awareness and leads in the world's most viewed professional news feed.`,
            },
            style: {
                bgColor: '#fefefe',
            },
            isDeleted:false,

        }, 
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'hair regimn',
            isPinned: false,
            info: {
                txt: `wash 3 times a day, burn with chemical laiden products and bleach as often as possible.`,
            },
            style: {
                bgColor: '#bee1e5',
            },
            isDeleted:false,

        }, 
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'THE dress!!!',
            isPinned: false,
            info: {
                url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDnk-nnYcOP2-EAiezcguiO7YsSTlCYyeEpg&usqp=CAU`,
            },
            style: {
                bgColor: '#fefefe',
            },
            isDeleted:false,

        }, 
    ];
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

