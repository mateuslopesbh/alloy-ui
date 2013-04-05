/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("recordset-sort",function(e,t){function i(e,t,n){i.superclass.constructor.apply(this,arguments)}var n=e.ArraySort.compare,r=e.Lang.isValue;e.mix(i,{NS:"sort",NAME:"recordsetSort",ATTRS:{lastSortProperties:{value:{field:undefined,desc:!0,sorter:undefined},validator:function(e){return r(e.field)&&r(e.desc)&&r(e.sorter)}},defaultSorter:{value:function(e,t,r,i){var s=n(e.getValue(r),t.getValue(r),i);return s===0?n(e.get("id"),t.get("id"),i):s}},isSorted:{value:!1}}}),e.extend(i,e.Plugin.Base,{initializer:function(t){var n=this,r=this.get("host");this.publish("sort",{defaultFn:e.bind("_defSortFn",this)}),this.on("sort",function(){n.set("isSorted",!0)}),this.onHostEvent("add",function(){n.set("isSorted",!1)},r),this.onHostEvent("update",function(){n.set("isSorted",!1)},r)},destructor:function(e){},_defSortFn:function(e){this.get("host")._items.sort(function(t,n){return e.sorter(t,n,e.field,e.desc)}),this.set("lastSortProperties",e)},sort:function(e,t,n){this.fire("sort",{field:e,desc:t,sorter:n||this.get("defaultSorter")})},resort:function(){var e=this.get("lastSortProperties");this.fire("sort",{field:e.field,desc:e.desc,sorter:e.sorter||this.get("defaultSorter")})},reverse:function(){this.get("host")._items.reverse()},flip:function(){var e=this.get("lastSortProperties");r(e.field)&&this.fire("sort",{field:e.field,desc:!e.desc,sorter:e.sorter||this.get("defaultSorter")})}}),e.namespace("Plugin").RecordsetSort=i},"3.7.3",{requires:["arraysort","recordset-base","plugin"]});
