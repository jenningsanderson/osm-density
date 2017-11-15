'use strict';

var tilebelt = require('@mapbox/tilebelt')
var lineDistance = require('@turf/line-distance')

module.exports = function(data, tile, writeData, done) {

  //Extract the osm layer from the mbtile
  var layer = data.osm.osm;
    
  //We need to map timestamps to current vals
  //ex: 1447046883  
  //var first_time  = 1104537600
  //var current_val = 1510713393    
  //var range       = 406175793

  var natural = [
    'natural',
    'waterway',
  ]
 
  var suffix;
  layer.features.forEach(function(feat){
      
    //hard code some failures in here
    if(feat.properties.boundary){
      return
    }
    if(feat.properties.admin_level){
      return
    }
    
    suffix=30;

    for(var i in natural){
      if (feat.properties[natural[i]]){
        suffix=240;
      }
    }
      
    var str;
      
    if (feat.geometry.type == "Polygon"){
      // No empty features allowed :) 
      if (Object.keys(feat.properties).length==7){
        return;  
      }else{
        str = feat.geometry.coordinates[0].slice(0,50).map(function(x){ 
          return x[1].toFixed(6)+","+x[0].toFixed(6) //+ " :" + (d*10).toFixed(0)
        }).join(" ")
      }
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
