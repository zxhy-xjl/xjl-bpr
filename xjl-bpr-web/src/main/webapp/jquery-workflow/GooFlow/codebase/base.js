/**
 * 
 * 初始加载基本操作
 * @author linhd
 */

var isIe = (document.all) ? true : false;
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
	
	function setSelectState(state)

	{

		var objl = document.getElementsByTagName('select');

		for (var i = 0; i < objl.length; i++)

		{

			objl[i].style.visibility = state;

		}

	}
	//弹出方法
	function showMessageBox(wTitle, content, wWidth)

	{

		closeWindow();

		var bWidth = parseInt(document.documentElement.scrollWidth);

		var bHeight = parseInt(document.documentElement.scrollHeight);

		if (isIe) {

			setSelectState('hidden');
		}

		var back = document.createElement("div");

		back.id = "back";

		var styleStr = "top:0px;left:0px;position:absolute;background:#666;width:"
				+ bWidth + "px;height:" + bHeight + "px;";

		styleStr += (isIe) ? "filter:alpha(opacity=0);" : "opacity:0;";

		back.style.cssText = styleStr;

		document.body.appendChild(back);

		showBackground(back, 50);

		var mesW = document.createElement("div");

		mesW.id = "mesWindow";

		mesW.className = "mesWindow";

		mesW.innerHTML = "<div class='mesWindowTop'><table width='100%' height='100%'><tr><td>"
				+ wTitle
				+ "</td><td style='width:1px;'><input type='button' onclick='closeWindow();' title='关闭窗口' class='close' value='关闭' /></td></tr></table></div><div class='mesWindowContent' id='mesWindowContent'>"
				+ content + "</div><div class='mesWindowBottom'></div>";

		styleStr = "left:500"
				
				+ "px;height:400px;top:100" +  "px;position:absolute;width:" + wWidth
				+ "px;";

		mesW.style.cssText = styleStr;

		document.body.appendChild(mesW);

	}

	//让背景渐渐变暗
	function showBackground(obj, endInt)
	{
		if (isIe)

		{

			obj.filters.alpha.opacity += 1;

			if (obj.filters.alpha.opacity < endInt)
			{
				setTimeout(function() {
					showBackground(obj, endInt)
				}, 5);
			}
	} else {
			var al = parseFloat(obj.style.opacity);
			al += 0.01;
			obj.style.opacity = al;
			if (al < (endInt / 100))
			{
				setTimeout(function() {
					showBackground(obj, endInt)
				}, 5);
			}
		}
	}

	//关闭窗口
	function closeWindow()
	{
		if (document.getElementById('back') != null)
		{
		document.getElementById('back').parentNode.removeChild(document
					.getElementById('back'));
		}
		if (document.getElementById('mesWindow') != null)
		{
			document.getElementById('mesWindow').parentNode
					.removeChild(document.getElementById('mesWindow'));
		}
		if (isIe) {
			setSelectState('');
		}
	}

	//测试弹出
	function testMessageBox()
	{

	messContent = "<div style='padding: 30px 0 30px 120px;'><label>环节名称:</label><input id='impname' type='text' readonly='readonly' /><br /><br /><br /><label>要件名称:</label><select id='province' name='province' class='cascade_drop_down'><option value='select'>==请选择==</option><option value='shenqingshu'>公司登记（备案）申请书</option><option value='weituoshu'>指定代表或者共同委托代理人授权委托书</option><option value='zhangcheng'>全体股东签署的公司章程</option></select><br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;<label>审查项:</label><select style='vertical-align:top;' id='city' name='city' multiple='multiple' class='cascade_drop_down'></select><br/><br/><label>注意事项:</label><br/><input type='text' id='caution'/><br /><br /><br /><input type='button' style='width: 48px; margin-left: 120px;' value='完成' onclick='finish();' /><input type='hidden' id='province_next' name='province_next' value='city'><input type='hidden' id='city_next' name='city_next' value=''></div>";
		showMessageBox('选择审查项', messContent, 500);
	    $(".cascade_drop_down").change(
	            function () {
	                var name = $(this).attr("name") + "_next";
	                var next = $("#" + name).val();
	                if (next == null || next == '') {
	                    return;
	                }
	                
	                $("#" + next).empty();

	                $.ajax({
	                    type:'post',
	                    url: $(this).val() + '.txt',
	                    data:'name=' + name + '&val=' + $(this).val(),
	                    dataType:'text',
	                    success:function(msg){
	                        ops = msg.split("\n");
	                        for (i = 0; i < ops.length; i++) {
	                            $("#" + next).append(ops[i]);
	                        }
	                    },
	                    error:function(){
	                        alert("failed.");
	                    }
	                });
	            }
	        )
	        
	        document.getElementById("impname").value=document.getElementById("segname").value;
	}
	
	
	//选择审查项点击完成后操作
	function finish()
	{  
		
		
		var valname='';
		var province = document.getElementById("province");
		var city = document.getElementById("city");
		if(province.options[province.selectedIndex].text=='==请选择==')
			{
			alert("请填写要件名称！");
			return;
			}
		
		for(var i=0;i<city.options.length;i++)
		{if(city.options[i].selected)
			if(valname=='')
				valname = city.options[i].text;
			else
			valname = valname+','+city.options[i].text;
		}	
		if(valname=='')
			{
			alert("请填写审查项！");
			return;
			}
		//alert(document.getElementById("impname").value);
	document.getElementById("result").value="要件名称:"+province.options[province.selectedIndex].text+"\n\r"+"审查项:"+valname+"\n\r"+"注意事项:"+document.getElementById("caution").value;
	closeWindow();
		
		
	}