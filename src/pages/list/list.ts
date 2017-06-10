import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CloudokiService } from '../../providers/cloudoki-service';
import * as moment from 'moment';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  channel: string = "invoices";
  invoices: any[];
  outs_be: any[];
  outs_lx: any[];
  separdates: Array<Date>;
  selectedItem: any;
  icons: string[];
  items: any; //Array<{title: string, note: string, icon: string}>;
  dayshift: object = [1,0,2,1,0,3,2];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: CloudokiService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // All invoices
    this.getInvoices();

    // All Expenditures
    this.outs_be = [];
    this.outs_lx = [];
    this.getExpenditures(1);
    this.getExpenditures(2);
  }

  getInvoices() {
    this.restapiService.getInvoices()
      .then(data => {

        // parse meta
        data.forEach(function(el){
            if(typeof el.meta == 'string') el.meta = JSON.parse(el.meta)

            // coloring
            el.badgecolor = "primary";
            el.tags.forEach(function(tag){
              if(tag.slug == "due") el.badgecolor = "danger";
              else if(tag.slug == "draft") el.badgecolor = "light";
            })
        });

        this.invoices = this.sortVisibles(data);
        this.setSeparators(this.invoices[this.invoices.length-1].planned);
    });
  }

  getExpenditures(id) {
    this.restapiService.getExpenditures(id)
      .then(data => {

        data.forEach(function(item){
          if(typeof item.meta == 'string') item.meta = JSON.parse(item.meta)

          if(id == 1)      this.outs_be.push(item);
          else if(id == 2) this.outs_lx.push(item);
        }.bind(this))

        if(id == 1)      this.outs_be = this.sortVisibles(this.outs_be);
        else if(id == 2) this.outs_lx = this.sortVisibles(this.outs_lx);
    });
  }

  sortVisibles(list) {
    list.forEach(function(el){
      var origdt = new Date(el.meta.payable_at? el.meta.payable_at: el.meta.due_at); // el.meta.paid_at? el.meta.paid_at: (el.meta.payable_at? el.meta.payable_at: el.meta.due_at)

      el.planned = this.dateFunc(origdt, this.dayshift[origdt.getDay()]);
    }.bind(this));

    return list.sort(function(a, b) { return a.planned - b.planned });
  }

  setSeparators(end) {
    this.separdates = [];

    var tm = this.dateFunc(null, -7);
    while (tm < end){
      var dte = new Date(this.dateFunc(tm, 1));
      tm = dte.getTime();

      if(dte.getDay() == 1 || dte.getDay() == 4) this.separdates.push(dte);
    }
  }

  dateFunc(init, diff) {
    var dt = init? new Date(init): new Date()

    if(diff) dt.setDate(dt.getDate() + diff)
    dt.setHours(12,0,0,0)

    return dt.getTime();
  }

  reorderItems(indexes, items) {
    //let element = items[indexes.from];
    //items.splice(indexes.from, 1);
    //items.splice(indexes.to, 0, element);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
