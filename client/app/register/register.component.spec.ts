import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import {ReactiveFormsModule, FormsModule, FormControl} from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
import { ToastComponent } from "../shared/toast/toast.component";
import { UserService } from "../services/user.service";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, HttpModule ],
      providers: [ ToastComponent, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.role = new FormControl('user');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
