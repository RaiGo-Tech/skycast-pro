const { fail } = require('../utils/responseFormatter')

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema(req.body)
  if (error) {
    return fail(res, error, 422)
  }
  req.body = value
  return next()
}

module.exports = validate
