const { join } = require('path');

module.exports = {
  extends: ['auto'],
  rules: {
    'no-secrets/no-secrets': ['error', { tolerance: 4.2 }],
    'no-void': 'off',
    'unicorn/prefer-module': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      // Use package.json from both this package folder and root.
      { packageDir: [__dirname, join(__dirname, '../../')] },
    ],
    'unicorn/no-array-reduce': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.test.tsx', '*.testcafe.ts'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/no-done-callback': 'off',
      },
    },
    {
      files: ['*.components.ts'],
      rules: {
        'security/detect-non-literal-fs-filename': 'off',
      },
    },
  ],
};
