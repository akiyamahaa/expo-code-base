import { useState, useEffect } from 'react'

const useSampleHook = (initialValue: number) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    // Example effect: log the value whenever it changes
    console.log('Value changed:', value)
  }, [value])

  const increment = () => setValue(value + 1)
  const decrement = () => setValue(value - 1)

  return { value, increment, decrement }
}

export default useSampleHook
