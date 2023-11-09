class Key {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  private tenants: Person[] = [];

  constructor(protected key: Key) {}

  comeIn(person: Person): void {
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
  openDoor(key: Key): void {
    if (key.getSignature() !== this.key.getSignature()) {
      console.log("Ключ не збігається");
      return;
    }

    this.door = true;
    console.log("Двері відкрито");
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
