import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
let component: AppComponent;
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        DataTableModule,
        HttpClientModule
      ],
      providers: [
        AppService,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect(component).toBeDefined();
  }));

  it('should call searchResults to notify user message', () => {
    component.searchText = 'al';
    component.notifyMessage = 'hello';
    component.searchResults();
    expect(component.notifyMessage).toBe('Please provide atleast 3 chars to search');
  });

  it('should call searchResults to notify user message', () => {
    component.searchText = 'alias';
    component.notifyMessage = 'hello';
    const result = {
      name: 'siva', email: 'abc@gmail.com', body: 'about sivag'
    };
    const spy = spyOn(AppService.prototype, 'getSearchResults').and.returnValue(of(result));
    component.searchResults();
    expect(spy).toHaveBeenCalled();
  });
  it('should call searchResults to notify user message', () => {
    component.searchText = 'alias';
    component.notifyMessage = 'hello';
    const spy = spyOn(AppService.prototype, 'getSearchResults').and.returnValue(throwError('error received'));
    component.searchResults();
    expect(spy).toHaveBeenCalled();
  });
});
