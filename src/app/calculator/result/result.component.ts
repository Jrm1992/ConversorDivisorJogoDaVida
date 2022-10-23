import { ICustomerList } from './../form/form.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(private router: Router) { }

  nav = this.router.getCurrentNavigation();
  customerList: ICustomerList | any = this.nav?.extras.state

  ngOnInit(): void {
    this.handleGetTotal()
  }

  handleGetTotal(){
    this.customerList.map((customer: ICustomerList) => {
      let customerTotal = 0
      customer.items.map(item => {
        customerTotal += item.price
      })
    if(customer.customerTip){
      customerTotal *= 1.1
    }
    customer.customerTotal = customerTotal
    })
  }

  handleNewCalc(){
    this.router.navigate(['/calculadora'])
  }
}

