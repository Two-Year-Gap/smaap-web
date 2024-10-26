module.exports = {
  env: {
    browser: true,
    es2021: true, // ECMAScript 2021(ES12) 문법 사용
    node: true, // Node.js 환경 지원
  },
  extends: [
    'eslint:recommended', // 기본 ESLint 권장 규칙 사용
    'plugin:react/recommended', // React 관련 ESLint 규칙 사용
    'plugin:@typescript-eslint/recommended', // TypeScript ESLint 권장 규칙
    //'plugin:pnp/recommended', // pnp환경에서 ESlint 적용
    'plugin:prettier/recommended', // Prettier와 ESLint 통합, 포매팅 규칙 적용
  ],
  parser: '@typescript-eslint/parser', // TypeScript 파일을 분석하기 위한 파서
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX 문법 지원
    },
    ecmaVersion: 12, // ECMAScript 버전 설정
    sourceType: 'module', // ES 모듈을 사용
  },
  plugins: [
    'react', // React 관련 ESLint 플러그인
    '@typescript-eslint', // TypeScript ESLint 플러그인
    //'pnp', // pnp환경에서 ESlint 적용
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 불필요한 규칙
    'react/jsx-uses-react': 'off', // React 17+에서는 불필요
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 강제하지 않음
    // 컴포넌트를 화살표 함수로 작성하도록 강제
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    '@typescript-eslint/no-unused-vars': ['warn'], // 사용되지 않는 변수 경고
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 추가적인 규칙을 설정할 수 있음
    'prettier/prettier': ['error'], // Prettier 규칙을 ESLint에서 에러로 표시
    quotes: ['error', 'single'], // 따옴표 규칙을 작은 따옴표로 강제
    semi: ['error', 'always'], // 세미콜론 규칙 강제

    //'pnp/no-unresolved': 'error',
  },
  settings: {
    react: {
      version: 'detect', // 설치된 React 버전 자동 감지
    },
  },
};
