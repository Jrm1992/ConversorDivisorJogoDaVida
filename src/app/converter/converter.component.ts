import { Component, OnInit } from '@angular/core';

interface IMap {
  [key: string ]: number;
  M: number;
  CM: number;
  D: number;
  CD: number;
  C: number;
  XC: number;
  L: number;
  XL: number;
  X: number;
  IX: number;
  V: number;
  IV: number;
  I: number;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})

export class ConverterComponent implements OnInit {

  roman!: string ;
  integer!: number;
  RomanError: boolean = false;
  IntegerError: boolean = false;

  map: IMap = {
    M:  1000,
    CM: 900,
    D:  500,
    CD: 400,
    C:  100,
    XC: 90,
    L:  50,
    XL: 40,
    X:  10,
    IX: 9,
    V:  5,
    IV: 4,
    I:  1,
  };

  constructor() {}

  ngOnInit(): void {}

  romanToInteger() {
    let result = 0;

    let roman = this.roman

    if (!!roman && roman.toUpperCase().match('^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$')) {
      for (let i = 0; i < roman.length; i++) {
        if (this.map[roman[i]] < this.map[roman[i + 1]]) {
          result -= this.map[roman[i]];
        } else {
          result += this.map[roman[i]];
        }
      }
      this.RomanError = false
      this.integer = result
    }else{
      this.RomanError = true
    }
  }

  integerToRoman(){
    let result = '';
    let _integer_ = this.integer

    if(_integer_ > 0 && _integer_ < 3999){
      for (let i in this.map) {
        result += i.repeat(Math.floor(_integer_ / this.map[i]));
        _integer_ %= this.map[i];
      }
      this.IntegerError = false
      this.roman = result
    }else{
      this.IntegerError = true
    }
  }
}
