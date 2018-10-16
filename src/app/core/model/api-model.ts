export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCgp3RRtLv2-g0AtblA5OIPhWvA2PSH8ZE',
    authDomain: 'personalpage-db.firebaseapp.com',
    databaseURL: 'https://personalpage-db.firebaseio.com',
    projectId: 'personalpage-db',
    storageBucket: '',
    messagingSenderId: '335372047982'
};

export const API = {
    todo: {
        url: 'todo',
        id: (id: string) => {
            return {
                url: `todo/${id}`
            };
        }
    }
};
