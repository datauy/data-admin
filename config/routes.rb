Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#index"

  get "api/project-footer", to: "api#project_footer"
  get "samples/mapa-filtros", to: "mapa_filtros#index"
  get "samples/mapa-filtros-js", to: "mapa_filtros#filtros_js"
end
