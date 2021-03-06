// @ts-nocheck
import { firestore } from 'firebase/app'
import 'firebase/firestore'

import {
  listenForMessageUpdates,
  messagesCollection,
  messagesQuery,
  addMessage,
} from './messages.updater'
import messagesStore, { MessageState } from '../stores/messages.store'

const { Timestamp } = firestore

describe('Messages Updater', () => {
  it('Update the messages store based on messages updates.', () => {
    const message1 = {
      message: 'message one',
      createdAt: Timestamp.fromDate(new Date(2020, 2, 15)),
    }
    const message2 = {
      message: 'message two',
      createdAt: Timestamp.fromDate(new Date(2020, 2, 16)),
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
    const timeSteamp = Timestamp.now()

    const testMessage = {
      message: 'Just a test',
      createdAt: timeSteamp,
    }

    const addSpy = jest
      .spyOn(messagesCollection, 'add')
      .mockImplementation(() => Promise.resolve())

    await addMessage(testMessage.message)

    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(testMessage)
  })
})
