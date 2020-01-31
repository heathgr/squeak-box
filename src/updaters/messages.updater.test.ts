// @ts-nocheck

import { listenForMessageUpdates, messagesCollection, messagesQuery, createMessage } from '../updaters/messages.updater'
import messagesStore from '../stores/messages.store'
import { firestore } from 'firebase'
import 'firebase/firestore'

const { Timestamp } = firestore

describe('Messages Updater', () => {
  it('Update the messages store based on messages updates.', () => {
    const message1 = {
      message: 'message one',
      createdAt: Timestamp.now(),
    }
    const message2 = {
      message: 'message two',
      createdAt: Timestamp.now(),
    }

    const testSnapshot = [
      {
        data: () => message1
      },
      {
        data: () => message2
      }
    ]

    let snapshotHandler = (snapshot: any) => undefined

    const snapshotSpy = jest
      .spyOn(messagesQuery, 'onSnapshot')
      .mockImplementation((snapshot: any) => {
        snapshotHandler = snapshot
      })
    const updateSpy = jest.spyOn(messagesStore, 'update')

    listenForMessageUpdates()
    snapshotHandler(testSnapshot)

    expect(snapshotSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith({
      messages: [message1, message2]
    })
  })

  it('Creates new messages.', () => {
    const testMessage = {
      message: 'Just a test',
      createdAt: Timestamp.now(),
    }

    const collectionSpy = jest
      .spyOn(messagesCollection, 'add')
      .mockImplementation((document) => undefined)

    createMessage(testMessage.message)

    expect(collectionSpy).toHaveBeenCalledTimes(1)
    expect(collectionSpy).toHaveBeenCalledWith(testMessage)
  })
})