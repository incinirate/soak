import { license, kristpkey, hostname } from './config.json';
import SwitchChat from 'switchchat';
import Krist from './krist';

import { makeV2Address } from 'krist-utils';

// const switchClient = new SwitchChat.Client(license);
// switchClient.connect()
//     .then(() => console.log("Connected to Switchcraft successfully."))
//     .catch(e => {
//         console.error("Error connecting to Switchcraft: ", e);
//         process.exit(10);
//     });

const kristClient = new Krist.Client();
const connection = kristClient.connect(kristpkey)
    .then(() => console.log("Connected to Krist successfully."))
    .catch(e => {
        console.error("Error connecting to Krist: ", e);
        process.exit(11);
    });

// Setup all the listeners
connection.then(() => {
    kristClient.registerNameTXListener(hostname, (tx: Krist.Transaction) => {
        // TODO
    });
});

console.log(makeV2Address(kristpkey));
