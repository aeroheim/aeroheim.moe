/* eslint-disable consistent-return */
/* eslint-disable no-undef */

const { validationResult } = require('express-validator/check');

function filterStaticContent(filter, handler) {
  return (req, res, next) => {
    const staticContent = req.params['0'];
    if (staticContent && !filter(staticContent)) {
      if (handler) {
        return handler(staticContent, { req, res, next });
      }

      return res.status(403).send('Access denied.');
    }

    next();
  };
}

function filterQuery(filter, handler) {
  return (req, res, next) => {
    for (query in req.query) {
      if (!filter(query)) {
        if (handler) {
          return handler(query, { req, res, next });
        }

        return res.status(500).send(`Unsupported query: ${query}.`);
      }
    }

    next();
  };
}

function validateExpressValidator(req, res, next) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.array() });
  }

  next();
}

module.exports = {
  filterStaticContent,
  filterQuery,
  validateExpressValidator,
};
