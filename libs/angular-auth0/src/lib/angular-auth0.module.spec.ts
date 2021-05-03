import {createTestingModule} from '../testing';
import {AuthConfigService} from './services/auth-config.service';
import {AuthConfig} from '@uplift/auth0';
import {AuthConfigProvider} from './auth-config-provider';

describe('AngularAuth0Module', () => {
    test('when configured using auth config value then provided config is available', async done => {
        const expectedConfig = {domain: 'my.domain.com', client_id: 'my-client-id'};

        const configService = await getConfigService(expectedConfig);
        configService.getConfig().subscribe(config => {
            expect(config).toEqual(expectedConfig);
            done();
        });
    });

    test('when configured using auth config promise then resolved value is available from config', async done => {
        const authConfigPromise = Promise.resolve<AuthConfig>({domain: 'my-domain.com', client_id: 'what'});

        const configService = await getConfigService(authConfigPromise);
        configService.getConfig().subscribe(config => {
            expect(config).toEqual({domain: 'my-domain.com', client_id: 'what'});
            done();
        });
    });

    test('when configured using a function then returned value is available from config', async done => {
        const authConfigFactory = () => ({domain: 'jack', client_id: 'bill'});

        const configService = await getConfigService(authConfigFactory);
        configService.getConfig().subscribe(config => {
            expect(config).toEqual({domain: 'jack', client_id: 'bill'});
            done();
        })
    })

    async function getConfigService(provider: AuthConfigProvider): Promise<AuthConfigService> {
        const {getService} = await createTestingModule(provider);
        return getService(AuthConfigService);
    }
});
