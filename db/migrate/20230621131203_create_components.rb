class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components do |t|
      t.string :title
      t.string :header
      t.text :description
      t.integer :type

      t.timestamps
    end
  end
end
