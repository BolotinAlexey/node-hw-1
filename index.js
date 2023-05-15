const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return await listContacts();

    case "get":
      return await getContactById(id);

    case "add":
      return await addContact(name, email, phone);

    case "remove":
      return await removeContact(id);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action: "remove", id: "5b1BF6aTVKMYmsnOLs7CE" }).then(
  console.log
);
