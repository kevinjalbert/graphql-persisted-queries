Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"

  post "/graphql", to: "graphql#execute"
  get "/graphql", to: "graphql#execute"
  post "/graphql_persist", to: "graphql_persist#execute"
end
