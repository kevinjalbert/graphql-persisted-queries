const { invert } = require('lodash');
const extractedQueries = invert(require('./extracted_queries.json'))

persistedQueriesMiddleware = (req, res, next) => {
  console.log("Handling request to: " + req.url)

  const querySignature = req.body.extensions.persistedQuery.sha256Hash;
  const persistedQuery = extractedQueries[querySignature]

  if (!persistedQuery) {
    res.status(400).json({ errors: ['Invalid querySignature'] })
    return next(new Error('Invalid querySignature'))
  }

  req.body.query = persistedQuery
  next()
}

module.exports = { persistedQueriesMiddleware }
