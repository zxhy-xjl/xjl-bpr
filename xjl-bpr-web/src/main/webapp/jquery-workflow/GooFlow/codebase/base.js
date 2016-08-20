/**
 * 
 * 初始加载基本操作
 * @author linhd
 */
  var testa = new Array();
    testa[0]="demo1";
    testa[1]="demo1";
    testa[2]="demo1";
    testa[3]="demo4";
    testa[4]="demo5";
    var graphicid = new Array(); //存放每个图形的id
    var i=0,o=0,p=0;      //数组长度计数
    var startnum = new Array(); //存放工作区的所有开始节点
	var property = {
		width : 1200,
		height : 500,
		toolBtns : [ "start round", "end", "task", "node", "chat", "state",
				"plug", "join", "fork", "complex mix" ],
		haveHead : true,
		headBtns : [ "new", "open", "save", "undo", "redo", "reload" ],//如果haveHead=true，则定义HEAD区的按钮
		haveTool : true,
		haveGroup : true,
		useOperStack : true
	};
	var remark = {
		"cursor" : "选择指针",
		"direct" : "转换连线",
		"start" : "受理",
		"end" : "办结",
		"task" : "审核",
		"node" : "现场勘验",
		"chat" : "初审",
		"state" : "公示",
		"plug" : "复审",
		"fork" : "分支结点",
		"join" : "联合结点",
		"complex" : "复合结点",
		"group" : "组织划分框编辑开关"
	};
	var demo;
	//初始化
	$(document).ready(function() {
		demo = $.createGooFlow($("#demo"), property);
		demo.setNodeRemarks(remark);
 		 jsondata = {
			"nodes" : {
				"demo_node_999" : {
					"name" : "起始1",
					"left" : 51,
					"top" : 29,
					"type" : "start round",
					"width" : 24,
					"height" : 24,
					"alt" : true
				},
		
				"demo_node_909" : {
					"name" : "起始4",
					"left" : 49,
					"top" : 230,
					"type" : "start round",
					"width" : 24,
					"height" : 24,
					"alt" : true
				}
			},
			"lines" : {},
			"areas" : {}
		};
		demo.loadData(jsondata);
		//设置左上角主题
		demo.setTitle("kill you");
		//绑定打开按钮
		demo.onBtnOpenClick=function(){
			
			alert("aaaa");
			//demo.clearData();	
			
		};
		
 		//设置点击节点触发的事件
 	  	demo.onItemFocus = function (id,type){		
 	  		var uu = $("div.rs_close");
 	  		var bbb =uu[0];
 	  		var ccc =uu[0].parentNode;
 	  		for(var i=0;i<uu.length;i++)
 	  			{
 	  			uu[i].parentNode.style.display="none"; 	  			
 	  			}
 	  		//alert(uu);
			document.all.formdiv.style.display=""
			//document.getElementById("segname").value=id;
			var aaa =demo.getItemInfo(id,type);
			document.getElementById("segname").value=aaa.name;
			var tmp =document.getElementById(id).childNodes[1];
			document.getElementById(id).childNodes[1].style.display="block";
			var abc = this;
			//alert(tmp);
			//alert("asda");
			
		};   

		document.all.formdiv.style.display="none";
	});
	
	
	//根据工作区元素以JSON格式导出
	function Export() {
		document.getElementById("result").value = JSON.stringify(demo.exportData());
	}
	
	//根据JSON导入工作流元素
	function Import(){
	var data = document.getElementById("result").value;	
	if(data!=null&&data!="")
	{       
		i=0;
		var datab=eval('('+data+')');
		var demodata =demo.exportData();
		var str1 = JSON.stringify(datab);
		var str2 = JSON.stringify(demodata);
		if(str1==str2)
			return;
		for (var key in datab.nodes)
			{
			graphicid[i] = key;
			i++;
			}
		for (var key in demodata.nodes)
		{
		for(var m=0;m<graphicid.length;m++)
			{
			if(graphicid[m]==key)
				{
				alert("有重复的id,请检查输入的json字符串!");
				//清空数组元素
				graphicid.length=0;
				return;
				}	
			}
		}
				demo.loadData(datab);
				graphicid.length=0;
	}
	}

	//清除工作区
	function clearAll(){
		//demo.onItemFocus(demo_node_999,"node")=tmptest();
		demo.clearData();	
	}
	
	//一键优化
	function optimize()
	{   
		o = 0;
		p = 0;
		var demodata = demo.exportData();
		for ( var key in demodata.nodes) {
			startnum[o] = demodata.nodes[key].type;
			o++;
		}
		for (var b = 0; b < startnum.length; b++) {
			startnum[b] == "start round";
			p++;
			b++;
		}
		if (p > 0) {

			alert("important!");
		}

	}
	
		function test()
	{
		
	var aaaa=unique(testa);
		alert(aaaa.length);
	}
	
	//数组去重
	function unique(arr) {
	    var result = [], hash = {};
	    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
	        if (!hash[elem]) {
	            result.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return result;
	}