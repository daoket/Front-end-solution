function myRequire(deps, callback) {
  //记录模块加载数量
  var ready = 0;
  //创建脚本标签
  function load(url) {
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    return script;
  }
  var nodes = [];
  for(var i = deps.length - 1; i >= 0; i--) {
    nodes.push(load(deps[i]));
  }
  //加载脚本
  for(var i = nodes.length - 1; i >= 0; i--) {
    nodes[i].addEventListener("load", function(event) {
      ready++;
      //如果所有依赖脚本加载完成，则执行回调函数；
      if(ready === nodes.length) {
        callback()
      }
    }, false);
    document.head.appendChild(nodes[i]);
  }
}

myRequire(["./js/module1.js", "./js/module2.js"], function(){
  console.log("ready!");
});