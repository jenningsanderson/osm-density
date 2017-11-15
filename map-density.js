'use strict';

var tilebelt = require('@mapbox/tilebelt')
//var turfBbox = require('@turf/bbox')
//var turfArea = require('@turf/area')

module.exports = function(data, tile, writeData, done) {

  //Extract the osm layer from the mbtile
  var layer = data.osm.osm;
  
  var natural = [
    'natural',
    'waterway',
  ]
  
  var skip = [
      'hires',
      'boundary',
      'admin_level',
      'maritime'
    ]
 
  var suffix, str;
  layer.features.forEach(function(feat){
      
    //hard code some failures in here
    for(var i in skip){
      if(feat.properties.hasOwnProperty(skip[i])){
         return;
      }
    }

    if (feat.properties.name == 'Bermuda Triangle'){
      return;
    }

    suffix=30;
      
    for(var i in natural){
      if (feat.properties[natural[i]]){
        suffix=240;
      }
    }
    
    if (feat.properties.leisure == 'nature_reserve') {
      suffix=240 //managed natural spaces... up for debate
    }else if(feat.properties.landuse== 'forest'){
      suffix=240
    }
        

    if (feat.geometry.type == "Polygon"){
      // No empty features allowed :) 
      if (Object.keys(feat.properties).length==7){
        return;
      }

      str = feat.geometry.coordinates[0].slice(0,50).map(function(x){ 
        return x[1].toFixed(6)+","+x[0].toFixed(6) //+ " :" + suffix
      }).join(" ")
    }else if (feat.geometry.type == "LineString"){
      //No empty features allowed :) 
      if (Object.keys(feat.properties).length==7){
        return;
      }else{
        str = feat.geometry.coordinates.slice(0,50).map(function(x){ 
          return x[1].toFixed(6)+","+x[0].toFixed(6) //+ " :" + (d*10).toFixed(0)
        }).join(" ")
      }
    }else if (feat.geometry.type == "Point"){
      //Since we're using osm-qa-tiles, empty features don't exist anyway
      str = feat.geometry.coordinates[1].toFixed(6)+","+feat.geometry.coordinates[0].toFixed(6) 
    }
    
    if(str){ 
      writeData(str + " :" + suffix +"\n") 
    }
  });
  done( null, null );
};
