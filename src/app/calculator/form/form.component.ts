import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface ICustomerList {
  customerName: string;
  customerTip: boolean;
  customerTotal?: number
  isSelected?: boolean
  items: Array<{
    name: string
    price: number
    amount?: number
  }>
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  repeatedCustomer: boolean = false;
  name: string = '';
  tip: boolean = false;
  customerList: ICustomerList[] = [];
  mensage: string = ''
  item = {
    name: '',
    price: null,
    amount: null
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleStatusMensage(mensage: string, target: string, color: string){
    let element = document.querySelector(`.${target}`) as HTMLElement
    element.style.color = color
    element.innerHTML = mensage
    setTimeout(() => {
      element.innerHTML = ''
    }, 3000)

  }

  handleAddCustomer(f: NgForm) {
    let customerName = f.value.name;
    let customerTip = f.value.tip;

    let findRepeatedCustomer = this.customerList.find(
      (x) => x.customerName.toUpperCase().trim() == customerName.toUpperCase().trim()
    );

    if (!findRepeatedCustomer && !!customerName) {
      this.repeatedCustomer = false
      this.customerList.push({
        customerName,
        customerTip,
        items: []
      });
      this.handleStatusMensage("Cliente adicionado com sucesso!", "CustomerMensage", "green")
      this.name = ''
      this.tip = false
    }else{
      this.repeatedCustomer = true
      this.handleStatusMensage("Este cliente ja esta na lista, por favor, adicione outro", "CustomerMensage", "red")
    }
  }

  handleAddItem(f: NgForm){
    let selected = this.customerList.filter(function(obj) { return obj.isSelected == true; });
    let total = (f.value.price * f.value.amount) / selected.length

    if(selected.length == 0){
      this.handleStatusMensage("Ao menos um cliente precisa ser selecionado", "ItemMensage", "red")
      return
    }

    this.customerList.map(customer => {
      if(customer.isSelected){
        customer.items = [...customer.items, {name: f.value.name, price: total} ]
        this.handleStatusMensage("Item adicionado com sucesso", "ItemMensage", "green")
      }
    })
    this.item.name = ''
    this.item.price = null
    this.item.amount = null
    this.customerList.map(customer => customer.isSelected = false)
  }

  handleGetResult(){
    this.router.navigateByUrl('calculadora/resultado', {state: this.customerList})
  }
}
