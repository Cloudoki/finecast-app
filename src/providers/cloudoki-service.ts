import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CloudokiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CloudokiService {
  totals: any;
  accounts: any;
  documents: any;
  invoices: any;
  expenditures: any;
  refresh: any;
  apiUrl = 'http://localhost:5000/v1';

  constructor(public http: Http) {
    console.log('Hello CloudokiService Provider');
  }

  getAccounts() {
    if (this.accounts) {
      return Promise.resolve(this.accounts);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/accounts')
      .map(res => res.json())
      .subscribe(data => {
        this.accounts = data;
        resolve(this.accounts);
      });
    });
  }

  getInvoices() {
    if (this.invoices) {
      return Promise.resolve(this.invoices);
    }

    return new Promise(resolve => {

      var url = this.apiUrl
      url += '/accounts/1/documents?tags=invoice&exclude=paid';

      this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.invoices = data;
        resolve(this.invoices);
      });
    });
  }

  getExpenditures(id) {
    if (this.expenditures) {
      return Promise.resolve(this.expenditures);
    }

    return new Promise(resolve => {

      var url = this.apiUrl + (id? '/accounts/' + id: null);
      url += '/documents?tags=bill,expense,payroll&exclude=paid';

      this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.expenditures = data;
        resolve(this.expenditures);
      });
    });
  }

  getAccountDocuments(id, filters) {
    if (this.documents) {
      return Promise.resolve(this.documents);
    }

    return new Promise(resolve => {

      var url = this.apiUrl
      url += id? '/accounts/' + id + '/documents': '/documents';
      if(filters) url += '?' + filters;

      this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.documents = data;
        resolve(this.documents);
      });
    });
  }

  getAccountTotals(id) {
    if (this.totals) {
      return Promise.resolve(this.totals);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/accounts/' + id + '/totals')
      .map(res => res.json())
      .subscribe(data => {
        this.totals = data;
        resolve(this.totals);
      });
    });
  }

  refreshAccounts() {
    if (this.refresh) {
      return Promise.resolve(this.refresh);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/accounts/refresh')
      .map(res => res.json())
      .subscribe(data => {
        this.refresh = data;
        resolve(this.refresh);
      });
    });
  }
}
