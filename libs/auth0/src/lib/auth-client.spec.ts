
import {Auth0Client} from '@auth0/auth0-spa-js';
import { AuthClient, createAuthClient } from './auth-client';
import { AuthConfig } from './auth-config';
import { Auth0ClientCreator } from './auth0-client-creator';

describe('AuthClient', () => {
    let config: AuthConfig;
    let creator: Auth0ClientCreator;
    let auth0Client: Auth0Client;
    let client: AuthClient;

    beforeEach(async () => {
        config = {client_id: 'idk', domain: 'some'};
        auth0Client = new Auth0Client(config);
        creator = jest.fn().mockResolvedValue(auth0Client);

        client = await createAuthClient(config, creator);
    });

    test('when authorize url built then calls auth0 client', async () => {
        jest.spyOn(auth0Client, 'buildAuthorizeUrl').mockResolvedValue('https://url');

        const authUrl = await client.buildAuthorizeUrl({appState: 'state'});

        expect(authUrl).toEqual('https://url');
        expect(auth0Client.buildAuthorizeUrl).toHaveBeenCalledWith({appState: 'state'});
    });

    test('when logout url built then uses auth0 client', () => {
        jest.spyOn(auth0Client, 'buildLogoutUrl').mockReturnValue('https://bob.com');

        const logoutUrl = client.buildLogoutUrl({client_id: 'bill'});

        expect(logoutUrl).toEqual('https://bob.com');
        expect(auth0Client.buildLogoutUrl).toHaveBeenCalledWith({client_id: 'bill'});
    });

    test('when session is checked then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'checkSession').mockReturnValue(Promise.resolve());

        await client.checkSession({audience: 'idk'});

        expect(auth0Client.checkSession).toHaveBeenCalledWith({audience: 'idk'});
    });

    test('when id token claims are grabbed then returns id token claims from auth0', async () => {
        // @ts-ignore
        jest.spyOn(auth0Client, 'getIdTokenClaims').mockResolvedValue({family_name: 'jackson'});

        const claims = await client.getIdTokenClaims({scope: 'profile'});

        expect(claims).toEqual({family_name: 'jackson'});
        expect(auth0Client.getIdTokenClaims).toHaveBeenCalledWith({scope: 'profile'});
    });

    test('when getting token silently then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'getTokenSilently').mockResolvedValue({token_type: 'Bearer'});

        const token = await client.getTokenSilently({ignoreCache: true});

        expect(token).toEqual({token_type: 'Bearer'});
        expect(auth0Client.getTokenSilently).toHaveBeenCalledWith({ignoreCache: true});
    });

    test('when getting token with pop up then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'getTokenWithPopup').mockResolvedValue('what is up');

        const result = await client.getTokenWithPopup({connection: 'new hotness'}, {timeoutInSeconds: 55});

        expect(result).toEqual('what is up');
        expect(auth0Client.getTokenWithPopup).toHaveBeenCalledWith({connection: 'new hotness'}, {timeoutInSeconds: 55});
    });

    test('when getting user then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'getUser').mockResolvedValue({email_verified: true});

        const user = await client.getUser({scope: 'email'});

        expect(user).toEqual({email_verified: true});
        expect(auth0Client.getUser).toHaveBeenCalledWith({scope: 'email'});
    });

    test('when auth0 returns undefined user then returns null', async () => {
        jest.spyOn(auth0Client, 'getUser').mockResolvedValue(undefined);

        const user = await client.getUser();

        expect(user).toEqual(null);
    });

    test('when handling redirect call back then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'handleRedirectCallback').mockResolvedValue({appState: 'boo'});

        const result = await client.handleRedirectCallback('my-url');

        expect(result).toEqual({appState: 'boo'});
        expect(auth0Client.handleRedirectCallback).toHaveBeenCalledWith('my-url');
    });

    test('when checking if authenticated then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'isAuthenticated').mockResolvedValue(true);

        const isAuthenticated = await client.isAuthenticated();

        expect(isAuthenticated).toEqual(true);
        expect(auth0Client.isAuthenticated).toHaveBeenCalled();
    });

    test('when logging in with popup then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'loginWithPopup').mockReturnValue(Promise.resolve());

        await client.loginWithPopup({scope: 'openid'}, {timeoutInSeconds: 66});

        expect(auth0Client.loginWithPopup).toHaveBeenCalledWith({scope: 'openid'}, {timeoutInSeconds: 66});
    });

    test('when logging in with redirect then uses auth0 client', async () => {
        jest.spyOn(auth0Client, 'loginWithRedirect').mockReturnValue(Promise.resolve());

        await client.loginWithRedirect({redirect_uri: 'home'});

        expect(auth0Client.loginWithRedirect).toHaveBeenCalledWith({redirect_uri: 'home'});
    });

    test('when logging out then uses auth0 client', () => {
        jest.spyOn(auth0Client, 'logout').mockImplementation(() => {
        });

        client.logout({returnTo: 'https://me.com'});

        expect(auth0Client.logout).toHaveBeenCalledWith({returnTo: 'https://me.com'});
    });
});
