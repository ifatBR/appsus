import { storageService } from '../../../services/async-storage.service.js';
import {utilService} from '../../../services/util.service.js'
export const keepService = {
    getNotes,
};

const KEEP_NOTES_KEY = 'keepNotes';

function getNotes() {
    return storageService.query(KEEP_NOTES_KEY).then((keepNotes) => {
        if (!keepNotes.length) {
            keepNotes = _createKeepNotes();
            storageService.post(KEEP_NOTES_KEY, keepNotes);
            return keepNotes;
        }
        return keepNotes[0];
    });
}

function _createEmptyNote(type) {
    const note = {
        type,
        id: utilService.makeId(),
        title: '',
        isPinned: false,
        label: '', // Maybe- or DELETE
        info: {},
        style: {
            bgColor: 'white',
        },
    };

    if (type === 'noteImg') {
        note.info['url'] = '';
        note.info['imgTitle'] = '';
    } else if (type === 'noteTxt') {
        note.info['txt'] = '';
    } else if (type === 'noteTodo') {
        note.info['todos'] = [''];
    }

    return note;
}

function addTodo(note) {
    return { txt: '', doneAt: null };
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
        // {
        //     type: 'noteTodo',
        //     id: utilService.makeId(),
        //     title: 'Par-ty!',
        //     isPinned: false,
        //     label: '', // Maybe- or DELETE
        //     info: {
        //         todos: [
        //             { txt: 'buy flowers', doneAt: null },
        //             { txt: 'bake cake', doneAt: null },
        //             { txt: 'clean floor', doneAt: null },
        //         ],
        //     },
        //     style: {
        //         bgColor: 'white',
        //     },
        // },
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
                txt: "I like bannanas",
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
                txt: "Hop hop",
            },
            style: {
                bgColor: 'red',
            },
        },
    ];
}
