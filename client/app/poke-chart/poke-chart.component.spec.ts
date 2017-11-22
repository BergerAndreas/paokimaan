import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeChartComponent } from './poke-chart.component';

describe('PokeChartComponent', () => {
  let component: PokeChartComponent;
  let fixture: ComponentFixture<PokeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
