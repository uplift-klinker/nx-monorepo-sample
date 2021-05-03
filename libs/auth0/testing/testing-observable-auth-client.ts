import {
    AuthIdToken,
    BuildAuthorizeUrlSettings,
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
import {Observable, Subject} from 'rxjs';

export class TestingObservableAuthClient implements ObservableAuthClient {
    private readonly subjects: Map<keyof ObservableAuthClient, Subject<any>> = new Map<keyof ObservableAuthClient, Subject<any>>();
    constructor() {
        spyOn(this, 'buildAuthorizeUrl').and.callThrough();
        spyOn(this, 'buildLogoutUrl').and.callThrough();
        spyOn(this, 'checkSession').and.callThrough();
        spyOn(this, 'getIdTokenClaims').and.callThrough();
        spyOn(this, 'getTokenSilently').and.callThrough();
        spyOn(this, 'getTokenWithPopup').and.callThrough();
        spyOn(this, 'getUser').and.callThrough();
        spyOn(this, 'handleRedirectCallback').and.callThrough();
        spyOn(this, 'isAuthenticated').and.callThrough();
        spyOn(this, 'loginWithPopup').and.callThrough();
        spyOn(this, 'loginWithRedirect').and.callThrough();
        spyOn(this, 'logout').and.callThrough();
    }

    buildAuthorizeUrl(options?: BuildAuthorizeUrlSettings): Observable<string> {
        return this.getObservable<string>('buildAuthorizeUrl');
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): Observable<string> {
        return this.getObservable<string>('buildLogoutUrl');
    }

    checkSession(options?: CheckSessionSettings): Observable<void> {
        return this.getObservable<void>('checkSession');
    }

    getIdTokenClaims(options?: GetIdTokenSettings): Observable<AuthIdToken> {
        return this.getObservable<AuthIdToken>('getIdTokenClaims');
    }

    getTokenSilently(options?: GetTokenSilentlySettings): Observable<AuthToken> {
        return this.getObservable<AuthToken>('getTokenSilently');
    }

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Observable<string> {
        return this.getObservable<string>('getTokenWithPopup');
    }

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Observable<TUser | null> {
        return this.getObservable<TUser | null>('getUser');
    }

    handleRedirectCallback(url?: string): Observable<LoginWithRedirectResult> {
        return this.getObservable<LoginWithRedirectResult>('handleRedirectCallback');
    }

    isAuthenticated(): Observable<boolean> {
        return this.getObservable<boolean>('isAuthenticated');
    }

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Observable<void> {
        return this.getObservable<void>('loginWithPopup');
    }

    loginWithRedirect(options?: LoginWithRedirectSettings): Observable<void> {
        return this.getObservable<void>('loginWithRedirect');
    }

    logout(options?: LogoutSettings): Observable<void> {
        return this.getObservable<void>('logout');
    }

    triggerLogout(): void {
        this.trigger<void>('logout');
    }

    triggerLoginWithRedirect(): void {
        this.trigger<void>('loginWithRedirect');
    }

    triggerLoginWithPopup(): void {
        this.trigger<void>('loginWithPopup');
    }

    triggerIsAuthenticated(value: boolean): void {
        this.trigger('isAuthenticated', value);
    }

    triggerHandleRedirectCallback(value: LoginWithRedirectResult): void {
        this.trigger('handleRedirectCallback', value);
    }

    triggerGetUser<TUser extends AuthUser>(value: TUser | null): void {
        this.trigger<TUser | null>('getUser', value);
    }

    triggerGetTokenWithPopup(value: string): void {
        this.trigger<string>('getTokenWithPopup', value);
    }

    triggerGetTokenSilently(value: AuthToken): void {
        this.trigger<AuthToken>('getTokenSilently', value);
    }

    triggerGetIdTokenClaims(value: AuthIdToken): void {
        this.trigger<AuthIdToken>('getIdTokenClaims', value);
    }

    triggerCheckSession(): void {
        this.trigger<void>('checkSession');
    }

    triggerBuildLogoutUrl(url: string): void {
        this.trigger<string>('buildLogoutUrl', url);
    }

    triggerBuildAuthorizeUrl(url: string): void {
        this.trigger<string>('buildAuthorizeUrl', url);
    }

    private getOrCreateSubject<T>(method: keyof ObservableAuthClient): Subject<T> {
        if (this.subjects.has(method)) {
            return this.subjects.get(method) as Subject<T>;
        }

        const subject = new Subject<T>();
        this.subjects.set(method, subject);
        return subject;
    }

    private getObservable<T>(method: keyof ObservableAuthClient): Observable<T> {
        return this.getOrCreateSubject<T>(method).asObservable();
    }

    private trigger<T>(method: keyof ObservableAuthClient, value?: T): void {
        this.getOrCreateSubject<T>(method).next(value);
    }
}
