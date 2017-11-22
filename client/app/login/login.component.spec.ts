import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ AuthService, UserService ],
      imports: [ HttpModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Login" in h2', () => {
    const el = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(el.textContent).toContain('Login');
  });
});
