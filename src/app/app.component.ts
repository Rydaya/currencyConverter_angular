import {Component} from '@angular/core';
import {CurrencyService} from "./currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public title: string = 'Currency Converter';

  public baseCurrency: string = 'UAH';
  public convertedCurrency: string = 'USD';

  public baseCurrencyCount: string | number = 1;
  public convertedCurrencyCount: string | number = 1;
  public currencyResult: any;
  public chart: any;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void { //метод который вызывается после инициализации экземпляра класса
    this.convert(this.convertedCurrency, this.baseCurrency, this.baseCurrencyCount); //чтобы был изначальный пересчет
  }

  convert(baseCurrency: string, convertedCurrency: string, baseCurrencyCount: string | number): void {
    this.currencyService.getCurrency(baseCurrency, convertedCurrency).subscribe(data => { //subscribe - что то вроде then
      let jsonData = JSON.stringify(data); //получаю data => в строку
      jsonData = JSON.parse(jsonData).rates; // получаю отношение валюты к валюте
      this.currencyResult = +Object.values(jsonData)[0]; //перу по первому ключу значение из rates

      this.changeBaseCurrencyCount(baseCurrencyCount) //ставлю в ноль счетчики валют после изменения основной/конвертируемой валюты
    });
  }

  changeBaseCurrencyCount(value: any): void {
    let result = value * this.currencyResult;
    this.convertedCurrencyCount = result == 0 ? 0 : result.toFixed(2);
  }

  changeConvertedCurrencyCount(value: any): void {
    let result = value / this.currencyResult;
    this.baseCurrencyCount = result == 0 ? 0 : result.toFixed(2);
  }
}
