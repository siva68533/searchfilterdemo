/**
 * Copyright 2018 Dell Inc. or its subsidiaries. All Rights Reserved
 */
 import { HttpErrorResponse } from '@angular/common/http';
 import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
 import { async, TestBed} from '@angular/core/testing';
import { AppService } from './app.service';

 describe('AppService', () => {
     let appService: AppService;
     let httpMock: HttpTestingController;

     beforeEach(async(() => {
         TestBed.configureTestingModule({
             imports: [HttpClientTestingModule],
             providers: [ HttpClientTestingModule  , AppService],
         });
         appService = TestBed.get(AppService);
         httpMock = TestBed.get(HttpTestingController);
     }));

     afterEach(() => {
         httpMock.verify();
     });

     it('should define AppService', () => {
         expect(appService).toBeDefined();
     });

     it('should return observable with content', () => {
        const filterText = 'mytext';
         const url = `https://jsonplaceholder.typicode.com/comments?q=${filterText}`;
         const mockData = { name: 'ABC' , email: 'abc@gmail.com', body: 'hello' };
         appService.getSearchResults(filterText).subscribe((result) => {
           expect(result).toBeDefined();
         });
         const req = httpMock.expectOne(url);
         expect(req.request.method).toBe('GET');
         expect(req.request.url).toEqual(url);
         req.flush(mockData);
     });

     it('should throw error while collecting data', () => {
        const filterText = 'mytext';
        const url = `https://jsonplaceholder.typicode.com/comments?q=${filterText}`;
        const errorMsg = 'ERROR';
        appService.getSearchResults(filterText).subscribe(() => {  },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(errorMsg, 'message');
        });
        const req = httpMock.expectOne(url);
        req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
    });


 });

