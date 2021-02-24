export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomIntImp
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomIntImp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var diff = max - min +1;
    var randNum = Math.floor(Math.random() * diff) + min;
    return randNum;
  }