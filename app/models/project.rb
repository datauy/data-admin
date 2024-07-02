class Project < ApplicationRecord
  has_one_attached :icon
  has_one_attached :logo
  has_one_attached :logo_w

  has_many :project_footer
  has_many :footer_projects, through: :project_footer
end
