# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
     origins 'http://admin.data.org.uy', 'https://admin.data.org.uy', 'https://dondereciclo.uy', 'https://dondereciclo.com.uy', 'https://www.dondereciclo.uy', 'https://www.dondereciclo.com.uy', 'https://dondereciclo.co', 'https://www.dondereciclo.co'
     resource '/api/*',
       headers: :any,
       methods: %i(get post put)
   end
end
