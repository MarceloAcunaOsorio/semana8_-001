import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReebokComponent } from './reebok.component';

describe('ReebokComponent', () => {
  let component: ReebokComponent;
  let fixture: ComponentFixture<ReebokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReebokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReebokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
