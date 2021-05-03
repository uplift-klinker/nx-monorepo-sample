import {createTestingModule} from '../../testing';
import {AuthService} from './auth.service';
import {TestingObservableAuthClient} from '@uplift/auth0/testing';

describe('AuthService', () => {
    let authClient: TestingObservableAuthClient;
    let authService: AuthService;

    beforeEach(async () => {
        const {getService, authFactory} = await createTestingModule({domain: '', client_id: ''});
        authService = getService(AuthService);
        authClient = authFactory.observableAuthClient;
    });

    test('when getting user than gets user from auth client', done => {
        authService.getUser().subscribe(user => {
            expect(user).toEqual({sub: 'subject'});
            done();
        });
        authClient.triggerGetUser({sub: 'subject'});
    });

    test('when logging in with redirect then logs in using auth client', done => {
        authService.loginWithRedirect({appState: 'my app state'}).subscribe(() => {
            expect(authClient.loginWithRedirect).toHaveBeenCalledWith({appState: 'my app state'});
            done();
        });
        authClient.triggerLoginWithRedirect();
    });

    test('when building authorize url then returns authorize url', done => {
        authService.buildAuthorizeUrl({appState: 'bobby'}).subscribe(url => {
            expect(url).toEqual('https://whatup.com');
            expect(authClient.buildAuthorizeUrl).toHaveBeenCalledWith({appState: 'bobby'});
            done();
        });
        authClient.triggerBuildAuthorizeUrl('https://whatup.com');
    });

    test('when logging in with popup then uses client to login', done => {
        authService.loginWithPopup({scope: 'profile'}, {popup: 'idk'}).subscribe(() => {
            expect(authClient.loginWithPopup).toHaveBeenCalledWith({scope: 'profile'}, {popup: 'idk'});
            done();
        });
        authClient.triggerLoginWithPopup();
    });

    test('when getting id token claims then returns claims from token', done => {
        authService.getIdTokenClaims({scope: 'simon'}).subscribe(claims => {
            expect(claims).toEqual({__raw: 'rawness'});
            expect(authClient.getIdTokenClaims).toHaveBeenCalledWith({scope: 'simon'});
            done();
        });
        authClient.triggerGetIdTokenClaims({__raw: 'rawness'});
    });

    test('when handling redirect callback then returns redirect result', done => {
        authService.handleRedirectCallback('https://redirected.com').subscribe(result => {
            expect(result).toEqual({appState: 'my-state'});
            expect(authClient.handleRedirectCallback).toHaveBeenCalledWith('https://redirected.com');
            done();
        });
        authClient.triggerHandleRedirectCallback({appState: 'my-state'});
    });

    test('when checking session then uses auth client', done => {
        authService.checkSession({scope: 'openid'}).subscribe(() => {
            expect(authClient.checkSession).toHaveBeenCalledWith({scope: 'openid'});
            done();
        });

        authClient.triggerCheckSession();
    });

    test('when getting token silently then returns token from auth client', done => {
        authService.getTokenSilently({audience: 'https://aud.com'}).subscribe(token => {
            expect(token).toEqual({id: 'bob'});
            expect(authClient.getTokenSilently).toHaveBeenCalledWith({audience: 'https://aud.com'});
            done();
        });
        authClient.triggerGetTokenSilently({id: 'bob'});
    });

    test('when checking is authenticated then returns authenticated from client', done => {
        authService.isAuthenticated().subscribe(isAuthenticated => {
            expect(isAuthenticated).toEqual(true);
            expect(authClient.isAuthenticated).toHaveBeenCalled();
            done();
        });
        authClient.triggerIsAuthenticated(true);
    });

    test('when building logout url then returns logout url', done => {
        authService.buildLogoutUrl({client_id: 'one'}).subscribe(url => {
            expect(url).toEqual('https://log.out');
            expect(authClient.buildLogoutUrl).toHaveBeenCalledWith({client_id: 'one'});
            done();
        });
        authClient.triggerBuildLogoutUrl('https://log.out');
    });

    test('when logging out then logs out using client', done => {
        authService.logout({client_id: 'other'}).subscribe(() => {
            expect(authClient.logout).toHaveBeenCalledWith({client_id: 'other'});
            done();
        })
        authClient.triggerLogout();
    })
});
