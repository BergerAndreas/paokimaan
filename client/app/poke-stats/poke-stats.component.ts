import { Component, OnInit, ElementRef, NgZone, OnDestroy, Input } from '@angular/core';

import { D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

@Component({
  selector: 'app-poke-stats',
  template: '<svg></svg>'
})

export class PokeStatsComponent implements OnInit {
  // D3
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  @Input() pokemonStats: object;

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;

  }

  ngOnInit() {
    // Set D3
    const d3 = this.d3;
    let svg: any;
    let colors: any = [];
    const data: {name: string, yVal: number}[] = [];
    const padding = 25;
    const width = 500;
    const height = 150;
    let xScale: any;
    let yScale: any;
    let xAxis: any;
    let yAxis: any;

    if (this.parentNativeElement !== null) {
      svg = d3.select(this.parentNativeElement)
        .append('svg')        // create an <svg> element
        .attr('width', width) // set its dimensions
        .attr('height', height);

      // Colors for each bar
      colors = ['red', 'yellow', 'green', 'blue', 'pink', 'steelblue'];

      // Load data into the barchart
      for (const stat in this.pokemonStats['element']['stats']) {
        if (this.pokemonStats['element']['stats'].hasOwnProperty(stat)) {
          data.push({name : stat,
                     yVal : this.pokemonStats['element']['stats'][stat]});
        }
      }

      xScale = d3.scaleBand()
        .domain(data.map(function (d) {
          return d.name;
        }))
        .range([0, 350]);

      yScale = d3.scaleLinear()
        .domain([0, 200])
        .range([100, 0]);

      xAxis = d3.axisBottom(xScale) // d3.js v.4
        .scale(xScale);

      yAxis = d3.axisLeft(xScale) // d3.js v.4
        .scale(yScale)
        .ticks(7);

      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (padding) + ',' + padding + ')')
        .call(yAxis);

      svg.append('g')            // create a <g> element
        .attr('class', 'axis')   // specify classes
        .attr('transform', 'translate(' + padding + ',' + (height - padding) + ')')
        .call(xAxis);            // let the axis do its thing

      const rects = svg.selectAll('rect')
        .data(data);
      rects.size();

      const newRects = rects.enter();

      newRects.append('rect')
        .attr('x', function (d, i) {
          return xScale(d.name) - 5;
        })
        .attr('y', function (d) {
          return yScale(d.yVal);
        })
        .attr('transform', 'translate(' + (padding - 5 + 25) + ',' + (padding - 5) + ')')
        .attr('height', function (d) {
          return height - yScale(d.yVal) - (2 * padding) + 5;
        })
        .attr('width', 30)
        .attr('fill', function (d, i) {
          return colors[i];
        });
    }
  }

}
