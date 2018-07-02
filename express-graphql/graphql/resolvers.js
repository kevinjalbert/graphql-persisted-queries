const rawData = require('../data.json')

const resolvers = {
  Company: {
    consoles: (obj, args) => {
      return rawData.consoles.filter(item => (item.company_id === obj.id));
    }
  },

  Console: {
    company: (obj, args) => {
      return rawData.companies.find(item => (item.id === obj.company_id));
    },
    releaseYear: (obj, args) => (obj.release_year)
  },

  Query: {
    companies: (obj, args) => {
      return rawData.companies
    },

    consoles: (obj, args) => {
      let results = rawData.consoles

      if (args.afterYear) {
        results = results.filter(item => item.release_year > args.afterYear)
      }

      if (args.beforeYear) {
        results = results.filter(item => item.release_year < args.beforeYear)
      }

      return results.sort((a,b) => (a.release_year - b.release_year))
    }
  },
}

module.exports = { resolvers }

