ActiveAdmin.register Project do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :link, :icon, :logo, :logo_w, :active, footer_project_ids: []
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :link]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form :html => { :multipart => true } do |f|
    f.inputs do
      f.input :title
      f.input :icon, as: :file
      if f.object.icon.attached?
        span image_tag(f.object.icon)
          a "Borrar", href: delete_image_admin_project_path(image_id: f.object.icon.id), "data-confirm": "Confirme que desea eliminarla"
      end
      f.input :logo, as: :file
      if f.object.logo.attached?
        span image_tag(f.object.logo)
          a "Borrar", href: delete_image_admin_project_path(image_id: f.object.logo.id), "data-confirm": "Confirme que desea eliminarla"
      end
      f.input :logo_w, as: :file
      if f.object.logo_w.attached?
        span image_tag(f.object.logo_w)
          a "Borrar", href: delete_image_admin_project_path(image_id: f.object.logo_w.id), "data-confirm": "Confirme que desea eliminarla"
      end
      f.input :link
      f.input :active
      f.input :footer_projects, as: :check_boxes, collection: Project.all
    end
    f.actions
  end

  member_action :delete_image, method: :get do
    if resource.icon.attached?
      resource.icon.delete
    end
    #@pic = ActiveStorage::Attachment.find(params[:id])
    #@pic.purge_later
    logger.info "\n\nPASA MEMBER DELETE\n\n"
    redirect_to collection_path, notice: "Imagen borrada"
  end
end
