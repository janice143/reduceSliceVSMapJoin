# 哪种更好

## 背景

我有一个对象数组，我需要拼接成一个字符串，最终打印出我想要的信息。第一次我的方法是使用 reduce+slice，第二次我使用 map+join。哪种方法更好？

```java
// 方法1：reduce, slice
const customMsg = commandMessages.reduce((pre, cur) =>
 pre + `${cur.shopCode}：${cur.message}、`, '');
message.warning(customMsg.slice(0, -1));

// 方法2：map, join
const customMsg = commandMessages
  .map((item) => `${item.shopCode}：${item.message}`)
  .join('、');
message.warning(customMsg)
```

## 分析

1. 可读性

两个方法的可读性差不多，但是 reduce 方法和 map 方法的使用频率比，后者会高一点，如果非要说哪个可读性更好，方法 2 会好一点。

2. 性能

- benchmark.js 测量：`npm run test:bench`

代码在 test1/1_bench.js 文件中，从结果可知，reduce_slice 性能更好。

- performance api 测量:`npm run test:performance`

代码在 test1/2_performance.js 文件中，该方法适合大的数据量，因为精度高，小样本会使得结果很大的波动。

## 结论

从可读性将，map 会好一点。从性能讲，reduce 更好一点。

## 结论

从可读性将，map 会好一点。从性能讲，reduce 更好一点。
