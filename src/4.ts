class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey() {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  private tenants: Person[] = [];

  constructor(protected key: Key) {
    this.door = false;
  }

  comeIn(person: Person) {
    if (!this.door) {
      console.log("Двері зачинено. Спочатку відкрийте двері ключем");
      return;
    }

    this.tenants.push(person);
    console.log(`${person.getKey().getSignature()} додано до орендарів`);
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(key: Key): void {
    if (key !== this.key) {
      console.log("Ключ не збігається!");
      return;
    }

    this.door = true;
    console.log("Двері відкрито!");
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

// export {};
