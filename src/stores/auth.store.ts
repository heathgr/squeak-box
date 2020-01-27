import { User } from 'firebase'
import { createStore } from 's-is-for-store'

export interface AuthStore {
  user: User | null
}

export const initialState: AuthStore = {
  user: null,
}

const authStore = createStore<AuthStore>(initialState)

export default authStore
