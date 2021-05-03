import {Injectable} from '@angular/core';
import {
    AuthIdToken, AuthToken,
    AuthUser,
    BuildAuthorizeUrlSettings, BuildLogoutUrlSettings,
    CheckSessionSettings,
    GetIdTokenSettings, GetTokenSilentlySettings,
    LoginWithPopupSettings,
    LoginWithRedirectResult,
    LoginWithRedirectSettings, LogoutSettings,
    ObservableAuthClient,
    PopupConfigSettings
} from '@uplift/auth0';
import {Observable} from 'rxjs';
import {AuthConfigService} from './auth-config.service';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private readonly authConfigService: AuthConfigService) {
    }

    getUser<T extends AuthUser>(): Observable<T> {
        return this.execute(client => client.getUser<T>());
    }

    loginWithRedirect(options?: LoginWithRedirectSettings): Observable<void> {
        return this.execute(client => client.loginWithRedirect(options));
    }

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Observable<void> {
        return this.execute(client => client.loginWithPopup(options, config));
    }

    buildAuthorizeUrl(options?: BuildAuthorizeUrlSettings): Observable<string> {
        return this.execute(client => client.buildAuthorizeUrl(options));
    }

    getIdTokenClaims(options?: GetIdTokenSettings): Observable<AuthIdToken> {
        return this.execute(client => client.getIdTokenClaims(options));
    }

    handleRedirectCallback(url?: string): Observable<LoginWithRedirectResult> {
        return this.execute(client => client.handleRedirectCallback(url));
    }

    checkSession(options?: CheckSessionSettings): Observable<void> {
        return this.execute(client => client.checkSession(options));
    }

    getTokenSilently(options?: GetTokenSilentlySettings): Observable<AuthToken> {
        return this.execute(client => client.getTokenSilently(options));
    }

    isAuthenticated(): Observable<boolean> {
        return this.execute(client => client.isAuthenticated());
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): Observable<string> {
        return this.execute(client => client.buildLogoutUrl(options));
    }

    logout(options?: LogoutSettings): Observable<void> {
        return this.execute(client => client.logout(options));
    }

    private execute<T>(handler: ((client: ObservableAuthClient) => Observable<T>)): Observable<T> {
        return this.authConfigService.getClient().pipe(mergeMap(handler));
    }
}
