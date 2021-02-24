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
        }
        return keepNotes;
    });
}

function _createEmptyNote(type) {
    const note = {
        type,
        id: utilService.makeId(),
        headline: '',
        isPinned: false,
        label: '', // Maybe- or DELETE
        info: {},
        style: {
            bgColor: 'white',
        },
    };

    if (type === 'noteImg') {
        note.info['url'] = '';
        note.info['title'] = '';
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
        {
            type: 'noteImg',
            id: utilService.makeId(),
            headline: 'Blender I want',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                url: '../../../imgs/keep/blender.jpg',
                title: 'oster classic',
            },
            style: {
                bgColor: 'blue',
            },
        },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            headline: 'Par-ty!',
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
            headline: 'Affirmations',
            isPinned: true,
            label: '', // Maybe- or DELETE
            info: {
                txt: "I should remember that I can do whatever I want, I'm a capable strong woman",
            },
            style: {
                bgColor: 'white',
            },
        },
    ];
}
