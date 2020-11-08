/**
 * Author: David Schenck
 * Last updated 2020-11-08
 *
 * Description
 * Highcharts plugin for axis crossing at specific value
 * 
 * Note
 * Unlike this plugin (https://github.com/highcharts/crossing-specific-value), 
 * you do not need to set opposite:true on the X-axis
 * and the labels and axis title should be moved outside
 * of the plotting area.
 */
 
 (function(H) {
    H.wrap(H.Axis.prototype, 'render', function(proceed) {
        if (typeof this.options.crossing === 'number') {
            var other   = this.chart[this.isXAxis ? 'yAxis' : 'xAxis'][0];
            this.offset = other.toPixels(this.options.crossing, true); 
            
            //get the extremes to position labels
            var extremes = other.getExtremes()
            var reverse = other.toPixels(extremes.min, true) - other.toPixels(this.options.crossing, true)

            if(this.isXAxis){
                this.offset += this.isXAxis ? 1 : 0; //render bugfix shift x axis by 1px 
                this.opposite = this.isXAxis ? true : false;
                this.options.labels.y = reverse + 15
                this.options.title.y  = reverse + 55
            }
            else{
                this.options.labels.x = reverse - 5
                this.options.title.x  = reverse - 5
            }
        }
        proceed.call(this);
    });
}(Highcharts));
