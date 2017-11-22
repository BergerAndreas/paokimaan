import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [ HttpModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
