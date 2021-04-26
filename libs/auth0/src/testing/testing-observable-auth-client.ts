import {
    AuthIdToken,
    AuthorizeUrlSettings,
    AuthToken,
    AuthUser,
    BuildLogoutUrlSettings,
    CheckSessionSettings,
    GetAuthUserSettings,
    GetIdTokenSettings,
    GetTokenSilentlySettings,
    GetTokenWithPopupSettings,
    LoginWithPopupSettings,
    LoginWithRedirectResult,
    LoginWithRedirectSettings,
    LogoutSettings,
    ObservableAuthClient,
    PopupConfigSettings
} from '@uplift/auth0';
import {Observable} from 'rxjs';

export class TestingObservableAuthClient implements ObservableAuthClient {
    buildAuthorizeUrl(options?: AuthorizeUrlSettings): Observable<string> {
        return undefined;
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): Observable<string> {
        return undefined;
    }

    checkSession(options?: CheckSessionSettings): Observable<void> {
        return undefined;
    }

    getIdTokenClaims(options?: GetIdTokenSettings): Observable<AuthIdToken> {
        return undefined;
    }

    getTokenSilently(options?: GetTokenSilentlySettings): Observable<AuthToken> {
        return undefined;
    }

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Observable<string> {
        return undefined;
    }

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Observable<TUser | null> {
        return undefined;
    }

    handleRedirectCallback(url?: string): Observable<LoginWithRedirectResult> {
        return undefined;
    }

    isAuthenticated(): Observable<boolean> {
        return undefined;
    }

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Observable<void> {
        return undefined;
    }

    loginWithRedirect(options?: LoginWithRedirectSettings): Observable<void> {
        return undefined;
    }

    logout(options?: LogoutSettings): Observable<void> {
        return undefined;
    }

}
