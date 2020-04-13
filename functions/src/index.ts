/* eslint-disable import/prefer-default-export */
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const justATest = functions.firestore.document('/messages/{message}').onCreate((change, context) => {
  console.log('data: ', change.data())
  console.log('auth: ', context.auth)
  return true
})
