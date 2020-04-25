import { license, kristpkey, hostname, blacklist } from './config.json';
import SwitchChat from 'switchchat';
import Krist from './krist';

const switchClient = new SwitchChat.Client(license);
switchClient.connect()
    .then(() => console.log("Connected to Switchcraft successfully."))
    .catch(e => {
        console.error("Error connecting to Switchcraft: ", e);
        process.exit(10);
    });

const kristClient = new Krist.Client();
kristClient.connect(kristpkey)
    .then(() => console.log("Connected to Krist successfully."))
    .catch(e => {
        console.error("Error connecting to Krist: ", e);
        process.exit(11);
    });

// Setup all the listeners
const blackset = new Set(blacklist);
kristClient.registerNameTXListener(hostname, async (tx: Krist.Transaction) => {
    const players = Array.from(switchClient.getPlayers())
        .filter(player => !blackset.has(player.uuid));

    if (players.length === 0) return await tx.refund({ error: "No eligible players could be found. Is the server offline?" });

    const split = Math.floor(tx.value / players.length);
    const leftover = tx.value % players.length;
    if (split === 0) return await tx.refund({ error: `Not enough KST for all players online. Must be at least ${players.length}KST.` });
    if (leftover > 0) await tx.refund({ message: "Amount could not be split evenly between players, here is the leftover." }, leftover);

    await Promise.all(players.map(player => kristClient.makeTransaction(`${player.name}@switchcraft.kst`, split, 
        { message: `${tx.metadata.username || tx.from} donated ${split} to you through ${hostname}!` })));
});
