import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
export const keepService = {
    getNotes,
    saveNote,
    deleteNote,
    setNoteType
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

function saveNote(type,note) {
    const {title,txt,bgColor} = note;
    const info = {txt};

    return _createNewNote(type,{title, info, bgColor}).then(newNote =>{
            console.log('new',newNote);
            storageService.post(KEEP_NOTES_KEY, newNote);
        }     
    )
}

function deleteNote(id){
    return storageService.remove(KEEP_NOTES_KEY, id);
}

function setNoteType(id, noteType, imgUrl){
    return storageService.get(KEEP_NOTES_KEY,id)
    .then(note =>{
        if(note.type === noteType) return;
        note.type=noteType
        note.info = _setInfoType(noteType, imgUrl)
        storageService.put(KEEP_NOTES_KEY,note)
        })
}
function _setInfoType(noteType, imgUrl){
    if(noteType === 'noteTxt') return {txt:''};
    if (noteType === 'noteImg') return {url : imgUrl }
    if (noteType === 'noteTodo') return{'todos' :[{ txt: '', doneAt: null }]}
}



function addTodo() {
    return { txt: '', doneAt: null };
}


function _createNewNote(type,{title, info, bgColor}) {
    const note = {
        type,
        id: utilService.makeId(),
        title,
        isPinned: false,
        label: '', // Maybe- or DELETE
        info:info,
        style: {
            bgColor,
        },
    };

    return Promise.resolve(note);
}

function _createKeepNotes() {
    return [
        // {
        //     type: 'noteImg',
        //     id: utilService.makeId(),
        //     title: 'Blender I want',
        //     isPinned: false,
        //     label: '', // Maybe- or DELETE
        //     info: {
        //         url: '../../../imgs/keep/blender.jpg',
        //         imgTitle: 'oster classic',
        //     },
        //     style: {
        //         bgColor: 'blue',
        //     },
        // },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'Par-ty!',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                todos: [
                    { txt: 'buy flowers', doneAt: null },
                    { txt: 'bake cake', doneAt: null },
                    { txt: 'clean floor', doneAt: null },
                ],
            },
            style: {
                bgColor: 'white',
            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'Affirmations',
            isPinned: true,
            label: '', // Maybe- or DELETE
            info: {
                txt: "I should remember that I can do whatever I want, I'm a capable strong woman",
            },
            style: {
                bgColor: 'white',
            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'hey ho',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                txt: 'I like bannanas',
            },
            style: {
                bgColor: 'pink',
            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'blabla',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                txt: 'Hop hop',
            },
            style: {
                bgColor: 'red',
            },
        },
    ];
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}