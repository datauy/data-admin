import { Controller } from "@hotwired/stimulus"
import "leaflet"
//access variable in Wkt.default
import * as Wkt from "wicket"

export default class extends Controller { 
  static values = { orgId: Number }
  static total = 0
  static allLayers
  static currentLayer

  connect() {
    console.log("CONNECT MAPA");
    if ( typeof(window.mapa) === 'undefined' ) {
      window.Mapa = this;
      window.currentLayer = new L.FeatureGroup();
      window.allLayers = new L.FeatureGroup();
      window.active_filters = {
        'otypes': [],
        'zones': [],
        'subjects': [],
        'actions': [],
        'text': "",
      };
      window.mapa = L.map('map', {scrollWheelZoom: false}).setView([-34.897013, -56.171186], 13);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(window.mapa);
      window.mapa.zoomControl.setPosition('topright');
      this.markers = L.layerGroup();
      //Get DATA
      this.clearFilters(true)
      let xhr = new XMLHttpRequest();
      let url = '/markers.json';
      xhr.open("GET", url, true);
      console.log("GETTING DATA: "); 
      xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText)
              this.data = JSON.parse(this.responseText)
              /*this.renderElements(this.data, true)*/
          }
      }
      
      //Sending our request 
      //xhr.send();
      const total = this.data.length;
      const mapBounds = [];
      const serv_options = [];
      const obj_options = [];
      var currentList = [];
      var min_max_age = [];
      var active_filters = {
      'serv': [],
      'obj': [],
      'age': -1,
      'summ': false,
      'ext': false,
      'search_res': ''
      };
      //MAP
      //LIST
      //Add filters
      /*var serv_options_dom = document.getElementById('servicio');
      for (var i = 0; i < serv_options.length; i++){
      serv_options_dom.innerHTML += '<li class="option serv-option" id="serv-option-'+i+'" onclick="toggleOption(\'serv\', '+i+', this)">'+serv_options[i]+'</li>';
      }
      var obj_options_dom = document.getElementById('objetivo');
      for (var i = 0; i < obj_options.length; i++){
        const style = get_style(obj_options[i]);
        obj_options_dom.innerHTML += '<li class="option obj-option" id="obj-option-'+i+'" onclick="toggleOption(\'obj\', '+i+', this)"><i style="color: '+style.color+'" class="fas fa-'+style.icon+'"></i>'+obj_options[i]+'</li>';
      }*/
    }
  }
  clearFilters() {
    window.active_filters = {
      'otypes': [],
      'zones': [],
      'subjects': [],
      'actions': [],
      'text': "",
    };
    this.search(null)
    document.querySelectorAll('#filters li.active').forEach(element => {
      element.classList.toggle('active')
    });
  }
  renderElements(elements, initial = false) {
    //Generate markers for all data rows |element = data[0]
    if ( elements.length > 0 ) {
      markers.clearLayers();
      jQuery('#no-results').hide();
      currentList = elements;
      var list = '<ul>';
      elements.forEach((element, i) => {
        list += elementListHtml(element, i);
        var iconUrl = '/wp-content/uploads/sites/5/2022/10/icon-green.png';
        switch (element.poblacion) {
          case 'Personas adultas mayores':
          iconUrl = '/wp-content/uploads/sites/5/2022/10/icon-blue.png';
          break;
          case 'Personas con discapacidad':
          case 'Personas en situación de discapacidad':
          case 'Personas en situación de discapacidad visual':
          case 'Personas en situación de discapacidad intelectual':
          case 'Personas con dificultades en el aprendizaje':
          iconUrl = '/wp-content/uploads/sites/5/2022/10/icon-orange.png';
          break;
        }
        var iconDefault = L.icon({
          className: "marker",
          iconUrl: iconUrl,
          iconSize: [29, 37],
          iconAnchor: [12, 37],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });
        var mark = L.marker([element['lat'],element['lng']], {icon: iconDefault, list_pos: i}).on('click', clickPin).addTo(markers);
        mapBounds.push([element.lat, element.lng]);
        //Load filters if initial load
        if ( initial ) {
          if ( !serv_options.includes(element.tipo_centro) ) {
            serv_options.push(element.tipo_centro);
          }
          if ( !obj_options.includes(element.poblacion) ) {
            obj_options.push(element.poblacion);
          }
        }
      });
      list += '</ul>';
      map.addLayer(markers);
      document.getElementById("list").innerHTML = list;
      document.getElementById("results").innerHTML = "Mostrando "+elements.length+"/"+total+" puntos";
      map.flyToBounds(mapBounds);
    }
    else {
      jQuery('#no-results').show();
    }
  }
  /**  */
  renderZones(org, initial = false) {
    this.total = this.data.length;
    let orgs = this.data;
    var wkt = new Wkt.default.Wkt();
    if ( !initial ) {
      window.mapa.removeLayer(window.currentLayer);
      currentLayer.eachLayer(function (layer) {
        currentLayer.removeLayer(layer);
      });
    }
    if ( org !== undefined ) {
      orgs = [this.data[org]];
    }
    orgs.forEach((org, idx) => {
      var zonesData = [];
      org.zones.forEach(zone_id => {
        if ( zones[zone_id].geometry !== null ) {
          wkt.read(zones[zone_id].geometry);
          zonesData.push({ 
            "type": "Feature",
            'properties': {
              zoneId: zone_id
            }, "geometry": wkt.toJson() 
          });
        }
      });
      L.geoJSON(zonesData, {
        fillColor: subjects[org.subject_id].color,
        color: subjects[org.subject_id].color,
        onEachFeature: (feature, layer) => {
          layer.on({
            click: (e) => {
              let zoneId = e.target.feature.properties.zoneId
              document.querySelector('li[data-value="'+zoneId+'"]').click()
            }            
          })
        }
      }).addTo(window.currentLayer);
      if ( initial ) {
        L.geoJSON(zonesData).addTo(window.allLayers);
      }
    });
    var bounds = window.currentLayer.getBounds();
    if ( Object.keys(bounds).length ) {
      window.mapa.flyToBounds(window.currentLayer.getBounds());
    }
    window.currentLayer.addTo(window.mapa);
  }
  toggleDesc(orgId) {
    var srv = document.getElementById('org-'+orgId);
    if ( !srv.classList.contains('active') ) {
      let active = document.querySelector('.org.active')
      if ( active ) {
        active.classList.remove('active')
        active.querySelector('button').setAttribute('aria-expanded', false)
      }
      srv.classList.add("active");
      document.getElementById('org-'+orgId+'-button').setAttribute('aria-expanded', true)
      let position = srv.offsetTop - document.getElementById('org-0').offsetTop;
      let list = document.getElementById('list')
      list.style.height = srv.offsetHeight+"px"
      list.scrollTo(0, position)
      //document.getElementById('srv-'+id).scrollIntoView({behavior: 'smooth'});
    }
    else {
      srv.classList.remove('active')
      srv.querySelector('button').setAttribute('aria-expanded', false)
      orgId = undefined;
      list.style.height = "calc(100vh - 500px)"
    }
    this.renderZones(orgId);
  }
  change(event) {
    //const frame = document.getElementById("map_filters");
    //console.log("CHANGE MAP");
    //frame.src = "/search.turbo_stream";
    //frame.reload(); // there is no need to reload
  }
  toggleSearchSelect(elem_id, button) {
    //clear all 
    document.querySelectorAll('.select-wrapper ul:not(#'+elem_id+')').forEach( ul => {
      ul.classList.remove('active')
    });
    document.getElementById(elem_id).classList.toggle('active')
    button.getAttribute('aria-expanded') == "true" ? button.setAttribute('aria-expanded', false) : button.setAttribute('aria-expanded', true)
  }
  search(event) {
    if ( event !== null ) {
      //Handle filters
      let cat = event.target.dataset.category;
      let value = event.target.dataset.value;
      if ( cat == 'text' ) {
        window.active_filters[cat] = document.getElementById('search-text').value
      }
      else {
        if ( event.target.classList.contains('active') ) {
          window.active_filters[cat].splice(window.active_filters[cat].indexOf(value), 1);
        }
        else {
          window.active_filters[cat].push(value);
        }
        event.target.classList.toggle('active');
      }
    }
    // Create URL
    let url = new URL(window.location.protocol+"//"+window.location.hostname+(window.location.port.length !== 0 ? ":"+window.location.port : '')+"/search");
    Object.keys(window.active_filters).forEach( cat => {
      if ( window.active_filters[cat].length ) {
        if ( cat == 'text' ) {
          if (window.active_filters[cat].length > 2 )
            url.searchParams.append(cat, window.active_filters[cat]);
        }
        else {
          url.searchParams.append(cat, window.active_filters[cat].join(','));
        }
      }
    });
    fetch(url.href, {
      method: "GET",
      headers: {
        Accept: "text/vnd.turbo-stream.html"
      }
    })
    .then(r => r.text())
    .then(html => {
      Turbo.renderStreamMessage(html)
      if (event !== null ) {
        event.target.parentNode.classList.remove('active')
      }
    })
  }
}
