// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production    : false,
    configFirebase: {
        apiKey           : 'AIzaSyDJiClaLsdwGOPkrMDLD55c_YavoGHHRUw',
        authDomain       : 'homework-5-e962d.firebaseapp.com',
        databaseURL      : 'https://homework-5-e962d.firebaseio.com',
        projectId        : 'homework-5-e962d',
        storageBucket    : 'homework-5-e962d.appspot.com',
        messagingSenderId: '127909762244',
        appId            : '1:127909762244:web:e6a8753acdfef4c30d6591',
        measurementId    : 'G-F53ECEZ25T'
    },
    baseUrl       : 'https://pokeapi.co/api/v2'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
