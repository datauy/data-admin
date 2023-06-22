class CreateButtons < ActiveRecord::Migration[7.0]
  def change
    create_table :buttons do |t|
      t.string :title
      t.string :link
      t.integer :type

      t.timestamps
    end
  end
end
