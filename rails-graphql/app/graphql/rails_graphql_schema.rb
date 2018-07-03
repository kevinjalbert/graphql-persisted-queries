class RailsGraphqlSchema < GraphQL::Schema
  query(Types::QueryType)

  use GraphQL::Batch
end
