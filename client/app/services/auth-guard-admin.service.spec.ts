import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { HttpModule } from "@angular/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthGuardAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardAdmin, AuthService, UserService ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpModule, RouterTestingModule ],
      declarations: []
    });
  });

  it('should be created', inject([AuthGuardAdmin], (service: AuthGuardAdmin) => {
    expect(service).toBeTruthy();
  }));
});
