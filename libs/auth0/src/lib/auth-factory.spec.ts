import {AuthFactory} from './auth-factory';

describe('AuthFactory', () => {
    test('when client created then returns auth client', async () => {
        const client = await AuthFactory.createClient({client_id: '', domain: ''});

        expect(client).not.toBeNull();
        expect(client).toBeDefined();
    });

    test('when observable client created then returns observable client', done => {
        AuthFactory.createObservableClient({client_id: '', domain: ''}).subscribe(client => {
            expect(client).not.toBeNull();
            expect(client).toBeDefined();
            done();
        })
    })
})
