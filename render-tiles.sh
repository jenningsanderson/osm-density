~/opt/datamaps/enumerate -Z11 -z13 planet2.dm | xargs -L1 -P14 ~/opt/datamaps/render \
 -C360 -x s1 -x u -T512 -t0 -G0.25 -o /data/www/jennings/tileserver/osm-density.tiles
