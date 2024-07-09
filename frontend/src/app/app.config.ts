import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { authInterceptor } from './auth/services/auth.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';

/**
 * Configuração da aplicação Angular.
 * Define os provedores necessários para funcionalidades como roteamento,
 * animações, HTTP client com interceptação, entre outros.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), provideAnimationsAsync(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ]
};
