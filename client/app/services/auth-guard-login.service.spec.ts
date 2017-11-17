import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardLogin } from './auth-guard-login.service';
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { HttpModule } from "@angular/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthGuardLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardLogin, AuthService, UserService ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpModule, RouterTestingModule ],
      declarations: []
    });
  });

  it('should be created', inject([AuthGuardLogin], (service: AuthGuardLogin) => {
    expect(service).toBeTruthy();
  }));
});
