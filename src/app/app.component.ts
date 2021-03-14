import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchText = '';
  public results: any;
  public notifyMessage = 'Please provide atleast 3 chars to search';
  public noResultText = 'No results found';

  constructor(private readonly appService: AppService) {

  }
  public searchResults(): void {
    if (this.searchText && this.searchText.length > 3) {
      this.notifyMessage = '';
      this.appService.getSearchResults(this.searchText).subscribe((response) => {
        console.log('response received');
        console.log(response);
        this.results = response;
      },
        (error) => {
          console.log('error received');
          console.log(error);
        });
    } else {
      this.notifyMessage = 'Please provide atleast 3 chars to search';
    }
  }
}
