class Types::QueryType < Types::BaseObject
  field :companies, [Types::CompanyType], null: false, description: "Query for the companies"
  def companies
    Company.all
  end

  field :consoles, [Types::ConsoleType], null: false do
    description "Query for the consoles)"

    argument :after_year, Integer, required: false
    argument :before_year, Integer, required: false
  end
  def consoles(after_year:, before_year:)
    query = Console.order(:release_year)

    if after_year.present?
      query = query.where("release_year >= ?", after_year)
    end

    if before_year.present?
      query = query.where("release_year <= ?", before_year)
    end

    query
  end
end
