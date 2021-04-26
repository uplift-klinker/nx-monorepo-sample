import {AuthConfig} from './auth-config';
import {
    createObservableAuthClient,
    ObservableAuthClient
} from './observable-auth-client';
import {Auth0ClientCreator} from './auth0-client-creator';
import {Auth0Client} from '@auth0/auth0-spa-js';

describe('ObservableAuthClient', () => {
    let config: AuthConfig;
    let creator: Auth0ClientCreator;
    let auth0Client: Auth0Client;
    let client: ObservableAuthClient;

    beforeEach( done => {
        config = {client_id: 'idk', domain: 'some'};
        auth0Client = new Auth0Client(config);
        creator = jest.fn().mockResolvedValue(auth0Client);

        createObservableAuthClient(config, creator).subscribe(instance => {
            client = instance;
            done();
        });
    });

    test('when authorize url built then calls auth0 client', done => {
        jest.spyOn(auth0Client, 'buildAuthorizeUrl').mockResolvedValue('https://url');

        client.buildAuthorizeUrl({appState: 'state'}).subscribe(authUrl => {
            expect(authUrl).toEqual('https://url');
            expect(auth0Client.buildAuthorizeUrl).toHaveBeenCalledWith({appState: 'state'});
            done();
        });
    });

    test('when logout url built then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'buildLogoutUrl').mockReturnValue('https://bob.com');

        client.buildLogoutUrl({client_id: 'bill'}).subscribe(logoutUrl => {
            expect(logoutUrl).toEqual('https://bob.com');
            expect(auth0Client.buildLogoutUrl).toHaveBeenCalledWith({client_id: 'bill'});
            done();
        });
    });

    test('when session is checked then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'checkSession').mockReturnValue(Promise.resolve());

        client.checkSession({audience: 'idk'}).subscribe(() => {
            expect(auth0Client.checkSession).toHaveBeenCalledWith({audience: 'idk'});
            done();
        });
    });

    test('when id token claims are grabbed then returns id token claims from auth0', done => {
        // @ts-ignore
        jest.spyOn(auth0Client, 'getIdTokenClaims').mockResolvedValue({family_name: 'jackson'});

        client.getIdTokenClaims({scope: 'profile'}).subscribe(claims => {
            expect(claims).toEqual({family_name: 'jackson'});
            expect(auth0Client.getIdTokenClaims).toHaveBeenCalledWith({scope: 'profile'});
            done();
        });
    });

    test('when getting token silently then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'getTokenSilently').mockResolvedValue({token_type: 'Bearer'});

        client.getTokenSilently({ignoreCache: true}).subscribe(token => {
            expect(token).toEqual({token_type: 'Bearer'});
            expect(auth0Client.getTokenSilently).toHaveBeenCalledWith({ignoreCache: true});
            done();
        });
    });

    test('when getting token with pop up then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'getTokenWithPopup').mockResolvedValue('what is up');

        client.getTokenWithPopup({connection: 'new hotness'}, {timeoutInSeconds: 55}).subscribe(result => {
            expect(result).toEqual('what is up');
            expect(auth0Client.getTokenWithPopup).toHaveBeenCalledWith({connection: 'new hotness'}, {timeoutInSeconds: 55});
            done();
        });
    });

    test('when getting user then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'getUser').mockResolvedValue({email_verified: true});

        client.getUser({scope: 'email'}).subscribe(user => {
            expect(user).toEqual({email_verified: true});
            expect(auth0Client.getUser).toHaveBeenCalledWith({scope: 'email'});
            done();
        });
    });

    test('when auth0 returns undefined user then returns null', done => {
        jest.spyOn(auth0Client, 'getUser').mockResolvedValue(undefined);

        client.getUser().subscribe(user => {
            expect(user).toEqual(null);
            done();
        });
    });

    test('when handling redirect call back then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'handleRedirectCallback').mockResolvedValue({appState: 'boo'});

        client.handleRedirectCallback('my-url').subscribe(result => {
            expect(result).toEqual({appState: 'boo'});
            expect(auth0Client.handleRedirectCallback).toHaveBeenCalledWith('my-url');
            done();
        });
    });

    test('when checking if authenticated then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'isAuthenticated').mockResolvedValue(true);

        client.isAuthenticated().subscribe(isAuthenticated => {
            expect(isAuthenticated).toEqual(true);
            expect(auth0Client.isAuthenticated).toHaveBeenCalled();
            done();
        });
    });

    test('when logging in with popup then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'loginWithPopup').mockReturnValue(Promise.resolve());

        client.loginWithPopup({scope: 'openid'}, {timeoutInSeconds: 66}).subscribe(() => {
            expect(auth0Client.loginWithPopup).toHaveBeenCalledWith({scope: 'openid'}, {timeoutInSeconds: 66});
            done();
        });
    });

    test('when logging in with redirect then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'loginWithRedirect').mockReturnValue(Promise.resolve());

        client.loginWithRedirect({redirect_uri: 'home'}).subscribe(() => {
            expect(auth0Client.loginWithRedirect).toHaveBeenCalledWith({redirect_uri: 'home'});
            done();
        });
    });

    test('when logging out then uses auth0 client', done => {
        jest.spyOn(auth0Client, 'logout').mockImplementation(() => {
        });

        client.logout({returnTo: 'https://me.com'}).subscribe(() => {
            expect(auth0Client.logout).toHaveBeenCalledWith({returnTo: 'https://me.com'});
            done();
        });
    });
});
