import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthConfig, AuthFactory, ObservableAuthClient} from '@uplift/auth0';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMap} from 'rxjs/operators';

import {AUTH_CLIENT_FACTORY} from './auth-client-factory';
import {AuthConfigProvider} from '../auth-config-provider';

export const AUTH_CONFIG = new InjectionToken('AUTH_CONFIG')

@Injectable()
export class AuthConfigService {
    private readonly config$: Observable<AuthConfig>;

    constructor(
        @Inject(AUTH_CONFIG) private readonly configProvider: AuthConfigProvider,
        @Inject(AUTH_CLIENT_FACTORY) private readonly authFactory: AuthFactory) {
        if (typeof configProvider === 'function') {
            this.config$ = of(configProvider());
        } else if (configProvider.then) {
            this.config$ = fromPromise(configProvider as Promise<AuthConfig>);
        } else {
            this.config$ = of(configProvider as AuthConfig);
        }
    }

    getConfig(): Observable<AuthConfig> {
        return this.config$;
    }

    getClient(): Observable<ObservableAuthClient> {
        return this.config$.pipe(
            mergeMap(config => this.authFactory.createObservableClient(config))
        )
    }
}
