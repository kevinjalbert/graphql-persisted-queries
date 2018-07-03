class Types::CompanyType < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :consoles, [Types::ConsoleType], null: false
end
