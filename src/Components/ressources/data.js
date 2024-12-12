import { generateId } from './helperFunction.js';

const trackList1 = [
    {
        name: "song1",
        artist: "artist1",
        album: "album1",
        id: generateId()
    }, 
    {
        name: "song2",
        artist: "artist1",
        album: "album1",
        id: generateId()
    },
    {
        name: "song3",
        artist: "artist1",
        album: "album1",
        id: generateId()
    },
    {
        name: "song4",
        artist: "artist1",
        album: "album1",
        id: generateId()
    }
];

const trackList2 = [
    {
        name: "song1",
        artist: "artist2",
        album: "album1",
        id: generateId()
    }, 
    {
        name: "song2",
        artist: "artist2",
        album: "album1",
        id: generateId()
    },
    {
        name: "song3",
        artist: "artist2",
        album: "album1",
        id: generateId()
    },
    {
        name: "song4",
        artist: "artist2",
        album: "album1",
        id: generateId()
    }
];

const ressources = {
    trackList1,
    trackList2
};

export default ressources;
