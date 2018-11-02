'use strict';

var fs = require('fs')
var path = require('path');
var tileReduce = require('@mapbox/tile-reduce');
//var _ = require('lodash')

var config = {}

//Get the latest planet .mbtiles file 
config['sources'] = [{name: 'osm', mbtiles: path.join("/data/planet/latest.planet.mbtiles"), raw: false}]

//config.bbox = [-109.0603,36.9924,-102.0409,41.0034]
//config.bbox = [-86.35,23.44,-70.27,45.43]
//config.bbox = [-100,17,-95,29]
//config.bbox = [-76.29,22.67,-28.12,40.33]
config.map = path.join(__dirname, '/map-density.js')
config.zoom = 12;
config.maxWorkers = 30;

//config.output = fs.createWriteStream('output.log')

tileReduce(config)
.on('reduce', function() {
//
})
.on('end', function() {
    console.error("DONE")
});