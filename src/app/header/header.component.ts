import {Component} from '@angular/core';
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public title: string = 'Currency Converter';
  public baseCurrency: string = 'UAH';
  public convertedCurrency: any = ['USD', 'EUR'];

  public mainCurrencies: any = [];

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getMainCurrencies()
  }

  getMainCurrencies(): void {
    for (const currency of this.convertedCurrency) {
      this.currencyService.getCurrency(currency, this.baseCurrency).subscribe(data => {
        let jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData).rates;
        this.mainCurrencies.push({[currency]: Object.values(jsonData)[0]});
      });
    }
  }

  extractKeyCurrency(value: string): any {
    let jsonData = JSON.stringify(value);
    return Object.keys(JSON.parse(jsonData))[0];
  }

  extractValueCurrency(value: string): any {
    let jsonData = JSON.stringify(value);
    return Number(Object.values(JSON.parse(jsonData))[0]).toFixed(2);
  }

}
