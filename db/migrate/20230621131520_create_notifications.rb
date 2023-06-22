class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :header
      t.text :description
      t.integer :type
      t.date :from
      t.date :to

      t.timestamps
    end
  end
end
