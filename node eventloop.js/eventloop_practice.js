// 1. SetTimeout VS Promise
// 실행결과 : A, D, C, B
// Promise가 setTimeout보다 우선순위 더 높음. (마이크로태스크 큐 > 태스크 큐)

// console.log("A");

// setTimeout(() => console.log("B (setTimeout)"), 0);

// Promise.resolve().then(() => console.log("C (Promise)"));

// console.log("D");




// 2.process.nestTick VS Promise.
// 실행결과 : 1,4,2,3 
// nextTick은 Promise보다 우선순위 더 높음 (Node.js 전용 기능).

// console.log("1");

// process.nextTick(() => console.log("2 (nextTick)"));
// Promise.resolve().then(() => console.log("3 (Promise)"));

// console.log("4");




// 3. setImmediate vs setTimeout
// 실행결과 : Immediate!, Timeout!
// setTimeout(..., 0) → "0ms 후 실행"이지만, 최소 지연시간 때문에 Timer Phase 이후 실행.
// setImmediate → “Check Phase”에서 바로 실행.

// setTimeout(() => console.log("Timeout!"), 0);
// setImmediate(() => console.log("Immediate!"));


// 4. 4. 파일 읽기 (I/O)와 이벤트 루프
// 실행결과 : Immediate after I/O,  Timeout after I/O,  File read callback
// 이유: I/O가 끝나면 → Poll Phase → Check Phase(Immediate) → Timer Phase 순서.

const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("File read callback");
});

setImmediate(() => console.log("Immediate after I/O"));
setTimeout(() => console.log("Timeout after I/O"), 0);



// 정리
// Promise.then → Microtask (setTimeout보다 빠름)
// process.nextTick → Microtask보다 더 빠름 (Node.js 전용)
// setImmediate vs setTimeout(0) → I/O 끝나고 나올 때는 보통 setImmediate가 먼저 실행