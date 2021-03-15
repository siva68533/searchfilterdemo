import { Component } from '@angular/core';
import { AppService } from './app.service';
import { AppMessages } from './app.messages';
import * as Appconstants from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchText = '';
  public results: any;
  public messages = AppMessages;
  public notifyMessage = this.messages.TEXT_FIELD_INFO;
  public noResultText = this.messages.NO_RESULT_INFO;
  public textPlaceHolder = this.messages.TEXT_FIELD_PLACEHOLDER;
  public loading = true;
  public constants = Appconstants;
  public inputSearchLimit = this.constants.MIN_LENGTH_SEARCH;
  public errorMsg = '';

  constructor(private readonly appService: AppService) {

  }
  public searchResults(): void {
    this.loading = true;
    this.results = [];
    this.errorMsg = '';
    if (this.searchText && this.searchText.length > this.constants.MIN_LENGTH_SEARCH) {
      this.notifyMessage = '';
      this.appService.getSearchResults(this.searchText).subscribe((response) => {
        console.log('response received');
        console.log(response);
        this.results = response;
        this.loading = false;
      },
        (error) => {
          console.log('error received');
          console.log(error);
          this.errorMsg = this.messages.ERROR_INFO;
          this.loading = false;
        });
    } else {
      this.notifyMessage = this.messages.TEXT_FIELD_INFO;
      this.loading = false;
    }
  }
}
