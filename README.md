# DATA Admin
Esta plataforma en RoR es creada para la administración central de los proyectos de DATA. Su cometido es la distribución de información entre los proyectos, a la vez que centralice los componentes de desarrollo transversales de la organización. Ésto se logra a través de la incorporación de entidades (como los proyectos de DATA) y sus relaciones mediante ActiveAdmin, suministradas a terceros a través de una API.  
  
# Instalación
- `git clone https://github.com/datauy/data-admin.git`
- Crear base de datos
- Modificar config/database.yml
- `bundle install`
- `EDITOR="vim" rails credentials:edit` 
- `rails db:migrate`  
- `./bin/importmap pin leaflet`  
- `./bin/importmap pin wicket`  
- `rails assets:precompile`  

# Versiones
## Versión 1.0  
La primera versión de la herramienta contiene 3 componentes:  
- Distribución de proyectos de DATA  
- Footer base para proyectos
- Muestrario de filtros y mapa aplicados a una lista  

### Distribución de Proyectos de DATA  
La finalidad de esta funcionalidad es la distribución dinámica de los diversos proyectos de DATA (título, logo, descripción, link, etc.) para ser consumidos por otras plataformas. En su primer versión se realiza la distribución de proyectos para el armado de un footer dinámico que permita la incorporación de contenido en las diversas plataformas, sin necesidad de modificar el código.  

### Footer base
Diseño de footer básico para proyectos de DATA

### Listado con filtros y mapa
Este desarrollo está basado en el proyecto de DATA [Uidados en el B](https://cuidadosmunicipiob.gub.uy/). Esta ampliación responde a la demanda de listados de este tipo, por lo que se procedió a la sistematización del mismo. Esta primera versión es una generalización de la versión original: 
- Incorpora una configuración base para el armado dinámico del HTML
- Genera filtros dinámicos a partir de un listado en JSON
- Permite la geolocalización de puntos en un mapa, con vínculo al listado HTML  
Está prevista la generación de listados a través de RoR

## Desarrollos a futuro
Incorporación de notificaciones dinámicas a través de la API y transversalización de proyectos para su incorporación.