import {
    GetIdTokenClaimsOptions,
    GetTokenSilentlyOptions, GetTokenWithPopupOptions,
    GetUserOptions,
    IdToken, LogoutOptions, LogoutUrlOptions,
    PopupConfigOptions,
    PopupLoginOptions,
    RedirectLoginOptions,
    RedirectLoginResult
} from '@auth0/auth0-spa-js';

export interface BuildAuthorizeUrlSettings extends RedirectLoginOptions {

}

export interface LoginWithPopupSettings extends PopupLoginOptions {

}

export interface PopupConfigSettings extends PopupConfigOptions {

}

export interface GetAuthUserSettings extends GetUserOptions {

}

export interface GetIdTokenSettings extends GetIdTokenClaimsOptions {

}

export interface AuthIdToken extends IdToken {

}

export interface LoginWithRedirectSettings extends RedirectLoginOptions {

}

export interface LoginWithRedirectResult extends RedirectLoginResult {

}

export interface CheckSessionSettings extends GetTokenSilentlyOptions {

}

export interface GetTokenSilentlySettings extends GetTokenSilentlyOptions {

}

export interface GetTokenWithPopupSettings extends GetTokenWithPopupOptions {

}

export interface BuildLogoutUrlSettings extends LogoutUrlOptions {

}

export interface LogoutSettings extends LogoutOptions {

}

export interface AuthToken {

}

export interface AuthUser {
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: string;
    updated_at?: string;
    sub?: string;
    [key: string]: any;
}
