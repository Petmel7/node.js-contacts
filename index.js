
import { program } from "commander";
import *as contactsService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contactsService.listContacts();
            console.log(contacts);
        case "contactId":
            const oneContact = await contactsService.getContactById(id);
            console.log(oneContact);
        case "removeId":
            const remove = await contactsService.removeContact(id);
            return console.log(remove);
        case "add":
            const newContact = await contactsService.addContact({ name, email, phone });
            return console.log(newContact);
        default: console.log("Uncnown action");
    }
}
program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>")

program.parse();

const options = program.opts();
invokeAction(options);