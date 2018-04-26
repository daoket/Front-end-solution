//1.写一个require函数，循环遍历第一个参数数组
//2.每一次循环动态创建一个script标签，src="scripts/m/moduleA"
//3.把这个script最终appendTo head中去
//4.设置一个变量0  变量++
//
var require = (function(){
	var req = requirejs = function(deps,callback){
	  // 检测参数
		if(deps instanceof Array&&callback instanceof Function){
			var tasks = [];
			for(var i=0;i<deps.length;i++){
				tasks.push(req.newPromise(config,deps[i]));
			}
			Promise.all(tasks).then(function(res){
				callback(res)
			}).catch(function(err){
				console.error(err)
			});
		}
	}
	var config = {
		baseUrl : "./",
		scriptType : "text/javascript",
		charset : "utf-8",
		xhtml : false
	};
	req.config = function(options){
		for(var prop in options){
			config[prop] = options[prop];
		}
	}
	req.newPromise = function(config,moduleName){
		var head = document.getElementsByTagName('head')[0]
		return new Promise(function(resolve,reject){
			var node = req.createNode(config,moduleName)
			node.addEventListener('load', function(){
				resolve(moduleName);
			}, false);
			node.addEventListener('error', function(){
				reject(moduleName);
			}, false);
			node.src = req.createUrl(config,moduleName)
			head.appendChild(node);
		})
	}
	req.createUrl = function(config,moduleName){
		return config.baseUrl+moduleName+".js";
	}
	req.createNode = function (config, moduleName) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
		document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = config.charset||'urf-8';
        node.async = true;
        node.setAttribute('data-requiremodule', moduleName);
        return node;
    };
	return requirejs;
})();