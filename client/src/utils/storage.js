export const readStorage = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
