class GraphqlPersistController < ApplicationController
  def execute
    document = GraphQL.parse(params[:query])

    if valid_query?(document)
      persisted_query = PersistedQuery.create(
        signature: params[:signature],
        query: params[:query],
      )

      render json: persisted_query.attributes
    else
      render json: { errors: @errors }, status: 500
    end
  rescue StandardError => e
    render json: { errors: [e.message] }, status: 500
  end

  private

  def valid_query?(document)
    query = GraphQL::Query.new(RailsGraphqlSchema, document: document)
    validator = GraphQL::StaticValidation::Validator.new(schema: RailsGraphqlSchema)

    results = validator.validate(query)
    errors = results[:errors] || []

    @errors = errors.map(&:message)
    @errors.empty?
  end
end
