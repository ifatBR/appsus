import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
export const keepService = {
    getNotes,
    saveNote,
    deleteNote,
    setNoteType,
    getNoteById,
    updateNote,
    getEmptyNote,
    getNewTask,
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

function deleteNote(id) {
    return storageService.remove(KEEP_NOTES_KEY, id);
}

function setNoteType(id, noteType) {
    return storageService.get(KEEP_NOTES_KEY, id).then((note) => {
        if (note.type === noteType) return;
        note.type = noteType;
        note.info = _setInfoType(noteType);
        storageService.put(KEEP_NOTES_KEY, note);
        return note;
    });
}

function getNewTask() {
    const emptyTask = { txt: '', doneAt: null, id: utilService.makeId() };
    return Promise.resolve(emptyTask);
}

function getEmptyNote(noteType = 'noteTxt', bgColor) {
    console.log('noteType service:', noteType)
    const info = _setInfoType(noteType);
    return _createNewNote(noteType, { title: '', info, bgColor }).then((note) => note)
}

function _setInfoType(noteType) {
    if (noteType === 'noteTxt') return { txt: '' };
    if (noteType === 'noteImg') return { url: '' };
    if (noteType === 'noteTodo') return { todos: [{ txt: '', doneAt: null, id: utilService.makeId() }] };
}

function _createNewNote(noteType, { title, info, bgColor }) {
    const note = {
        type: noteType,
        id: utilService.makeId(),
        title,
        isPinned: false,
        label: '', // Maybe- or DELETE
        info: info,
        style: {
            bgColor,
        },
    };

    return Promise.resolve(note);
}

function _createKeepNotes() {
    return [
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'Blender I want-kenwood mx457',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                url: '../../../imgs/keep/blender.jpg',
            },
            style: {
                bgColor: '#fee7df',
                // bgColor: '#BFC0D4',
            },
   
        },
        {
            type: 'noteTodo',
            id: utilService.makeId(),
            title: 'Par-ty!',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                todos: [
                    { txt: 'buy flowers', doneAt: null, id: utilService.makeId() },
                    { txt: 'bake cake', doneAt: null, id: utilService.makeId() },
                    { txt: 'clean floor', doneAt: null, id: utilService.makeId() },
                    { txt: 'call Debora about lights', doneAt: null, id: utilService.makeId() },
                    { txt: 'pink hearts napkins', doneAt: null, id: utilService.makeId() },
                ],
            },
            style: {
                bgColor: '#6ebfb9',
                // bgColor: '#CBA2BB',

            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'Affirmations',
            isPinned: true,
            label: '', // Maybe- or DELETE
            info: {
                txt:'I should remember that I can do whatever I want, Im a capable strong woman',
            },
            style: {
                bgColor: '#bee1e5',
                // bgColor: '#C1B2CF',
            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'Ask martin',
            isPinned: false,
            label: '', 
            info: {
                txt: 'About the amazing fruits he brought yesterday to the meeting',
            },
            style: {
                // bgColor: '#CDE6E7',
                bgColor: '#f2c643',
            },
        },
        {
            type: 'noteImg',
            id: utilService.makeId(),
            title: 'Amazing cake!',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                url: '../../../imgs/keep/cake.jpg',
            },
            style: {
                // bgColor: '#BFC0D4',
                bgColor: '#ebeae6',
            },
        },
        {
            type: 'noteTxt',
            id: utilService.makeId(),
            title: 'How to set up our tent',
            isPinned: false,
            label: '', // Maybe- or DELETE
            info: {
                txt: `Lay a tarp down before putting up your tent. When setting up your tent, it's important to put a barrier in between the ground and the bottom of your tent to protect it from gathering moisture. A good-quality plastic or vinyl tarp should accompany any tent.[1]
                Fold the tarp into the relative shape of the tent, but slightly smaller. You don't want any part of the tarp to hang out beyond the edge of the tent, otherwise it'll collect water underneath in case it rains. Fold up longer edges and tuck them under the tent.`,
            },
            style: {
                bgColor: '#bee1e5',
                bgColor: '#C6D7DD',
            },
        },
    ];
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

