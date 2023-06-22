class CreateNotificationButtons < ActiveRecord::Migration[7.0]
  def change
    create_table :notification_buttons do |t|
      t.references :notification, null: false, foreign_key: true
      t.references :button, null: false, foreign_key: true

      t.timestamps
    end
  end
end
