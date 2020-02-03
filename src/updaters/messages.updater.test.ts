// @ts-nocheck
import { firestore } from 'firebase/app'
import 'firebase/firestore'

import {
  listenForMessageUpdates,
  messagesCollection,
  messagesQuery,
  createMessage,
} from './messages.updater'
import messagesStore, { MessageState } from '../stores/messages.store'

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
        data: (): MessageState => message1,
      },
      {
        data: (): MessageState => message2,
      },
    ]

    let snapshotHandler = (): void => undefined

    const snapshotSpy = jest
      .spyOn(messagesQuery, 'onSnapshot')
      .mockImplementation((snapshot) => {
        snapshotHandler = snapshot
      })
    const updateSpy = jest.spyOn(messagesStore, 'update')

    listenForMessageUpdates()
    snapshotHandler(testSnapshot)

    expect(snapshotSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith({
      messages: [message1, message2],
    })
  })

  it('Creates new messages.', async () => {
    const testMessage = {
      message: 'Just a test',
      createdAt: Timestamp.now(),
    }

    const addSpy = jest
      .spyOn(messagesCollection, 'add')
      .mockImplementation(() => Promise.resolve())

    await createMessage(testMessage.message)

    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(testMessage)
  })
})
