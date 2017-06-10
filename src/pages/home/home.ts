import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudokiService } from '../../providers/cloudoki-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  docs: any;
  totals: any;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController, public restapiService: CloudokiService) {
    // Totals
    this.getAccountTotals(1);

    // Due invoices
    this.getDueInvoices();
  }

  refreshAccounts(event) {
    this.isLoading = true;
    this.restapiService.refreshAccounts()
      .then(data => {
        this.isLoading = false;

        if(data.update)
         {
           this.getAccountTotals(1);
           this.getDueInvoices();
        }

    });
  }

  // getAccountDocuments(id, filters) {
  //   this.restapiService.getAccountDocuments(id, filters)
  //     .then(data => {
  //       this.docs = data;
  //
  //       // parse meta
  //       this.docs.forEach(function(el){
  //           if(typeof el.meta == 'string') el.meta = JSON.parse(el.meta)
  //       });
  //   });
  // }

  getDueInvoices() {
    this.restapiService.getInvoices()
      .then(data => {
        this.docs = [];

        // parse due & meta
        data.forEach(function(el){
            el.tags.forEach(function(tag){
              if(tag.slug=="due") this.docs.push(el);
            }.bind(this))

            if(typeof el.meta == 'string') el.meta = JSON.parse(el.meta)
        }.bind(this));
    });
  }

  getAccountTotals(id) {
    this.restapiService.getAccountTotals(id)
      .then(data => {
        this.totals = data;
    });
  }

}
