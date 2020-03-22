/* eslint-disable @typescript-eslint/no-var-requires */
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const { deleteAll, setDocument } = require('../../firestore_manager/index.js')

module.exports = (on) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
  on('task', {
    clearDatabase() {
      console.log('Fuck: ', deleteAll)
      const deletePromise = deleteAll()
      console.log('Shit: ', typeof deletePromise)
      return deleteAll()
    },
    addMessage(document) {
      console.log('Adding message!!!: ', document)
      return setDocument(`/messages/${document.id}`, {
        message: document.message,
        createdAt: document.createdAt,
      })
    },
  })
}
