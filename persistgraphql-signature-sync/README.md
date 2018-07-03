# Persistgraphql Signature Sync

- The goal here is to make use of [persistgraphql](https://github.com/apollographql/persistgraphql) to add signtures that will uniquly identify the queries.
- There is also the ability to synchronize the extracted queries to an endpoint.

```
Processes .graphql files under the provided input path and outputs and/or syncs
the extracted queries. The signature for each query is the result of SHA256
hashing the query's content and using the hex digest.

It is possible to sync the persisted queries to a specified endpoint. The
endpoint needs to accept a POST request with body parameters of the query and
the signature.


Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --input-path     Input path for which is recursively looked at for .graphql
                   files                                     [string] [required]
  --output-file    Output file for the extracted queries (JSON of
                   query:operationId)                                   [string]
  --sync-endpoint  Server endpoint to sync queries against (POST with query and
                   signature parameters)                                [string]
  --add-typename   add _typename to every level of the query     [default: true]
```


