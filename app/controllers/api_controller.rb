class ApiController < ApplicationController
  def project_footer
    if params[:project_id].present?
      footer_projects = ProjectFooter.where( project_id: params[:project_id] ).pluck(:footer_project_id)
      @projects = Project.where(active: true, id: footer_projects)

    else
      @projects = Project.where(active: true)
    end

    render json: format_projects
  end

  def format_projects
    res = []
    @projects.each { |p| (
      res << {
        id: p.id,
        title: p.title,
        icon: p.icon.attached? ? url_for(p.icon) : '',
        logo: p.logo.attached? ? url_for(p.logo) : '',
        logo_w: p.logo_w.attached? ? url_for(p.logo_w) : '',
        link: p.link
      }
    )}
    res
  end
end
