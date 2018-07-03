class Types::ConsoleType < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :release_year, Integer, null: false
  field :company, Types::CompanyType, null: false
  def company
    Loaders::RecordLoader.for(Company).load(object.company_id)
  end
end
