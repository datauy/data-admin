class CreateProjectFooters < ActiveRecord::Migration[7.0]
  def change
    create_table :project_footers do |t|
      t.references :project, null: false, foreign_key: true
      t.references :footer_project, null: false, foreign_key: { to_table: :projects }

      t.timestamps
    end
  end
end
