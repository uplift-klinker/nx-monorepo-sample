import {AuthGuard} from './auth.guard';
import {TestingObservableAuthClient} from '@uplift/auth0/testing';
import {createTestingModule} from '../../testing';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authClient: TestingObservableAuthClient;

    beforeEach(async () => {
        const {getService, authFactory} = await createTestingModule({domain: 'one', client_id: 'bob'});
        authClient = authFactory.observableAuthClient;
        guard = getService(AuthGuard);
    });

    test('when activating and not authenticated then redirects to login', done => {
        guard.canActivate(null, null).subscribe(canActivate => {
            expect(canActivate).toEqual(false);
            expect(authClient.loginWithRedirect).toHaveBeenCalled();
            done();
        });
        authClient.triggerIsAuthenticated(false);
        authClient.triggerLoginWithRedirect();
    });

    test('when activating and authenticated then allows activation', done => {
        guard.canActivate(null, null).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(authClient.loginWithRedirect).not.toHaveBeenCalled();
            done();
        });
        authClient.triggerIsAuthenticated(true);
    });

    test('when activating child and not authenticated then redirects to login', done => {
        guard.canActivateChild(null, null).subscribe(canActivate => {
            expect(canActivate).toEqual(false);
            expect(authClient.loginWithRedirect).toHaveBeenCalled();
            done();
        });
        authClient.triggerIsAuthenticated(false);
        authClient.triggerLoginWithRedirect();
    })

    test('when activating child and authenticated then allows activation', done => {
        guard.canActivateChild(null, null).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(authClient.loginWithRedirect).not.toHaveBeenCalled();
            done();
        });
        authClient.triggerIsAuthenticated(true);
    })
});
