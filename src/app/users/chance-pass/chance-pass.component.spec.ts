import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChancePassComponent } from './chance-pass.component';

describe('ChancePassComponent', () => {
  let component: ChancePassComponent;
  let fixture: ComponentFixture<ChancePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChancePassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChancePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
