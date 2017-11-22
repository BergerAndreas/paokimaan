import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { LogoutComponent } from './logout.component';
import { UserService } from "../services/user.service";
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from '@angular/router/testing';


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: AuthService;
  let authServiceStub: {
    loggedIn: boolean,
    logout: any
  };

  beforeEach(async(() => {

    authServiceStub = {
      loggedIn: true,
      logout: (function() {
        this.loggedIn = false;
      })
    };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [ LogoutComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ AuthService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', () => {
    authService.loggedIn = true;
    expect(authService.loggedIn).toBeTruthy();
    authService.logout();
    expect(authService.loggedIn).toBeFalsy();
  });

});
