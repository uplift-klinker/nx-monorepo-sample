module.exports = {
    displayName: '@uplift/auth0',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.spec.json',
        }
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/auth0',
    setupFilesAfterEnv: ['<rootDir>/testing/setup-tests.ts']
};
