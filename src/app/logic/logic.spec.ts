import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logic } from './logic';

describe('Logic', () => {
  let component: Logic;
  let fixture: ComponentFixture<Logic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Logic],
    }).compileComponents();

    fixture = TestBed.createComponent(Logic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
