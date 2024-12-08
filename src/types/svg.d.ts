// src/svg.d.ts
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >; // 리액트 컴포넌트 용도 지원
  const src: string; // 파일 경로 용도 지원
  export default src;
}
