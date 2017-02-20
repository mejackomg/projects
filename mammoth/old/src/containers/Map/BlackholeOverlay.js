'use strict';

var React = require('react');
var ViewportMercator = require('viewport-mercator-project');
var window = require('global/window');
var d3 = require('d3');
var r = require('r-dom');
var Immutable = require('immutable');
var ViewportMercator = require('viewport-mercator-project');

var BlackholeOverlay = React.createClass({

  displayName: 'BlackholeOverlay',

  propTypes: {
    //map: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    //isDragging: React.PropTypes.bool.isRequired,
    renderWhileDragging: React.PropTypes.bool.isRequired,
    globalOpacity: React.PropTypes.number.isRequired,
    /**
      * An Immutable List of feature objects.
      */
    features: React.PropTypes.instanceOf(Immutable.List),
    colorDomain: React.PropTypes.array,
    colorRange: React.PropTypes.array.isRequired,
    //valueAccessor: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      renderWhileDragging: true,
      globalOpacity: 1,
      colorDomain: null,
      colorRange: ['#FFFFFF', '#1FBAD6'],
      //valueAccessor: function valueAccessor(feature) {
      //  return feature.get('properties').get('value');
      //}
    };
  },

  componentDidMount: function componentDidMount() {
    //this._redrawBlackholeOverlay(this.props);

   /* var mercator = ViewportMercator(this.props);

    var file = 'Data/data.tsv';

    var hashSuppliers = {}
      , hashCustomers = {}
      , data = []
      ;
    d3.tsv(file, function (err, rawData) {
      data = parseData(rawData);
    });

    /!* Preparing data *!/
    function makeParent(that, d) {
      that._id = d._id;
      that.latlng = [d.latlng[0], d.latlng[1]];

      that.title = d.title;
      that.sum = 0;
      that.orders = 0;
      that.relations = d3.map({});

      that.x = {
        valueOf: function () {
          var t = mercator.project(that.latlng);
          //var t = visLayer._map.latLngToLayerPoint(that.latlng);
          return t.x;
        }
      };

      that.y = {
        valueOf: function () {
          var t = mercator.project(that.latlng);
          //var t = visLayer._map.latLngToLayerPoint(that.latlng);
          return t.y;
        }
      };

      return that;
    }

    function Customer(d) {
      var that = hashCustomers[d._id] = this;

      return makeParent(that, d);
    }

    function Supplier(d) {
      var that = hashSuppliers[d._id] = this;

      return makeParent(that, d);
    }

    function parseData(d) {
      var supp = [],
        cust = [];
      var parser = d3.time.format("%d.%m.%Y %H:%M").parse;

      d.forEach(function(k, index) {

        var s, c
          , realDate = +(parser(k.datetime))
          ;

        var startDate = realDate - 24 * 60 * 60 * 1000;//stepDate;

        k.supplier = {
          _id : 'from' + k.latitude_from + k.longitude_from,
          latlng : [k.latitude_from, k.longitude_from],
          title : k.label_from
        };

        k.customer = {
          _id : 'to' + k.latitude_to + k.longitude_to,
          latlng : [k.latitude_to, k.longitude_to]
        };

        s = hashSuppliers[k.supplier._id] || new Supplier(k.supplier);
        c = hashCustomers[k.customer._id] || new Customer(k.customer);

        k.price = parseFloat(k.price);

        function price() {
          return k.price;
        }

        s.sum += k.price;
        s.orders++;

        c.sum += k.price;
        c.orders++;

        supp.push({
          _id: index,
          date: startDate,
          parent : s,
          type: k.type,
          label : k.label_trend,
          valueOf: price
        });

        cust.push({
          _id: index,
          date: realDate,
          parent : c,
          type: k.type,
          label : k.label_trend,
          valueOf: price
        });
      });

      supp.sort(function(a, b) {
        return a.date - b.date;
      });
      cust.sort(function(a, b) {
        return a.date - b.date;
      });
      return supp.concat(cust);
    };


    var hashDate = d3.set(data.map(function (d) {
        return d.date;
      })).values()
      , leftHashBound = 0
      , parentMarker = {}
      , curPos = 0
      , categoryType = 0
      , dateFormat = d3.time.format("<strong>%H</strong>:<strong>%M</strong>:<strong>%S</strong> <strong>%d</strong>.<strong>%m</strong>.<strong>%Y</strong>");


    this._el = this.refs.overlay;
    this._bh = d3.blackHole(this._el);

    this._bh.setting.skipEmptyDate = false;
    this._bh.setting.createNearParent = true;
    this._bh.setting.zoomAndDrag = false;
    this._bh.setting.drawParent = false;
    this._bh.setting.drawParentImg = false;
    this._bh.setting.drawParentLabel = false;
    this._bh.setting.padding = 0;
    this._bh.setting.childLife =
      this._bh.setting.parentLife = 0;
    //this._bh.setting.increaseChildWhenCreated = true;
    this._bh.setting.blendingLighter = false;
    this._bh.setting.drawAsPlasma = true;
    this._bh.setting.drawTrack = true;

    this._redraw();

    this.start(data);*/
  },

  _redrawBlackholeOverlay: function _redrawBlackholeOverlay(opt) {
    var width = opt.width,
      height = opt.height;

    var n = 100,
      m = 12,
      degrees = 180 / Math.PI;

    var spermatozoa = d3.range(n).map(function() {
      var x = Math.random() * width,
        y = Math.random() * height;
      return {
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        path: d3.range(m).map(function() { return [x, y]; }),
        count: 0
      };
    });
    this._el = this.refs.overlay;
    //var svg = d3.select(this.props.map._getMap().getCanvas())//
    var svg = d3.select(this._el)//.append("svg")
      .attr("width", width)
      .attr("height", height);

    var g = svg.selectAll("g")
      .data(spermatozoa)
      .enter().append("g");

    var head = g.append("ellipse")
      .attr("rx", 6.5)
      .attr("ry", 4);

    g.append("path")
      .datum(function(d) { return d.path.slice(0, 3); })
      .attr("class", "mid");

    g.append("path")
      .datum(function(d) { return d.path; })
      .attr("class", "tail");

    var tail = g.selectAll("path");

    d3.timer(function() {
      for (var i = -1; ++i < n;) {
        var spermatozoon = spermatozoa[i],
          path = spermatozoon.path,
          dx = spermatozoon.vx,
          dy = spermatozoon.vy,
          x = path[0][0] += dx,
          y = path[0][1] += dy,
          speed = Math.sqrt(dx * dx + dy * dy),
          count = speed * 10,
          k1 = -5 - speed / 3;

        // Bounce off the walls.
        if (x < 0 || x > width) spermatozoon.vx *= -1;
        if (y < 0 || y > height) spermatozoon.vy *= -1;

        // Swim!
        for (var j = 0; ++j < m;) {
          var vx = x - path[j][0],
            vy = y - path[j][1],
            k2 = Math.sin(((spermatozoon.count += count) + j * 3) / 300) / speed;
          path[j][0] = (x += dx / speed * k1) - dy * k2;
          path[j][1] = (y += dy / speed * k1) + dx * k2;
          speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
        }
      }

      head.attr("transform", headTransform);
      tail.attr("d", tailPath);
    });

    function headTransform(d) {
      return "translate(" + d.path[0] + ")rotate(" + Math.atan2(d.vy, d.vx) * degrees + ")";
    }

    function tailPath(d) {
      return "M" + d.join("L");
    }
  },


  componentDidUpdate: function componentDidUpdate() {
    //this._redraw();
  },


  _redraw: function _redraw() {
    this._resize();

    //var topLeft = this.props.map.getBounds().ne; //this._map.containerPointToLayerPoint([0, 0]);

    var arr = [0, 0];

    //var t3d = 'translate3d(' + topLeft.x + 'px, ' + topLeft.y + 'px, 0px)';
    var t3d = 'translate3d(0px, 0px, 0px)';

    this._bh.style({
      "-webkit-transform" : t3d,
      "-moz-transform" : t3d,
      "-ms-transform" : t3d,
      "-o-transform" : t3d,
      "transform" : t3d
    });
    this._bh.translate(arr);
  },

  _resize : function() {
    this._bh.size([this.props.width, this.props.height]);
  },

  start : function(data) {
    this._bh &&
    this._bh.start(data, this.props.width, this.props.height);
    return this;
  },


  render: function render() {
    var pixelRatio = window.devicePixelRatio || 1;
    return r.svg({
      ref: 'overlay',
      width: this.props.width ,//* pixelRatio,
      height: this.props.height,// * pixelRatio,
      style: {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        position: 'absolute',
        pointerEvents: 'none',
        //opacity: this.props.globalOpacity,
        left: 0,
        top: 0
      }
    });
  }
});

module.exports = BlackholeOverlay;
