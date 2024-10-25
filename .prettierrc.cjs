module.exports = {
  printWidth: 80, // 한 줄의 최대 길이 (80자가 넘어가면 줄바꿈)
  tabWidth: 2, // 들여쓰기할 때 사용하는 공백 수
  useTabs: false, // 탭 대신 스페이스 사용
  trailingComma: 'all', // 여러 줄로 나뉘는 구문에서 마지막에 쉼표 추가
  bracketSpacing: true, // 객체 리터럴에서 괄호 안에 공백 삽입
  jsxBracketSameLine: false, // JSX에서 `>`를 다음 줄로 내림
  arrowParens: 'always', // 화살표 함수에서 매개변수가 하나여도 괄호 사용

  // ESLint에서 오류로 처리
  endOfLine: 'auto', // 운영체제에 맞는 줄바꿈 스타일 사용
  singleQuote: true, // 작은따옴표 사용
  semi: true, // 문장의 끝에 세미콜론 사용
};
