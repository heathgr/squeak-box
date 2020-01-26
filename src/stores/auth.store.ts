import { User } from 'firebase'
import { createStore } from 's-is-for-store'

interface AuthStore {
  user?: User
}

export const initialState: AuthStore = {}
export const authStore = createStore<AuthStore>(initialState)