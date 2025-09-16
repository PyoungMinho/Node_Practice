// JS & TypeScript Grammer Practice
// Node.js를 심루에서 쓸 땐 거의 항상 TypeScript로 씀.
// 왜냐하면 JS는 동적 타이핑이라 실수할 확률이 높음. 타입스크립트의 타입 안정성과 IDE 자동완성, 유지보수성이 도움이 된다.

// 1. Interface
// 👉 객체의 “모양(Shape)”을 정의.
// JS에는 원래 타입이 없는데, TS는 Interface로 타입을 정의할 수 있음.
// 사원증 폼 같은것 
interface User {
    name: string;
    age: number;
    isValid: boolean;
}

const u1: User = {
    name: "Minho",
    age: 30,
    isValid: true,
};

console.log(u1.name);



// 2. Generics
// 👉 함수나 클래스가 타입을 외부에서 주입받아 재사용 가능하게 만듦.
// 라면 냄비 🍜 → 안에 어떤 재료(타입)를 넣든, 냄비는 그대로 쓸 수 있음.
function wrap<T>(value: T): T[] {
  return [value];
}

const n = wrap(10);       // number[]
const s = wrap("hello");  // string[]



// (3) decorator (데코레이터) 
// 👉 클래스, 메서드, 속성 위에 “주석 같은 기능”을 붙여서 동작을 확장. (실제로 NestJS 같은 프레임워크에서 많이 씀)
// 케이크 위의 장식 🎂 → 케이크 본체(클래스)는 그대로인데, 장식(데코레이터)을 붙여서 의미를 확장.

function Log(target: any, key: string) {
  console.log(`Property ${key} was defined`);
}

class MyClass {
  @Log
  name: string = "Node.js";
}


// (4) Module System
// Node에는 두가지 방식이 있음 
// 1) CommonJS (require, module.exports) - 예전 방식
// CommonJS = “택배 박스” 📦 (한 번에 require로 통째로 가져옴)

// math.js
module.exports = { add: (a, b) => a + b };

// app.js
const math = require("./math");
console.log(math.add(2, 3));



// 2) ES Modules (import, export) - 최신 방식, 요즘은 이걸로 씀
// ES Module = “정리된 서랍” 🗄 (필요한 것만 import해서 꺼냄)

// math.ts
export function add(a: number, b: number) {
  return a + b;
}

// app.ts
import { add } from "./math";
console.log(add(2, 3));
