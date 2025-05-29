# sabangnet-front

# 프론트엔드 레포지토리 README

## Intro

안녕하세요 인턴 여러분 환영합니다. 🖐  
이 README 파일은 ️여러분들이 인턴 기간동한 수행하게 될 과제를 위한  
프론트엔드 구성에 대하여 간략한 설명을 담고 있습니다.

## 기본 설정

이 프로젝트는 아래와 같은 환경에서 동작합니다.

### Javascript Runtime
- **Node.js**: >= v20.x

### Package Manager
- **npm**: >= 10.x


## TOOL

- Node.js
  - 👉🏻 [Node.js 다운로드 링크](https://nodejs.org/en)

### IDE
- front-end : Visual Studio Code
    - 👉🏻 [VSCODE 다운로드 링크](https://code.visualstudio.com)
- back-end : IntelliJ Community
    - 👉🏻 [IntelliJ 다운로드 링크](https://www.jetbrains.com/idea/download/?section=windows)

### API 테스트
- POSTMAN : Postman API Platform
    - 👉🏻 [POSTMAN 다운로드 링크](https://www.postman.com/downloads/)

### Packages

프로젝트에는 다음과 같은 Gradle 의존성이 포함되어 있습니다:

| Dependency | 설명                                                                            |
|------------|-------------------------------------------------------------------------------|
| Vue3       | 프로그레시브 자바스크립트 프레임워크입니다.                                                       |
| Vuetify    | Vue.js를 위한 Material Design 컴포넌트 라이브러리로, 다양한 UI 컴포넌트를 제공하여 개발 생산성을 향상시킵니다      |
| Axios      | Promise 기반의 HTTP 클라이언트로, 브라우저와 node.js에서 사용하며, RESTful API를 쉽게 호출할 수 있게 해줍니다. |
| VueUse     | Vue3를 위한 컴포지션 기능 컬렉션으로, 재사용 가능한 로직과 훅을 제공하여 Vue 컴포넌트의 작성을 돕습니다.               |
| Lodash     | JavaScript 유틸리티 라이브러리로, 배열, 숫자, 객체, 문자열, 함수 등을 쉽고 효과적으로 처리할 수 있도록 도와줍니다.      |
| Pinia      | Vue.js 애플리케이션의 상태 관리를 도와주는 라이브러리로, Vuex의 대안으로서, 개발자들에게 간단하고 직관적인 API를 제공합니다.  |
| Vue Router | Vue.js에서 제공하는 공식 라이브러리로, 웹 애플리케이션의 라우팅을 수행하기 위해 사용                            |


이 외 과제에 필요한 패키지를 추가로 설치하여 사용하시면 됩니다.

#### ● 공식문서 링크
- [\[Vue3 공식문서\]](https://v3.vuejs.org/guide/introduction.html)
- [\[Vue3 한글 번역문서\]](https://v3.ko.vuejs.org/guide/introduction.html)
- [\[Vuetify 공식문서\]](https://vuetifyjs.com/en/introduction/why-vuetify)
- [\[Axios 공식문서\]](https://axios-http.com/docs/intro)
- [\[VueUse 공식문서\]](https://vueuse.org/guide/)
- [\[Lodash 공식문서\]](https://lodash.com/docs)
- [\[Pinia 공식문서\]](https://pinia.vuejs.org/introduction.html)
- [\[Vue Router 공식문서\]](https://router.vuejs.org/introduction.html)

## 브랜치 전략

브랜치별 Jenkins pipeline 구축을 위해 구조화된 브랜치 전략을 따릅니다.
메인 브랜치는 기본 브랜치이며, 과제에 따라 하기의 브랜치를 체크아웃하여 사용합니다.

#### 풀필먼트 어드민
- `develop-fulfillment-admin`
- `https://intern-fa.fbsabang.co.kr`
#### 풀필먼트 운송장 출력 양식
- `develop-fulfillment-shipping-label`
- `https://intern-fs.fbsabang.co.kr`
#### 사방넷 쇼핑몰 연동
- `develop-sabangnet`
- `https://intern-sb.fbsabang.co.kr`

각 서브 브랜치는 과제의 특정 측면을 다루며, 해당 작업이나 기능을 반영하는 이름으로 지정됩니다. (멘토 가이드에 따라 진행)
ex)
- `develop-fulfillment-admin-page`
- `develop-sabangnet-external-validation`

## 시작하기

1. **레포지토리 클론**:
   ```bash
   git clone http://sb-dev-intern-alb-410301540.ap-northeast-2.elb.amazonaws.com/daou-2024/sabangnet-front.git
   cd <repository_directory>
   ```

2. **서브 브랜치 체크아웃**:
   ```bash
   git checkout -b <sub-branch-name>
   ```

3. **프로젝트 빌드**:
   ```bash
   npm run build
   ```

4. **프로젝트 실행**:
   ```bash
   npm run dev
   ```
