import {
  ApplicationConfig, ErrorHandler,
  provideZonelessChangeDetection, Injectable
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {OverlayContainer} from '@angular/cdk/overlay';

import {routes} from './app.routes';
import {ErrorHandlerService} from '@clinicaloffice/mpage-developer';
import {provideHttpClient} from '@angular/common/http';

// Forces CDK Overlay into component DOM instead of global DOM
@Injectable()
export class ShadowDomOverlayContainer extends OverlayContainer {
  protected override _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('cdk-overlay-container');

    // Append to the Shadow DOM root instead of the document body
    const shadowRoot = document.querySelector('mpage-developer-component-template')?.shadowRoot;
    if (shadowRoot) {
      shadowRoot.appendChild(container);
    } else {
      document.body.appendChild(container); // Fallback
    }

    this._containerElement = container;
  }
}

// Custom date formats
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: ['dd-MMM-yyyy'],
  },
  display: {
    dateInput: 'dd-MMM-yyyy',
    dateLabel: 'dd-MMM-yyyy',
    dateTimeLabel: 'dd-MMM-yyyy HH:mm',
    locale: 'en-US',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: OverlayContainer, useClass: ShadowDomOverlayContainer}
  ]
};
