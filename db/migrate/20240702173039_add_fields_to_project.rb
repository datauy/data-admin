class AddFieldsToProject < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :active, :boolean
  end
end
