import { createContext, useCallback, useContext, useRef, useState } from 'react'

// Shared between the hero tree (which throws apples) and the nav (which catches them).
const BasketContext = createContext(null)

export function BasketProvider({ children }) {
  const [count, setCount] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const [bumpKey, setBumpKey] = useState(0)
  const basketRef = useRef(null)

  const addApple = useCallback(() => {
    setCount((c) => {
      const next = c + 1
      setAnnouncement(`Apple added to basket. ${next} ${next === 1 ? 'apple' : 'apples'} collected.`)
      return next
    })
    setBumpKey((k) => k + 1)
  }, [])

  return (
    <BasketContext.Provider value={{ count, addApple, basketRef, bumpKey }}>
      {children}
      {/* Screen-reader announcement for each catch; visually hidden. */}
      <p className="sr-only" aria-live="polite" role="status">{announcement}</p>
    </BasketContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasket() {
  const ctx = useContext(BasketContext)
  if (!ctx) throw new Error('useBasket must be used inside <BasketProvider>')
  return ctx
}
