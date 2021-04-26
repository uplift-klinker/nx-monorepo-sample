import {Observable} from 'rxjs';
import {AuthClient, createAuthClient} from './auth-client';
import {createObservableAuthClient, ObservableAuthClient} from './observable-auth-client';
import {AuthConfig} from './auth-config';

function createClient(config: AuthConfig): Promise<AuthClient> {
    return createAuthClient(config);
}

function createObservableClient(config: AuthConfig): Observable<ObservableAuthClient> {
    return createObservableAuthClient(config);
}
export const AuthFactory = {createClient, createObservableClient};
export type AuthFactory = typeof AuthFactory;


