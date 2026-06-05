export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const isStrongEnoughPassword = (value) => value && value.length >= 6

export const validateCityQuery = (value) => value.trim().length >= 2
