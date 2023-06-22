class CreateNotificationProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :notification_projects do |t|
      t.references :notification, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
