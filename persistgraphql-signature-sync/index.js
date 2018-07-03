const { version } = require('./package.json');

const { ExtractGQL } = require('persistgraphql/lib/src/ExtractGQL')
const { addTypenameTransformer } = require('persistgraphql/lib/src/queryTransformers')
const { parse, separateOperations } = require('graphql')
const { writeFileSync } = require('fs')
const { URLSearchParams } = require('url');
const yargs = require('yargs')
const fetch = require('node-fetch')
const sha256 = require('hash.js/lib/hash/sha/256');

const extractGQL = (inputPath, addTypename) => {
  const queryTransformers = []
  if (addTypename) { queryTransformers.push(addTypenameTransformer) }

  return new ExtractGQL({ inputPath, queryTransformers })
}

const generateHash = (string) => {
  return sha256().update(string).digest('hex')
}

const addQuery = (query, json) => {
  const document = parse(query)
  const operationNames = Object.keys(separateOperations(document))

  if (operationNames.length > 1) {
    throw new Error('Only one operation per file is allowed');
  }

  const signature = `${generateHash(query)}`
  json[query] = signature
}

const saveExtractedQueries = (outputFile, json) => {
  console.log(`\nSaving file to ${outputFile}`)
  writeFileSync(outputFile, JSON.stringify(json))
}

const syncPersistedQueries = async (syncEndpoint, extractedQueries) => {
  Object.keys(extractedQueries).forEach(query => {
    const signature = extractedQueries[query];
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('signature', signature);

    console.log(`\nSynching persisted query ${signature}`)

    fetch(syncEndpoint, { method: 'POST', body: params })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error))
  })
}

const process = async ({ inputPath, outputFile, addTypename, syncEndpoint }) => {
  console.log('Extracting GraphQL')
  const outputMap = await extractGQL(inputPath, addTypename).processInputPath(inputPath)
  const extractedQueries = {}

  Object.keys(outputMap).forEach(query => {
    addQuery(query, extractedQueries);
  })

  if (outputFile) {
    saveExtractedQueries(outputFile, extractedQueries);
  }

  if (syncEndpoint) {
    syncPersistedQueries(syncEndpoint, extractedQueries)
  }
}

const commandDescription = `
Processes .graphql files under the provided input path and outputs and/or syncs
the extracted queries. The signature for each query is the result of SHA256
hashing the query's content and using the hex digest.

It is possible to sync the persisted queries to a specified endpoint. The
endpoint needs to accept a POST request with body parameters of the query and
the signature.
`

yargs
  .version(version)
  .command('*', commandDescription, () => {}, (argv) => {
    process(argv)
  })
  .option('input-path', {
    describe: 'Input path for which is recursively looked at for .graphql files',
    type: 'string',
    require: true
  })
  .option('output-file', {
    describe: 'Output file for the extracted queries (JSON of query:operationId)',
    type: 'string',
  })
  .option('sync-endpoint', {
    describe: 'Server endpoint to sync queries against (POST with query and signature parameters)',
    type: 'string',
  })
  .option('add-typename', {
    describe: 'add _typename to every level of the query',
    default: true
  })
  .argv


