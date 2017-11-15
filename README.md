OSM Density
======

Visualizing the sheer density of OpenStreetMap around the world.

More of an art project than anything, this project uses tile-reduce and osm-qa-tiles to create raster maps of the OSM database.

Natural vs. manmade features are denoted by color in the final rendering.


## Running

1. First, install node dependencies

        npm install
        
2. Run `tile-reduce`. (Be sure to modify index.js for bounding box and osm-qa-tile locations.

        node index.js > output.log
        
3. Use [Eric Fischer's `datamaps`](http://github.com/ericfischer/datamaps) to create a datamaps file from the output and render

        cat output.log | encode -m8 -o result.dm
        
   Render with:
   
        render -A -C360 -- result.dm 4 4 -158 62 -47 > result.png

   Be sure to check out [`datamaps`](http://github.com/ericfischer/datamaps) to tweak command line arguments... it likely won't look good the first time.
   
### Acknowledgements
This is inspired by [Martin Raifer's `osm-node-density`](https://github.com/tyrasd/osm-node-density) work. 