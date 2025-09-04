import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-countries',
  template: `
    <h2>Countries</h2>
    @for(country of data(); track country) {
    {{ country.name }} <br />
    }

    <button (click)="addCountry()">Add Country</button>
  `,
  styles: `
    form { 
      display: flex;
      padding: 4px;
      flex-direction: column;
    }
  `,
})
export class Countries {
  countries = input.required<{ name: string }[]>();
  extra = signal<{ name: string }[]>([]);
  http = inject(HttpClient);
  data = computed(() => {
    const countries = this.countries();
    const extra = this.extra();

    return [...countries, ...extra];
  });

  addCountry() {
    this.http
      .get('/api/v1/countries')
      .subscribe(({ countries }: any) => this.extra.set(countries));
  }
}
