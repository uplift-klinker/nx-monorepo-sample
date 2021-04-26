import {
    AuthClient,
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
    PopupConfigSettings
} from '@uplift/auth0';

export class TestingAuthClient implements AuthClient {
    buildAuthorizeUrl(options?: AuthorizeUrlSettings): Promise<string> {
        return Promise.resolve('');
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): string {
        return '';
    }

    checkSession(options?: CheckSessionSettings): Promise<void> {
        return Promise.resolve(undefined);
    }

    getIdTokenClaims(options?: GetIdTokenSettings): Promise<AuthIdToken> {
        return Promise.resolve(undefined);
    }

    getTokenSilently(options?: GetTokenSilentlySettings): Promise<AuthToken> {
        return Promise.resolve(undefined);
    }

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Promise<string> {
        return Promise.resolve('');
    }

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Promise<TUser | null> {
        return Promise.resolve(undefined);
    }

    handleRedirectCallback(url?: string): Promise<LoginWithRedirectResult> {
        return Promise.resolve(undefined);
    }

    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(false);
    }

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Promise<void> {
        return Promise.resolve(undefined);
    }

    loginWithRedirect(options?: LoginWithRedirectSettings): Promise<void> {
        return Promise.resolve(undefined);
    }

    logout(options?: LogoutSettings): void {
    }

    setupBuildAuthorizeUrl(result: string = 'https://authorize.url'): void {
        this.buildAuthorizeUrl = jest.fn().mockResolvedValue(result);
    }

    setupBuildLogoutUrl(result: string = 'https://logout.url'): void {
        this.buildLogoutUrl = jest.fn().mockReturnValue(result);
    }

    setupCheckSession(): void {
        this.checkSession = jest.fn().mockReturnValue(Promise.resolve());
    }

    setupGetIdTokenClaims(result: Partial<AuthIdToken> = {}): void {
        this.getIdTokenClaims = jest.fn().mockResolvedValue(result);
    }

    setupGetTokenSilently(result: Partial<AuthToken> = {}): void {
        this.getTokenSilently = jest.fn().mockResolvedValue(result);
    }

    setupGetTokenWithPopup(result: string = 'https://token.popup'): void {
        this.getTokenWithPopup = jest.fn().mockResolvedValue(result);
    }

    setupGetUser<TUser extends AuthUser>(user: Partial<TUser> = {}): void {
        this.getUser = jest.fn().mockResolvedValue(user);
    }

    setupHandleRedirectCallback(result: Partial<LoginWithRedirectResult> = {}): void {
        this.handleRedirectCallback = jest.fn().mockResolvedValue(result);
    }

    setupIsAuthenticated(result: boolean = true): void {
        this.isAuthenticated = jest.fn().mockResolvedValue(result);
    }

    setupLoginWithPopup(): void {
        this.loginWithPopup = jest.fn().mockReturnValue(Promise.resolve());
    }

    setupLoginWithRedirect(): void {
        this.loginWithRedirect = jest.fn().mockReturnValue(Promise.resolve());
    }

    setupLogout(): void {
        this.logout = jest.fn().mockImplementation(() => {});
    }

    setupAll(): void {
        this.setupCheckSession();
        this.setupGetIdTokenClaims();
        this.setupLogout();
        this.setupIsAuthenticated();
        this.setupGetUser();
        this.setupBuildAuthorizeUrl();
        this.setupBuildLogoutUrl();
        this.setupGetTokenSilently();
        this.setupGetTokenWithPopup();
        this.setupHandleRedirectCallback();
        this.setupLoginWithPopup();
        this.setupLoginWithRedirect();
    }
}
