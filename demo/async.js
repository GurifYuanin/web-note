// const fs = require('fs');

// const readFile = function (fileName) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(fileName, function(error, data) {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
// };

// const gen = function* () {
//   const f1 = yield readFile('D:/Git/web-note/html/Thinkphp5.1.html');
//   const f2 = yield readFile('D:/Git/web-note/html/vuex.html');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };

// const generator = function* ()　{
//   const f1 = yield new Promise((resolve, reject) => {
//     fs.readFile('D:/Git/web-note/html/Thinkphp5.1.html', (error, data) => {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
//   const f2 = yield new Promise((resolve, reject) => {
//     fs.readFile('D:/Git/web-note/html/vuex.html', (error, data) => {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
//   console.log(f1.toString());
//   console.log(f2.toString());
// };
// const asyncG = async function () {
//   const f1 = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1);
//     }, 1000);
//   });
//   const f2 = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2);
//     }, 1000);
//   });
//   console.log(f1);
//   console.log(f2);
// };
// asyncG();
// // const instance = generator();
// // instance.next().value.then(data => {
// //   instance.next(data).value.then(data => {
// //     instance.next(data);
// //   });
// // });

// // const asyncReadFile = async function () {
// //   const f1 = await readFile('D:/Git/web-note/html/Thinkphp5.1.html');
// //   const f2 = await readFile('D:/Git/web-note/html/vuex.html');
// //   console.log(f1.toString());
// //   console.log(f2.toString());
// // };
// // asyncReadFile();

// // const asyncG = async function () {
// //   const f1 = await 1;
// //   const f2 = await 2;
// //   return f1 + f2;
// // }
// // asyncG().then(result => {
// //   console.log(result);
// // });
// // let p = Promise.resolve();
// // const arr = [1, 2, 3].map(el => new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     if (el === 3) reject(el);
// //     resolve(el);
// //   }, 1000);
// // }));

// // for (let k of arr) {
// //   p = p.then(data => {
// //     return k.then(data => {
// //       console.log(data);
// //     });
// //   });
// // }
// 
// 
// const gen = function* () {
//   const a = yield new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 a');
//     }, 1000);
//   });
//   const b = yield new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 b');
//     }, 1000);
//   });
//   const c = yield new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 c');
//     }, 1000);
//   });
// };

// const instance = gen();
// let str = '';
// instance.next().value.then(data => {
//   str += data;
//   instance.next().value.then(data => {
//     str += data;
//     instance.next().value.then(data => {
//       str += data;
//       console.log(str);
//     });
//   });
// });
// for (let g of instance) {
//   g.then(data => {
//     console.log(data);
//   });
// }
// const asyncFun = async function () {
//   const a = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 a');
//     }, 1000);
//   });
//   const b = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 b');
//     }, 1000);
//   });
//   const c = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('我是 c');
//     }, 1000);
//   });
//   return a + b + c;
// }
// asyncFun().then(result => {
//   console.log(result);
// });
// async function asyncFun (arr) {
//   let data;
//   for (let el of arr) {
//     data = await new Promise((resolve, reject) => {
//       // 耗时间的异步操作
//       setTimeout(() => {
//         resolve(el);
//       }, 1000);
//     });
//     console.log(data);
//   }
// }
// asyncFun([1, 2, 3]);

// const arr = [1, 2, 3].map(el => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(el);
//     }, 1000);
//   });
// });
// async function asyncFun (arr) {
//   let data;
//   for (let el of arr) {
//     data = await el;
//     console.log(data);
//   }
// }
// asyncFun(arr);
async function asyncFun (arr) {
  const newArr = arr.map(el => {
    return new Promise((resolve, reject) => {
      // 耗时间的异步操作
      setTimeout(() => {
        resolve(el);
      }, 1000);
    });
  });
  let data;
  for (let el of newArr) {
    data = await el;
    console.log(data);
  }
}
asyncFun([1, 2, 3]);