const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const writeJsonFile = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

async function listContacts() {
  const req = await fs.readFile(contactsPath);
  return JSON.parse(req);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find(({ id }) => id === contactId) || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId) || null;
  if (result) writeJsonFile(data.filter(({ id }) => id !== result.id));
  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newData = [...data, { name, email, phone, id: nanoid() }];
  writeJsonFile(newData);
  return newData;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
