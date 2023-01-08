const f = async () => {
  return await Promise.resolve('babel');
}
f().then(console.log);

const unused = 'test_eslint';

class MyClass {
  static date = new Date();
}

console.log(MyClass.date);
