// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyCgp3RRtLv2-g0AtblA5OIPhWvA2PSH8ZE',
        authDomain: 'personalpage-db.firebaseapp.com',
        databaseURL: 'https://personalpage-db.firebaseio.com',
        projectId: 'personalpage-db',
        storageBucket: '',
        messagingSenderId: '335372047982'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
