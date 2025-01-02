import { mockData } from '@/data/mockup'

export const getUserData = (userId: number) => {
  return mockData.find((user) => user.id === userId)
}
