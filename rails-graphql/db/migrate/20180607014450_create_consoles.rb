class CreateConsoles < ActiveRecord::Migration[5.2]
  def change
    create_table :consoles do |t|
      t.string :name
      t.integer :release_year
      t.references :company, foreign_key: true

      t.timestamps
    end
  end
end
