class ProjectFooter < ApplicationRecord
  belongs_to :project
  belongs_to :footer_project, class_name: 'Project'
end
