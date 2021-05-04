import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthFactory} from '@uplift/auth0';
import {AUTH_CONFIG, AuthConfigService} from './services/auth-config.service';
import {AuthConfigProvider} from './auth-config-provider';
import {AUTH_CLIENT_FACTORY} from './services/auth-client-factory';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';

@NgModule({
    imports: [CommonModule],
    providers: [
        AuthConfigService,
        AuthService,
        AuthGuard
    ]
})
export class AngularAuth0Module {
    static forConfig(authConfig: AuthConfigProvider): ModuleWithProviders<AngularAuth0Module> {
        return {
            ngModule: AngularAuth0Module,
            providers: [
                {provide: AUTH_CONFIG, useValue: authConfig},
                {provide: AUTH_CLIENT_FACTORY, useValue: AuthFactory}
            ]
        };
    }
}
