import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionGeneralComponent } from './descripcion-general.component';

describe('DescripcionGeneralComponent', () => {
  let component: DescripcionGeneralComponent;
  let fixture: ComponentFixture<DescripcionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
