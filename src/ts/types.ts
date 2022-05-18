type Bird = {
  readonly name: string;
  readonly size?: number;
  readonly canFly: boolean;
};

const someBird: {
  name: string;
  size?: number;
  canFly: boolean;
} = {
  name: 'bird',
  size: 3.6,
  canFly: true,
};

const raven: Bird = {
  name: 'Raven',
  size: 3.2,
  canFly: true,
};

// raven.name = name // error!!

console.log(raven);

const someArray: readonly number[] = [1, 2, 3, 4, 5];

// someArray.push(3) // error!!

let a: unknown;

if (typeof a === 'function') {
  console.log(`${a} is function type`);
}

const errorFunction = (): never => {
  throw new Error('This is never type');
};
