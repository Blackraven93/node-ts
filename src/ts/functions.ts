type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

// MEMO:JS와 다르게 추가적으로 제공하는 기능
// Overloading
// Generic

const add: Add = (a, b) => {
  if (typeof b === 'string') return a;
  return a + b;
};

// Generic Test
type SuperPrint = {
  <T>(arr: T[]): T;
};

/**
  function superPrint<T>(a: T[]) {
    return a[0]
  }

  const a = superPrint<number>([1,2,3,4])
 */

const superPrint: SuperPrint = (arr) => arr[0];

// Generic을 사용하는 이유?
// 다형성
superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(['a', 'b', 'c']);
superPrint([1, 2, true, false]);

// 재사용
