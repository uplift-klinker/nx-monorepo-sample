import createAuth0Client, {Auth0Client} from '@auth0/auth0-spa-js';
import {AuthConfig} from './auth-config';
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
    PopupConfigSettings
} from './auth-models';
import {Auth0ClientCreator} from './auth0-client-creator';

export interface AuthClient {
    buildAuthorizeUrl(options?: AuthorizeUrlSettings): Promise<string>;

    loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Promise<void>;

    getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Promise<TUser | null>;

    getIdTokenClaims(options?: GetIdTokenSettings): Promise<AuthIdToken>;

    loginWithRedirect(options?: LoginWithRedirectSettings): Promise<void>;

    handleRedirectCallback(url?: string): Promise<LoginWithRedirectResult>;

    checkSession(options?: CheckSessionSettings): Promise<void>;

    getTokenSilently(options?: GetTokenSilentlySettings): Promise<AuthToken>;

    getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Promise<string>;

    isAuthenticated(): Promise<boolean>;

    buildLogoutUrl(options?: BuildLogoutUrlSettings): string;

    logout(options?: LogoutSettings): void;
}

class UpliftAuthClient implements AuthClient {
    constructor(private readonly auth0Client: Auth0Client) {

    }

    async buildAuthorizeUrl(options?: AuthorizeUrlSettings): Promise<string> {
        return await this.auth0Client.buildAuthorizeUrl(options);
    }

    buildLogoutUrl(options?: BuildLogoutUrlSettings): string {
        return this.auth0Client.buildLogoutUrl(options);
    }

    async checkSession(options?: CheckSessionSettings): Promise<void> {
        return await this.auth0Client.checkSession(options)
    }

    async getIdTokenClaims(options?: GetIdTokenSettings): Promise<AuthIdToken> {
        return await this.auth0Client.getIdTokenClaims(options);
    }

    async getTokenSilently(options?: GetTokenSilentlySettings): Promise<AuthToken> {
        return await this.auth0Client.getTokenSilently(options);
    }

    async getTokenWithPopup(options?: GetTokenWithPopupSettings, config?: PopupConfigSettings): Promise<string> {
        return await this.auth0Client.getTokenWithPopup(options, config);
    }

    async getUser<TUser extends AuthUser>(options?: GetAuthUserSettings): Promise<TUser | null> {
        const user = await this.auth0Client.getUser<TUser>(options);
        return user || null;
    }

    async handleRedirectCallback(url?: string): Promise<LoginWithRedirectResult> {
        return await this.auth0Client.handleRedirectCallback(url);
    }

    async isAuthenticated(): Promise<boolean> {
        return await this.auth0Client.isAuthenticated();
    }

    async loginWithPopup(options?: LoginWithPopupSettings, config?: PopupConfigSettings): Promise<void> {
        return await this.auth0Client.loginWithPopup(options, config);
    }

    async loginWithRedirect(options?: LoginWithRedirectSettings): Promise<void> {
        return await this.auth0Client.loginWithRedirect(options);
    }

    logout(options?: LogoutSettings): void {
        this.auth0Client.logout(options);
    }
}

export async function createAuthClient(config: AuthConfig, creator?: Auth0ClientCreator): Promise<AuthClient> {
    const auth0Client = await (creator || createAuth0Client)(config);
    return new UpliftAuthClient(auth0Client);
}
