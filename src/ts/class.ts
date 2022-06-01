abstract class User {
  // private vs protected
  // private: 해당 클래스에서 사용가능, 외부와 상속받은 클래스에서 사용 불가
  // protected: 외부에서 사용 불가능 하지만, 상속받은 클래스에서 사용 가능
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickname: string
  ) {}

  abstract getNicName(): void;
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User {
  getNicName() {
    console.log(this.nickname);
  }
}

const blackraven = new Player('raven', 'black', 'br');

blackraven.getFullName();

type Words = {
  [key: string]: string; // 동적으로 key 값이 변하게끔 하는 문법
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }

  add(word: Word) {
    if (this.words[this.words.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }

  def(term: string) {
    return this.words[term];
  }
}

class Word {
  constructor(public term: string, public def: string) {}
}

const woody = new Word('woody', 'musician');

const dict = new Dict();

dict.add(woody);
console.log(dict.def('woody'));
