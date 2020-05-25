import EventHub from "../index";

type TestCase = (message: string) => void;

const test1: TestCase = (message) => {
  const eventHub = EventHub;
  console.assert(eventHub instanceof Object, "eventHub 是个对象");
  console.log(message);
};

const test2: TestCase = (message) => {
  const eventHub = EventHub;
  // on emit
  let called = false;
  eventHub.on("xxx", (y) => {
    called = true;
    console.log(y);
    console.assert(y[0] === "这是第一个断言");
    console.assert(y[1] === "这是第二个断言");
  });
  eventHub.emit("xxx", ["这是第一个断言", "这是第二个断言"]);
  console.assert(called);
  console.log(message);
};

const test3: TestCase = (message) => {
  const eventHub = EventHub;
  let called = false;
  const fn1 = () => {
    called = true;
  };

  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);
  eventHub.emit("yyy");
  console.assert(called === false);
  console.log(message);
};

test1("EventHub 可以创建对象");
test2(".on 了之后 .emit，会触发 .on 的函数");
test3(".off 有用");
