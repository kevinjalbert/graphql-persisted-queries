class CreatePersistedQueries < ActiveRecord::Migration[5.2]
  def change
    create_table :persisted_queries do |t|
      t.string :signature, index: { unique: true }
      t.string :query

      t.timestamps
    end
  end
end
