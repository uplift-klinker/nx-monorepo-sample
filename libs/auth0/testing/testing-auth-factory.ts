import {AuthFactory} from '@uplift/auth0';
import {TestingAuthClient} from './testing-auth-client';
import {TestingObservableAuthClient} from './testing-observable-auth-client';
import {BehaviorSubject} from 'rxjs';

export type TestingAuthFactory = AuthFactory & {
    authClient: TestingAuthClient;
    observableAuthClient: TestingObservableAuthClient;
}

export function createTestingAuthFactory(): TestingAuthFactory {
    const authClient = new TestingAuthClient();
    const observableClient = new TestingObservableAuthClient();
    const createClient = jest.fn().mockResolvedValue(authClient);
    const createObservableClient = jest.fn().mockReturnValue(new BehaviorSubject(observableClient).asObservable());
    return {
        authClient,
        observableAuthClient: observableClient,
        createClient,
        createObservableClient,
    }
}
