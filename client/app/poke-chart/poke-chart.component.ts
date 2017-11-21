import { Component, OnInit, ElementRef } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { D3Service, D3,
         Selection,
         Transition,
         ScaleOrdinal
        } from 'd3-ng2-service';

@Component({
  selector: 'app-poke-chart',
  templateUrl: './poke-chart.component.html',
})
export class PokeChartComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  private pokeColor: object;
  pokeTypeList: string[];

  pokeTypes: object[];

  constructor(element: ElementRef, private pokemonService: PokemonService, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.pokeColor = {
      fire: '#FF9933',
      water: '#0D00F2',
      grass: '#0DFA03',
      bug: '#CFFA33',
      poison: '#9C3D94',
      psychic: '#FF33CC',
      dark: '#322f32',
      ghost: '#660066',
      dragon: '#CC99FF',
      flying: '#9EC2F2',
      fighting: '#b30000',
      normal: '#D3D3D3',
      fairy: '#FFCCFF',
      steel: '#D9D9D9',
      rock: '#FFB366',
      ground: '#FFD9B3',
      electric: '#FFFF00',
      ice: '#00FFFF',
    };
    this.pokeTypeList = ['fire', 'water', 'grass', 'bug', 'poison', 'psychic', 'dark', 'ghost', 'dragon', 'flying',
                         'fighting', 'normal', 'fairy', 'steel', 'rock', 'steel', 'rock', 'ground', 'electric', 'ice'];
    this.pokeTypes = [];
  }

  getPokemon(inputType) {
    this.pokemonService.getPokeType(inputType).subscribe(
      data => {
        data.forEach(item => {
          return item.type.sort();
        });
        data.reduce((sums, entry) => {
          sums[entry.type] = (sums[entry.type] || 0) + 1;
          return sums;
        });
        // Sure, we don't need these
        delete data[0]._id;
        delete data[0].type;
        const rows: {type: string, value: number}[] = [];

        const values = [];
        const labels = [];

        for (const item in data[0]) {
          if (data[0].hasOwnProperty(item)) {
            rows.push({
              type: item,
              value: data[0][item]
            });
            values.push(data[0][item]);
            labels.push(item);
          }
        }
        rows[0].value ++; // Don't worry about it
        values[0] ++;

        this.pokeTypes = rows;

        const colour = [];

        for (let i = 0; i < labels.length; i++ ) {
          let keys = labels[i].split(',');
          if (keys.length === 1) {
            colour.push(this.pokeColor[keys[0]]);
          } else {
            colour.push(this.mixColor(
              this.pokeColor[keys[0]],
              this.pokeColor[keys[1]], 0.5)
            );
          }
        }
        // Draw Piechart
        const d3 = this.d3;

        // Remove old SVG-element
        d3.select("#pieChart").remove();

        const width = 400,
              height = 400,
              radius = Math.min(width, height) / 2;

        const arc = d3.arc<Datum>()
          .outerRadius(radius - 10)
          .innerRadius(0);

        const labelArc = d3.arc<Datum>()
          .outerRadius(radius - 80)
          .innerRadius(radius - 80);

        const pie = d3.pie<Datum>()
          .sort(null)
          .value((d: Datum): number => d.value);

        const svg = d3.select('#piechart-container').append('svg')
          .attr('id', 'pieChart')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const g = svg.selectAll('.arc')
          .data(pie(rows))
          .enter().append('g')
          .attr('class', 'arc');

        g.append('path')
          .attr('d', <any>arc)
          .style('fill', function (d, i) {
            return colour[i];
          });

        g.append('text')
          .attr("transform", function(d: any) {
            return "translate(" + labelArc.centroid(d) + ")";
          })
          .attr('dy', '.35em')
          .text(function (d) {
            return d.value;
          });
      },
      err => console.log(err)
    );
  }

  mixColor (color1: string, color2: string, percentage: number) {

    const rgbColor1 = [ parseInt(color1[1] + color1[2], 16),
                        parseInt(color1[3] + color1[4], 16),
                        parseInt(color1[5] + color1[6], 16)];

    const rbgColor2 = [ parseInt(color2[1] + color2[2], 16),
                        parseInt(color2[3] + color2[4], 16),
                        parseInt(color2[5] + color2[6], 16)];

    const rgbColor3 = [
      (1 - percentage) * rgbColor1[0] + percentage * rbgColor2[0],
      (1 - percentage) * rgbColor1[1] + percentage * rbgColor2[1],
      (1 - percentage) * rgbColor1[2] + percentage * rbgColor2[2]
    ];
    return '#' + this.int_to_hex(rgbColor3[0])
               + this.int_to_hex(rgbColor3[1])
               + this.int_to_hex(rgbColor3[2]);
  }

   int_to_hex (num: number) {
    let hex = Math.round(num).toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    return hex;
  }
}

export interface Datum {
  type: string;
  value: number;
}
