import { createStore } from 's-is-for-store'

interface AppStore {
  user?: any
}

export const initialState: AppStore = {}
export const appStore = createStore<AppStore>(initialState)