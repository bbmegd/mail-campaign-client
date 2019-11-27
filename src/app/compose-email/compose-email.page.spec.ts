import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComposeEmailPage } from './compose-email.page';

describe('ComposeEmailPage', () => {
  let component: ComposeEmailPage;
  let fixture: ComponentFixture<ComposeEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComposeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
