import messagesStore, { Message } from '../stores/messages.store'
import { db } from '../services'

// TODO create an enum for collection names
export const onMessagesUpdated = () => {
  const messagesCollection = db.collection('messages')
  
  messagesCollection.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
    const messages: Message[] = []

    snapshot.forEach((doc) => {
      messages.push(doc.data() as Message)
    })

    messagesStore.update({
      messages,
    })
  })
}