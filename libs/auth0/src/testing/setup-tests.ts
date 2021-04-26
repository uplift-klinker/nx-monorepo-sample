import {Crypto} from '@peculiar/webcrypto';

(<any>global).crypto = new Crypto();
