const faker = require("faker");

class Test {
  constructor() {
    this.fixture = [];
    this.result = "";
  }
  addItem(item) {
    this.fixture.push(item);
  }
  concatByReduceSlice() {
    this.result = this.fixture.reduce(
      (pre, cur) => pre + `${cur.name}：${cur.email}、`,
      ""
    );
    this.result = this.result.slice(0, -1);
    // console.log(11, this.result);
  }
  concatByMapJoin() {
    this.result = this.fixture
      .map((item) => `${item.name}：${item.email}`)
      .join("、");
    // console.log(11, this.result);
  }
}

const ROUNDS = 100;

console.log(`Generating ${ROUNDS} sets of data...`);

const myTest = new Test();

for (i = 0; i < ROUNDS; i++) {
  myTest.addItem(faker.helpers.userCard());
}

console.log(`Measurement...`);

const w = performance.now();
myTest.concatByMapJoin();
const v = performance.now();

const mapTime = v - w;
console.log("Map", mapTime);

const s = performance.now();
myTest.concatByReduceSlice();
const t = performance.now();
const reduceTime = t - s;

console.log("Reduce", reduceTime);

console.log(`Fastest is "${mapTime > reduceTime ? "Reduce" : "Map"}"`);
