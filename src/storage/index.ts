import { MMKV } from 'react-native-mmkv'

export const STORAGE_KEYS = {
  USER: 'USER',
  TOKEN: 'TOKEN',
  REMEMBER_ME: 'REMEMBER_ME',
  ONBOARDING_COMPLETED: 'ONBOARDING_COMPLETED',
  LANGUAGE_CODE: 'LANGUAGE_CODE',
}

type StorageKey = keyof typeof STORAGE_KEYS

const mmkv = new MMKV()

const Storage = {
  // For string
  setItem: (key: StorageKey, value: string) => {
    mmkv.set(STORAGE_KEYS[key], value)
  },
  getItem: (key: StorageKey) => {
    return mmkv.getString(STORAGE_KEYS[key])
  },

  // For object
  setObject: (key: StorageKey, value: object) => {
    mmkv.set(STORAGE_KEYS[key], JSON.stringify(value))
  },
  getObject: (key: StorageKey) => {
    const jsonString = mmkv.getString(STORAGE_KEYS[key])
    return jsonString ? JSON.parse(jsonString) : null
  },

  // For Number
  setNumber: (key: StorageKey, value: number) => {
    mmkv.set(STORAGE_KEYS[key], value)
  },
  getNumber: (key: StorageKey) => {
    return mmkv.getNumber(STORAGE_KEYS[key]) || 0
  },

  removeItem: (key: StorageKey) => {
    mmkv.delete(STORAGE_KEYS[key])
  },

  clear: () => {
    mmkv.clearAll()
  },
}

export default Storage
