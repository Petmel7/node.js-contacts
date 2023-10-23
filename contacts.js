
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("db", "contacts.json");
const updateContacts = contacts => fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const data = await fs.readFile(moviesPath);
    return JSON.parse(data);
}

export const getContactById = async id => {
    const contacts = await listContacts();
    const oneContact = await contacts.find(item => item.id === id);
    return oneContact ?? null
}

export const removeContact = async id => {
    const contacts = await listContacts();
    const index = await contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null
    }

    contacts.splice(index, 1);
    await updateContacts(contacts);
    return id;
}

export const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}