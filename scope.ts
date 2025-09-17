// scope.ts
const a = 10;

function outer() {
  const b = 20;

  function inner() {
    console.log('lexical scope OK →', a + b); // 30
  }

  inner(); // ← 호출해야 콘솔이 찍혀요!
}

outer(); // ← 이것도 호출해야 실행됩니다.


// var / let / const 차이
// var → 함수 스코프, 호이스팅 됨, 중복 선언 가능 (❌ 지양)
// let → 블록 스코프, 호이스팅은 되지만 TDZ(Temporal Dead Zone) 때문에 선언 전 접근 불가
// const → let과 동일하지만 값 재할당 불가

//          TDZ(접근금지)
// let x;  ───────────┐
//                    ↓  여기서 초기화
// let x = 10;  <─────●  ← 이 시점부터 접근 가능




// 실행: npx ts-node tdz_scope.ts

function run(title: string, fn: () => void) {
  console.log(`\n=== ${title} ===`);
  try { fn(); } catch (e) {
    const err = e as Error;
    console.log(`Error -> ${err.name}: ${err.message}`);
  }
}

/** 1) var: 호이스팅 + undefined */
run("var는 선언 전 접근해도 undefined", () => {
  // @ts-ignore  // TS 경고 무시 (런타임 동작 확인용)
  console.log("x before:", x); // undefined
  var x = 5;
  console.log("x after:", x);  // 5
});

/** 2) let: 호이스팅은 되지만 TDZ 때문에 참조 불가 */
run("let은 TDZ 때문에 선언 전 접근 불가", () => {
  // @ts-ignore
  // 아래 줄이 실제로 ReferenceError 발생 지점
  // 주석을 풀면 에러 메시지를 볼 수 있어요.
  // console.log("y before:", y); // ReferenceError
  let y = 10;
  console.log("y after:", y);   // 10
});

/** try/catch로 실제 에러를 찍어보기 */
run("let TDZ 에러를 try/catch로 보기", () => {
  try {
    // @ts-ignore
    // 선언문 전에 접근 시도 → TDZ
    // eslint-disable-next-line
    // @ts-ignore
    console.log((y2 as any));
  } catch (e) {
    console.log("TDZ hit:", (e as Error).message);
  }
  let y2 = 20;
  console.log("y2 after:", y2);
});

/** 3) const: let과 동일한 스코프/TDZ + 재할당 금지 */
run("const는 재할당 불가, 그러나 객체 내부 변경은 가능", () => {
  const n = 1;
  // n = 2; // TypeError (주석 해제하면 확인 가능)

  const user = { name: "A" };
  user.name = "B";        // ✅ 내부 프로퍼티 변경은 가능
  console.log(user);      // { name: "B" }
  // user = { name: "C" }; // ❌ 자체 바인딩 재할당은 불가
});

/** 4) 블록 스코프: let/const는 블록 안에 갇힌다 */
run("let/const는 블록 스코프", () => {
  let a = 1;
  {
    let a = 2; // 바깥 a와 다른 변수 (섀도잉)
    console.log("inner a:", a); // 2
  }
  console.log("outer a:", a);   // 1
});

/** 5) var는 블록을 무시(함수 스코프) */
run("var는 블록 무시", () => {
  var b = 1;
  {
    var b = 2; // 같은 b를 덮어씀
  }
  console.log("b:", b);   // 2
});

/** 6) typeof 차이: var는 'undefined', let/const는 ReferenceError */
run("typeof 차이: var vs let", () => {
  // @ts-ignore
  console.log("typeof notDeclared:", typeof notDeclared); // 'undefined' (아예 선언X)
  // @ts-ignore
  // console.log(typeof tdzVar); // ❌ ReferenceError (TDZ 중)
  let tdzVar = 42;
  console.log("tdzVar:", tdzVar);
});

/** 7) for-클로저 차이: var(하나를 공유) vs let(반복마다 새 바인딩) */
run("for-클로저: var는 3,3,3 / let은 0,1,2", () => {
  const fns1: Array<() => void> = [];
  for (var i = 0; i < 3; i++) fns1.push(() => console.log("var i ->", i));
  fns1[0](); fns1[1](); fns1[2](); // 3, 3, 3

  const fns2: Array<() => void> = [];
  for (let j = 0; j < 3; j++) fns2.push(() => console.log("let j ->", j));
  fns2[0](); fns2[1](); fns2[2](); // 0, 1, 2
});
