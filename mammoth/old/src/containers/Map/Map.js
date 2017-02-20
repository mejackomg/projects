'use strict';

var document = require('global/document');
var window = require('global/window');
var React = require('react');
var ReactDOM = require('react-dom');
var Immutable = require('immutable');
var r = require('r-dom');
var MapGL = require('./react-map-gl/index');//'react-map-gl');
var HeatmapOverlay = require('./HeatmapOverlay');
var assign = require('object-assign');
//var locations = require('example-cities');
var rasterTileStyle = require('raster-tile-style');
var d3 = require('d3');

var BlackholeOverlay = require('./BlackholeOverlay');

//var tileSource = '//tile.stamen.com/toner/{z}/{x}/{y}.png';
//var mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));

//var markers = {
//  "type": "FeatureCollection",
//  "features": [{
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "theatre"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.038659, 38.931567]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "theatre"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.003168, 38.894651]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "bar"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.090372, 38.881189]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "bicycle"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.052477, 38.943951]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "music"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.031706, 38.914581]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "music"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.020945, 38.878241]
//    }
//  }, {
//    "type": "Feature",
//    "properties": {
//      "marker-symbol": "music"
//    },
//    "geometry": {
//      "type": "Point",
//      "coordinates": [-77.007481, 38.876516]
//    }
//  }]
//};

//function buildStyle(opts) {
//  opts = assign({
//    fill: 'red',
//    stroke: 'blue'
//  }, opts);
//  return Immutable.fromJS(mapStyle);
//}

//var mapStyle = {
//  "version": 8,
//  "name": "Mapbox Streets",
//  "sprite": "mapbox://sprites/mapbox/streets-v8",
//  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
//  "sources":
//    {
//      "mapbox-streets": {
//      "type": "vector",
//      "url": "mapbox://mapbox.mapbox-streets-v7"
//      },
//      "markers": {
//      "type": "geojson",
//      "data": markers
//      }
//    }
//  ,
//  "layers": [
//    {
//      "id": "water",
//      "source": "mapbox-streets",
//      "source-layer": "water",
//      "type": "fill",
//      "paint": {
//        "fill-color": "#00ffff"
//      }
//    },
//    {
//      "id": "music",
//      "type": "symbol",
//      "source": "markers",
//      "layout": {
//        "icon-image": "music-15",
//        "icon-allow-overlap": true
//      },
//      //"filter": ["==", "marker-symbol", "music"]
//    }
//  ]
//}

function color() {
  return 'rgb(' +
    Math.floor(Math.random() * 256) + ', ' +
    Math.floor(Math.random() * 256) + ', ' +
    Math.floor(Math.random() * 256) +
    ')';
}

module.exports = React.createClass({

  displayName: 'MapPage',

  getInitialState: function getInitialState() {
    return {
      viewport: {
        mapboxApiAccessToken:'pk.eyJ1IjoieWtpbmdqIiwiYSI6ImNpamw3cGVkNzAwMjd1b2x4ZTdwZ2F2eGYifQ.CeNgx9vcjo7iFK6GgvaSHg',
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35,
        longitude: 125,
        zoom:3
      },
      gradientColors: Immutable.List([color(), color()]),
      mapStyle:'mapbox://styles/mapbox/dark-v8' //Immutable.fromJS(mapStyle)
    };
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', function onResize() {
      this.setState({
        viewport: assign({}, this.state.viewport, {
          width: window.innerWidth,
          height: window.innerHeight
        })
      });
    }.bind(this));
    //window.setInterval(function setInterval() {
    //  this.setState({gradientColors: Immutable.List([color(), color()])});
    //}.bind(this), 400);
  },

  _onChangeViewport: function _onChangeViewport(viewport) {
    this.setState({viewport: assign({}, this.state.viewport, viewport)});
  },

  render: function render() {
   return r(MapGL, assign({}, this.state.viewport, {
   onChangeViewport: this._onChangeViewport,
   mapStyle: this.state.mapStyle
   }),
   r(HeatmapOverlay, assign({}, this.state.viewport, {
   //locations: locations,
   // Semantic zoom
   //sizeAccessor: function sizeAccessor() {
   //  return 40;
   //},
   // gradientColors: this.state.gradientColors,
   ////Geometric zoom
   //sizeAccessor: function sizeAccessor() {
   //  return 30 * Math.pow(2, this.state.viewport.zoom - 0);
   //}
   })),
   r(BlackholeOverlay, assign({}, this.state.viewport, {
   //redraw: this._redrawBlackholeOverlay,
   })));
   }

});


