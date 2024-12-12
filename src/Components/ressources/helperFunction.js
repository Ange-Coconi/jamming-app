// This files contain helper functions for all the Component functions.

//Keep a registery of the id already generated
const generatedId  = 0;

// generate new id automatically
const generateId = () => {
    generatedId++;
    return generatedId;
};


const ressources = {
    generateId
}

export default ressources;