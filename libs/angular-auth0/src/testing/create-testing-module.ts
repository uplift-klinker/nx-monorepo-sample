import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {AngularAuth0Module} from '../';
import {Type} from '@angular/core';
import {AuthConfigProvider} from '../lib/auth-config-provider';
import {AUTH_CLIENT_FACTORY} from '../lib/services/auth-client-factory';
import {TestingAuthFactory, createTestingAuthFactory} from '@uplift/auth0/testing';

interface CreateTestModuleResult {
    getService: <T>(service: Type<T>) => T;
    authFactory: TestingAuthFactory
}

export async function createTestingModule(authConfig: AuthConfigProvider): Promise<CreateTestModuleResult> {
    const testingAuthFactory = createTestingAuthFactory();
    await TestBed.configureTestingModule({
        imports: [AngularAuth0Module.forConfig(authConfig)],
        providers: [
            {provide: AUTH_CLIENT_FACTORY, useValue: testingAuthFactory}
        ]
    }).compileComponents();

    return {
        getService: TestBed.inject,
        authFactory: testingAuthFactory
    }
}
