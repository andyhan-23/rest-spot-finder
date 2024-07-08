# rest-spot-finder - 운전 중 휴식을 도와주는 쉼터 정보 제공

## 프로젝트 소개
해당 서비스는 [자동차 관련 커뮤니티](https://m.ppomppu.co.kr/new/bbs_view.php?id=freeboard&no=8821533) 에서 홍보되었으며, 매주 평균 30회의 API 호춣을 기록하며 **실사용**되고 있습니다.
<br />
[__테크 스펙__](https://docs.google.com/document/d/1EYgFZ9NGm49wcDMm3XwS2kfvcAqx6mpCRiLnsr4RI4w/edit)을 작성하여 개발에 앞서 프로젝트의 구조를 설계, 개인의 사용경험을 통해 문제점을 효율적으로 풀 수 있게 사전에 정의 하였습니다.
<br />
기존에 제공하는 지도 서비스를 참고하여 사용자의 사용 경험을 통해 개선방안을 제시합니다. <br />

## 프로젝트 목표
기존의 지도 서비스는 경로 정보를 제공하면서도 경로 상의 휴게소나 졸음 쉬터 정보를 한번에 제공하지 않습니다. 이로 인해 장거리 운전자들은 적절한 휴식을 취하기가 어려워지고, 이는 운전 중 졸음 운전 사고의 위험성을 증가시킬 수 있습니다. 저희는 이 문제를 해결하기 위해 출발지부터 도착지까지의 구간 내에 있는 모든 휴게소와 졸음 쉼터 정보를 제공하여 운전자의 피로를 줄이고 교통 안전을 향상시킬 것입니다.

## Tech Stacks
- 코어: React, TypeScript
- 상태관리: React-Query
- 백엔드: Spring Boot
- 디자인: Tailwind CSS
- 배포: AWS

## 프로젝트 결과물
[__결과물 링크 열기__](https://restspotfinder.site/)

## Preview
<img width="1500" alt="스크린샷 2024-06-21 오후 7 06 35" src="https://github.com/andyhan-23/rest-spot-finder/assets/98483125/6a264de9-05cf-4166-91fa-6ead40606064">

## 실행하는 법
```
$ git clone https://github.com/andyhan-23/rest-spot-finder.git
$ npm install
$ npm run dev
```
## 비고
- 네이버 map API 키 같은 경우 개발자만 알아야 하기 때문에 env파일에 숨겨두었습니다. 그로 인해 개발 환경에서 실행시 naver지도가 나오지 않을 수 있습니다.
- 본 프로젝트는 백엔드 개발자와 같이 함께 진행한 [프로젝트](https://github.com/RestSpotFinder)이며 추후에 혼자 Front 레포지토리만 혼자 다시 한번 처음부터 끝까지 스스로 진행해보았습니다.
- 사용자 의견을 반영하여 커뮤니티 피드백 기반으로 UX/UI를 지속적으로 개선하고 있습니다.










