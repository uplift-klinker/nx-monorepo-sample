import {AuthConfig} from './auth-config';
import {Auth0ClientCreator} from './auth0-client-creator';
import createAuth0Client, {Auth0Client} from '@auth0/auth0-spa-js';
import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {
    AuthIdToken,
    AuthorizeUrlSettings, AuthToken,
    AuthUser, BuildLogoutUrlSettings, CheckSessionSettings,
    GetAuthUserSettings, GetIdTokenSettings, GetTokenSilentlySettings, GetTokenWithPopupSettings,
    LoginWithPopupSettings, LoginWithRedirectResult, LoginWithRedirectSettings, LogoutSettings,
    PopupConfigSettings
} from './auth-models';
import {map} from 'rxjs/operators';

export interface ObservableAuthClient {
    buildAuthorizeUrl(options?: AuthorizeUrlSettings): Observable<string>;

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Observable<void>;

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Observable<TUser | null>;

    getIdTokenClaims(options?: GetIdTokenSettings): Observable<AuthIdToken>;

    loginWithRedirect(options?: LoginWithRedirectSettings): Observable<void>;

    handleRedirectCallback(url?: string): Observable<LoginWithRedirectResult>;

    checkSession(options?: CheckSessionSettings): Observable<void>;

    getTokenSilently(options?: GetTokenSilentlySettings): Observable<AuthToken>;

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Observable<string>;

    isAuthenticated(): Observable<boolean>;

    buildLogoutUrl(options?: BuildLogoutUrlSettings): Observable<string>;

    logout(options?: LogoutSettings): Observable<void>;
}

class UpliftObservableAuthClient implements ObservableAuthClient{
    constructor(private readonly client: Auth0Client) {
    }

    buildAuthorizeUrl(options?: AuthorizeUrlSettings): Observable<string> {
        return fromPromise(this.client.buildAuthorizeUrl(options));
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): Observable<string> {
        return of(this.client.buildLogoutUrl(options));
    }

    checkSession(options?: CheckSessionSettings): Observable<void> {
        return fromPromise(this.client.checkSession(options));
    }

    getIdTokenClaims(options?: GetIdTokenSettings): Observable<AuthIdToken> {
        return fromPromise(this.client.getIdTokenClaims(options));
    }

    getTokenSilently(options?: GetTokenSilentlySettings): Observable<AuthToken> {
        return fromPromise(this.client.getTokenSilently(options));
    }

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Observable<string> {
        return fromPromise(this.client.getTokenWithPopup(options, config));
    }

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Observable<TUser | null> {
        return fromPromise(this.client.getUser<TUser>(options)).pipe(
            map(user => user || null)
        );
    }

    handleRedirectCallback(url?: string): Observable<LoginWithRedirectResult> {
        return fromPromise(this.client.handleRedirectCallback(url));
    }

    isAuthenticated(): Observable<boolean> {
        return fromPromise(this.client.isAuthenticated());
    }

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Observable<void> {
        return fromPromise(this.client.loginWithPopup(options, config));
    }

    loginWithRedirect(options?: LoginWithRedirectSettings): Observable<void> {
        return fromPromise(this.client.loginWithRedirect(options));
    }

    logout(options?: LogoutSettings): Observable<void> {
        this.client.logout(options);
        return of(null);
    }

}

export function createObservableAuthClient(config: AuthConfig, creator?: Auth0ClientCreator): Observable<ObservableAuthClient> {
    return fromPromise((creator || createAuth0Client)(config)).pipe(
        map(client => new UpliftObservableAuthClient(client))
    );
}
