import { Component } from '@angular/core';

import { AnalogWelcome } from './analog-welcome';
import { Countries } from './countries';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { load } from './index.server';

@Component({
  selector: 'app-home',
  imports: [AnalogWelcome, Countries],
  template: `
    <app-countries [countries]="data().countries" />
    <app-analog-welcome />
  `,
})
export default class HomeComponent {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
