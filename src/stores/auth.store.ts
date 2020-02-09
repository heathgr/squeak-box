import * as firebase from 'firebase/app'
import { createStore } from 's-is-for-store'

export type UserValue = firebase.User | null

export interface AuthState {
  user: {
    value: UserValue,
    isPending: boolean,
  },
}

export const initialState: AuthState = {
  user: {
    value: null,
    isPending: true,
  },
}

const authStore = createStore<AuthState>(initialState)

export default authStore
