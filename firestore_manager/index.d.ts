interface Document {
    [key: string]: string | number | boolean | Date;
}
export declare const getDocument: (path: string) => Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>;
export declare const setDocument: (path: string, document: Document) => Promise<FirebaseFirestore.WriteResult>;
export declare const deleteDocumentPath: (path: string) => Promise<void>;
export declare const getDocuments: (path: string) => Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[]>;
export declare const addDocument: (path: string, document: Document) => Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;
export declare const deleteCollectionPath: (path: string) => Promise<void>;
export declare const deleteCollection: (collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>) => Promise<void>;
export declare const deleteDocument: (document: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>) => Promise<void>;
export declare const deleteAll: () => Promise<void[]>;
export declare const mintToken: (id: string) => Promise<string>;
export {};
//# sourceMappingURL=index.d.ts.map