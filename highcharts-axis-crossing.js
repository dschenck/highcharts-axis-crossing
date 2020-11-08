/**
 * Author: David Schenck
 * Last updated 2020-11-08
 *
 * Description
 * Highcharts plugin for axis crossing at specific value
 * 
 * Note
 * Unlike this plugin (https://github.com/highcharts/crossing-specific-value), 
 * you do not need to set opposite:true
 */
 
 (function(H) {
    H.wrap(H.Axis.prototype, 'render', function(proceed) {
        if (typeof this.options.crossing === 'number') {
            var other = this.chart[this.isXAxis ? 'yAxis' : 'xAxis'][0];
            this.offset = other.toPixels(this.options.crossing, true);
            this.opposite = this.isXAxis ? true : false;
        }
        proceed.call(this);
    });
}(Highcharts));
