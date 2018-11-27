function Hammer(i){
	this.body = document.getElementsByTagName('body')[0];
	this.dom= document.createElement("canvas");
	this.maxWidth = document.documentElement.clientWidth || document.body.clientWidth;
	this.maxHeight = document.documentElement.clientHeight || document.body.clientHeight;
	this.arrOk=[];
	this.body.append(this.dom);
	this.context = this.dom.getContext("2d");
	this.video = document.getElementById('video');
	this.index=i;
	this.row = Math.floor(i/3);
	this.col = Math.floor(i%3);
	this.init();
}
Hammer.prototype.init=function(){
	var that = this;
	this.dom.setAttribute("width",107);
	this.dom.className="cas";
	this.dom.setAttribute("height",80);
	this.dom.setAttribute("data-index",i);
	this.dom.style.transform = "rotate("+randomNumber(0,20)+"deg)";
	this.dom.style.position = "absolute";
	this.dom.style.left=randomNumber(0,this.maxWidth-this.dom.getAttribute("width"))+"px";
	this.dom.style.top=randomNumber(0,this.maxHeight-this.dom.getAttribute("height"))+"px";
	this.add();
	setInterval(function(){
		that.context.drawImage(that.video,that.col*107,that.row*80,107,80,0,0,107,80);
	},50)
}
Hammer.prototype.add=function(){
	var that = this;
	var z=1;
	this.hammer = $(".cas").hammer();
	this.hammer.on("panstart",function(ev){
		$(this).attr("data-top",$(this).offset().top);
		$(this).attr("data-left",$(this).offset().left);
		$(this).data("position",$(this).offset());
		$(this).css("z-index",z++);
	})
	this.con = document.getElementsByClassName('container');
	this.con[this.index].setAttribute("data-index",this.index);
	this.hammer.on("panmove",function(ev){
		var top = $(this).data("position").top;
		var left = $(this).data("position").left;
		$(this).css("left",left+ev.gesture.deltaX);
		$(this).css("top",top+ev.gesture.deltaY);
	})
	this.hammer.on("panend",function(ev){
		// ��ȡ�ƶ�Ԫ�ص����ĵ�����:
		// var centerX=���Զ�λ����x+(�ƶ�����)+���һ��
		// var centerY=���Զ�λ����Y+(�ƶ�����)+�߶�һ��
		var centerX=$(this).data("position").left+ev.gesture.deltaX+($(this).width()/2);
		var centerY=$(this).data("position").top+ev.gesture.deltaY+($(this).height()/2);
		// console.log(that.index)
		var container = document.getElementsByClassName('container');
		for (var i = 0; i < $(".container").length; i++) {
			var t = $(".container").eq(i).offset().top;
			var t1 = $(".container").eq(i).offset().top+$(".container").eq(i).height();
			var l=$(".container").eq(i).offset().left;
			var l1=$(".container").eq(i).offset().left+$(".container").eq(i).width();
			if (centerX>l && centerX<l1 && centerY>t && centerY<t1) {
				$(this).css({
					"left":l+"px",
					"top":t+"px",
					"transform":"rotate(0deg)",
				})
				// console.log($(this).attr("data-index")-1+"i��ֵ"+i)
				// console.log("this.data-index"+$(this).attr("data-index")+"  "+i)
				if( $(this).attr("data-index") == i){
    				//���arrOK��û�������ţ���ӽ�ȥ
    				if( that.arrOk.indexOf($(this).attr("data-index")) == -1){
    					that.arrOk.push($(this).attr("data-index"));
    					// console.log($(this).attr("data-index"))
    				}
    			}else{
    				//����û��ְ���ȷ��ŵ�ͼƬ�ϳ�ȥ�ˣ����arrOK��ȥ����
    				if( that.arrOk.indexOf($(this).attr("data-index")) != -1){
    					that.arrOk.splice(that.arrOk.indexOf($(this).attr("data-index")),1);
    				}
    			}
			}
		}
		if( that.arrOk.length == 9){
	       	alert("end")
	    }
	})
}
for (var i = 0; i < 9; i++) {
	new Hammer(i);
	
}

// �������
function randomNumber(min, max){
	return Math.floor( Math.random()*(max-min) + min);
}