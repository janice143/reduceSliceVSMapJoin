const Benchmark = require("benchmark");
const faker = require("faker");

const ROUNDS = 100;

console.log(`Generating ${ROUNDS} sets of data...`);

const fixture = [];

for (i = 0; i < ROUNDS; i++) {
  fixture.push(faker.helpers.userCard());
}
const suite = new Benchmark.Suite();

console.log(`Measurement...`);
suite
  .add("Reduce", () => {
    let result = fixture.reduce(
      (pre, cur) => pre + `${cur.name}：${cur.email}、`,
      ""
    );
    result = result.slice(0, -1);
  })
  .add("Map", () => {
    fixture.map((item) => `${item.name}：${item.email}`).join("、");
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is "${this.filter("fastest").map("name")}"`);
  })
  .run();
