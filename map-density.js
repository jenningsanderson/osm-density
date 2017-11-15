'use strict';

var tilebelt = require('@mapbox/tilebelt')
var lineDistance = require('@turf/line-distance')

module.exports = function(data, tile, writeData, done) {

  //Extract the osm layer from the mbtile
  var layer = data.osm.osm;
    
  //We need a value to map to for the color? 
  var idx = 10;
    
  //We need to map timestamps to current vals
  //ex: 1447046883
  
  //var first_time  = 1104537600
  //var current_val = 1510713393
    
  //var range       = 406175793
   
    
  layer.features.forEach(function(feat){

    var d = Math.log( Number(feat.properties['@timestamp']) ) 
   
    var str;
      
    if (feat.geometry.type == "Polygon"){
      str = feat.geometry.coordinates[0].slice(0,50).map(function(x){ 
        return x[1].toFixed(4)+","+x[0].toFixed(4) //+ " :" + (d*10).toFixed(0)
      }).join(" ")
    }else if (feat.geometry.type == "LineString"){
      str = feat.geometry.coordinates.slice(0,50).map(function(x){ 
        return x[1].toFixed(4)+","+x[0].toFixed(4) //+ " :" + (d*10).toFixed(0)
      }).join(" ")
    }else if (feat.geometry.type == "Point"){
      str = feat.geometry.coordinates[1].toFixed(4)+","+feat.geometry.coordinates[0].toFixed(4) 
    }
    
    if(str){ 
      writeData(str + " :" + (d*10).toFixed(0) +"\n") 
    }
  });
  done(null, null);
};