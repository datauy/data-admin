class NotificationButton < ApplicationRecord
  belongs_to :notification
  belongs_to :button
end
