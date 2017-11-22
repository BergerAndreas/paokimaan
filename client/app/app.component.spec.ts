import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('Component: App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let authServiceStub: {
    loggedIn: boolean,
    isAdmin: boolean,
    currentUser: any
  };

  beforeEach(async(() => {
    authServiceStub = {
      loggedIn: false,
      isAdmin: false,
      currentUser: { username: 'Tester' }
    };
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ { provide: AuthService, useValue: authServiceStub } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      authService = fixture.debugElement.injector.get(AuthService);
      fixture.detectChanges();
    });
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should display the navigation bar correctly for guests', () => {
    const de = fixture.debugElement.queryAll(By.css('button'));
    const de2 = fixture.debugElement.queryAll(By.css('span'));
    expect(de.length).toBe(4);
    expect(de2.length).toBe(2);

    expect(de[0].nativeElement.textContent).toContain('accessible PAOKIMÅN');
    expect(de[1].nativeElement.textContent).toContain('donut_smallPokeChart');
    expect(de[2].nativeElement.textContent).toContain('airline_seat_flat_angled Login');
    expect(de[3].nativeElement.textContent).toContain('weekend Register');

    expect(de[0].properties['routerLink'][0]).toBe('/');
    expect(de[1].properties['routerLink'][0]).toBe('/chart');
    expect(de[2].properties['routerLink'][0]).toBe('/login');
    expect(de[3].properties['routerLink'][0]).toBe('/register');
  });

  it('should display the navigation bar correctly for logged users', () => {
    authService.loggedIn = true;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));

    expect(de.length).toBe(4);

    expect(de[0].nativeElement.textContent).toContain('accessible PAOKIMÅN');
    expect(de[1].nativeElement.textContent).toContain('donut_smallPokeChart');
    expect(de[2].nativeElement.textContent).toContain('Account (Tester)');
    expect(de[3].nativeElement.textContent).toContain('Logout');

    expect(de[0].properties['routerLink'][0]).toBe('/');
    expect(de[1].properties['routerLink'][0]).toBe('/chart');
    expect(de[2].properties['routerLink'][0]).toBe('/account');
    expect(de[3].properties['routerLink'][0]).toBe('/logout');
  });

  it('should display the navigation bar correctly for admin users', () => {
    authService.loggedIn = true;
    authService.isAdmin = true;
    fixture.detectChanges();

    const de = fixture.debugElement.queryAll(By.css('button'));
    const de2 = fixture.debugElement.queryAll(By.css('span'));
    expect(de.length).toBe(5);
    expect(de2.length).toBe(2);

    expect(de[0].nativeElement.textContent).toContain('accessible PAOKIMÅN');
    expect(de[1].nativeElement.textContent).toContain('donut_smallPokeChart');
    expect(de[2].nativeElement.textContent).toContain('wc Account (Tester)');
    expect(de[3].nativeElement.textContent).toContain('fitness_center Admin');
    expect(de[4].nativeElement.textContent).toContain('child_care Logout');

    expect(de[0].properties['routerLink'][0]).toBe('/');
    expect(de[1].properties['routerLink'][0]).toBe('/chart');
    expect(de[2].properties['routerLink'][0]).toBe('/account');
    expect(de[3].properties['routerLink'][0]).toBe('/admin');
    expect(de[4].properties['routerLink'][0]).toBe('/logout');
  });

});
