/* eslint-disable @typescript-eslint/no-var-requires */
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const { deleteAll, setDocument } = require('../../firestore_manager/index.js')

module.exports = (on) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
  on('task', {
    clearDatabase() {
      return deleteAll()
    },
    addMessage(document) {
      return setDocument(`/messages/${document.id}`, {
        message: document.message,
        createdAt: document.createdAt,
      })
    },
  })
}
