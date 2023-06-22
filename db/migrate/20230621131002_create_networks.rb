class CreateNetworks < ActiveRecord::Migration[7.0]
  def change
    create_table :networks do |t|
      t.string :title
      t.string :link

      t.timestamps
    end
  end
end
