class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  sort(defaultSort = '-createdAt') {
    const sortBy = this.queryString.sort || defaultSort
    this.query = this.query.sort(sortBy)
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      this.query = this.query.select(this.queryString.fields.split(',').join(' '))
    }
    return this
  }

  paginate() {
    const page = Number(this.queryString.page) || 1
    const limit = Number(this.queryString.limit) || 20
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

module.exports = APIFeatures
