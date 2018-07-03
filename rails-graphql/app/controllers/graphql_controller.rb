class GraphqlController < ApplicationController
  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]

    if query.present?
      result = RailsGraphqlSchema.execute(query, variables: variables, operation_name: operation_name)
    else
      signature = params.dig(:extensions, :persistedQuery, :sha256Hash)
      persisted_query = PersistedQuery.find_by!(signature: signature)
      result = RailsGraphqlSchema.execute(persisted_query.query, variables: variables, operation_name: operation_name)
    end

    render json: result
  rescue StandardError => e
    render json: { errors: [e.message] }
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
