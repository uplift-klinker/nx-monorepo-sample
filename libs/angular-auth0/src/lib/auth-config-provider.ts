import {AuthConfig} from '@uplift/auth0';

export type AuthConfigProvider = AuthConfig | Promise<AuthConfig> | (() => AuthConfig);
