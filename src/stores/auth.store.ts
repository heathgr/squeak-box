import { User } from 'firebase/app'
import { createStore } from 's-is-for-store'

export interface AuthState {
  user: User | null,
}

export const initialState: AuthState = {
  user: null,
}

const authStore = createStore<AuthState>(initialState)

export default authStore
