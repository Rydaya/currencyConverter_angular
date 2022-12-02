import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //импорт объекта для запросов

@Injectable({
  providedIn: 'root',
}) //декоратор

export class CurrencyService { // делаем запрос на наше API
  private endpoint: string = 'https://api.exchangerate.host/latest'; //ссылка для запроса

  constructor(private http: HttpClient) {} //конструктор нужен чтобы внедрить зависимости, сюда будет передан объект для запросов

  getCurrency(baseCurrency: string, convertedCurrency: string) { //метод для запроса
    let url = `${this.endpoint}?base=${baseCurrency}&symbols=${convertedCurrency}`;
    return this.http.get(url);
  }
}
