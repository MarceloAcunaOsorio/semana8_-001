import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdidasComponent } from './adidas.component';

describe('AdidasComponent', () => {
  let component: AdidasComponent;
  let fixture: ComponentFixture<AdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
