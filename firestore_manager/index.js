"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
const admin = __importStar(require("firebase-admin"));
const path_1 = require("path");
// TODO make this configurable
const config = { databaseURL: 'https://squeakbox-development.firebaseio.com' };
const cert = admin.credential.cert(path_1.join(__dirname, '../serviceAccount.json'));
admin.initializeApp({
    credential: cert,
    databaseURL: config.databaseURL,
});
const db = admin.firestore();
const auth = admin.auth();
exports.getDocument = (path) => {
    console.log('Retrieving document: ', path);
    return db.doc(path).get();
};
exports.setDocument = (path, document) => {
    console.log('Setting document: ', path);
    return db.doc(path).set(document);
};
exports.deleteDocumentPath = (path) => {
    console.log('Delete document at path: ', path);
    return exports.deleteDocument(db.doc(path));
};
exports.getDocuments = (path) => {
    console.log('Listing all documents contained in the collectioin: ', path);
    return db.collection(path).listDocuments();
};
exports.addDocument = (path, document) => {
    console.log('Adding document to collection: ', path);
    return db.collection(path).add(document);
};
exports.deleteCollectionPath = (path) => {
    console.log('Deleting collection: ', path);
    return exports.deleteCollection(db.collection(path));
};
exports.deleteCollection = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Deleting collection: ', collection.path);
    const documents = yield collection.listDocuments();
    yield Promise.all(documents.map((document) => exports.deleteDocument(document)));
    yield collection;
});
exports.deleteDocument = (document) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Deleting document: ', document.path);
    const subCollections = yield document.listCollections();
    yield Promise.all(subCollections.map((collection) => exports.deleteCollection(collection)));
    yield document.delete();
});
exports.deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const rootCollections = yield db.listCollections();
    console.log('Clearing the database.  Deleting all documents and collections.');
    return Promise.all(rootCollections.map((collection) => exports.deleteCollection(collection)));
});
exports.mintToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Minting token for: ', id);
    return auth.createCustomToken(id);
});
//# sourceMappingURL=index.js.map