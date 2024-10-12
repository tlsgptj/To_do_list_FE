# TodoList 웹앱

## 프로젝트 설명 
TodoList 웹앱은 Next.js와 TypeScript를 활용하여 제작된 간단한 할일 관리 어플리케이션입니다. 
웹 프레임워크로 Next.js를 사용하였고 TypeScript를 통해 코드의 안정성과 유지보수성을 높였습니다. 

## 주요 기능 
- 할 일 추가
- 할 일 완료/미완료 표시
- 할 일 삭제
- 모바일 및 데스크톱 반응형 UI

## 기술 스택 
- Framework : Next.js
- Language : TypeScript
- Styling : Tailwind CSS

## 배포 링크 
https://to-do-list-neon-eta.vercel.app/

## 작동 영상
![작동-영상_웹_](https://github.com/user-attachments/assets/e0a6ec2e-69da-4138-8d01-68cda2fe25b2)
삭제기능
![삭제](https://github.com/user-attachments/assets/6536aa75-ac69-4f7b-9707-f95dc3dad21e)

## 아쉬운 점 
-> 글꼴 변경에 실패해서 이는 후에 보완하겠습니다. 

## 구현방법 
1. LIST와 ITEM, DETAIL로 나누어서 구현을 했고, page.tsx에서 List를 메인으로 두었습니다.
2. 위의 공통인 레이아웃은 따로 Layout.tsx 클래스를 만들었습니다.
3. 기능 구현 부분 중 수정로직 및 할일 체크 기능 분리 구현이 힘들었는데, 
isEditing, isEditing이 아닌 경우를 나누어서 해결했습니다.
4. 가장 보편적이고 유지보수하기에도 편한 vercel로 배포를 했습니다.

