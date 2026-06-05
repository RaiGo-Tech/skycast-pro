const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const registerSchema = (body) => {
  const value = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    password: String(body.password || ''),
  }

  if (value.name.length < 2) return { error: 'Name must be at least 2 characters', value }
  if (!emailRegex.test(value.email)) return { error: 'Valid email is required', value }
  if (value.password.length < 6) return { error: 'Password must be at least 6 characters', value }
  return { value }
}

const loginSchema = (body) => {
  const value = {
    email: String(body.email || '').trim().toLowerCase(),
    password: String(body.password || ''),
  }
  if (!emailRegex.test(value.email)) return { error: 'Valid email is required', value }
  if (!value.password) return { error: 'Password is required', value }
  return { value }
}

module.exports = { registerSchema, loginSchema }
