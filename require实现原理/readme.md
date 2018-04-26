实现原理：

1. 每require一次创建一个script标签
2. 使用Promise完成异步读取，读取完成进行callback