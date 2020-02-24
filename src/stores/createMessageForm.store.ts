import { createStore } from 's-is-for-store'

export interface CreateMessageFormState {
  input: string,
  isPending: boolean,
  isValid: boolean,
  validationError: string,
}

export const initialState: CreateMessageFormState = {
  input: '',
  isPending: false,
  isValid: false,
  validationError: '',
}

const createMessageFormStore = createStore<CreateMessageFormState>(initialState)

export default createMessageFormStore
