// 1. Promise  미래에 끝날 작업의 약속 객체 
// 메서드 .then()  .catch()  .finally()
// 체이닝으로 순서를 표현 

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(500)
  .then(() => console.log('A 끝'))
  .then(() => delay(300))
  .then(() => console.log('B 끝'))
  .catch(err => console.error('에러:', err))
  .finally(() => console.log('항상 실행'));

  // 장점
  // 콜백 지옥 탈출(체이닝)
  // 병렬 처리를 쉽게 표현: Promise.all, Promise.any, Promise.allSettled, Promise.race

  // 단점/주의
  // then 체인이 길어지면 가독성 떨어짐
  // 에러 흐름이 try/catch처럼 “한 눈에” 보이지 않음
  // UnhandledPromiseRejection(catch 누락) 주의




  // 2) async/await: “Promise를 동기처럼 작성”
  // async 함수는 항상 Promise를 반환한다
  // await는 Promise가 끝날 때까지 기다렸다가 결과를 꺼낸다.
  // 에러는 try/catch로 다룬다.

  function delays(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  try {
    await delays(500);
    console.log('A 끝');
    await delays(300);
    console.log('B 끝');
  } catch (e) {
    console.error('에러:', e);
  } finally {
    console.log('항상 실행');
  }
}
run();

// 장점
// 동기 코드처럼 작성 → 가독성 향상, 유지보수 용이
// 에러를 try/catch로 한 눈에 다룸
// for/if와 섞기 쉬움 

// 단점/주의
// await를 반복문 안에서 무분별하게 쓰면 불필요한 직렬화(느려짐) → 병렬 가능한 건 Promise.all로 묶자.
// 최상위(top-level)에서 await 쓰려면 ESM + Node 20에서만 가능 ("type":"module" 필요)


// 3) 차이점 표
// | 구분      | Promise then/catch   | async/await                                  |
// | ------   | ------------------   | ---------------------------------------      |
// | 코드 스타일 | 체이닝(중첩되면 지저분)    | 동기처럼 순차적                                  |
// | 에러 처리   | `.catch` 체인        | `try/catch`                                   |
// | 병렬 처리   | `Promise.all` 직관적  | `await`만 쓰면 직렬화됨 → `Promise.all`과 병행 권장 |
// | 반환값     | 바로 Promise          |  `async` 함수도 Promise 반환                    |
