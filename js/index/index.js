/**Created by HY on 2017/7/30.*/

$(()=>{
    //欢迎回来
    //获取当前回话中是否存储登陆者的用户名，如果存在
    var n=sessionStorage.getItem("uname");
//登陆后页面的header中id 为login的p元素改变内容，（欢迎xx登陆，）
if(n){
    login.innerHTML=`<a href="#" class="star">收藏宝贝网</a>
        &nbsp;&nbsp;您好!欢迎 ${n} 登陆`;
};
//功能1：图片轮播
    /*广告图片数组*/
    var imgs=[];
        $.ajax({
            url:"data/index/banner.php",
            type:"GET",
            async:false,
            success:function(data) {
                $.each(data,function(idx,obj){
                    imgs.push(obj.pic)
                });
            },
            error:function(){
                alert("网络出错，请检查");
            }
        });
const LIWIDTH=1920,
    INTERVAL=1500,
    WAIT=3000;
var $ulImgs=$("#imgs"),
    $ulIdxs=$("#indexs");
//设置$ulImgs（ul）的内容和样式
$ulImgs.html(
`<li><a href="freegoods.html">
    <img src="${
imgs.join(
    '"></a></li><li><a href="packets.html"><img src="')
}">
</a></li>`
+`<li><a href="makemoney.html"><img src="${imgs[0]}"/></a></li>`
).css(
    "width",LIWIDTH*(imgs.length+1));
//设置$ulIdxs（1，,2，。。）的内容
$ulIdxs.html(()=>{
    var str="";
for(var i=1;i<=imgs.length;i++){
    str+=`<li>${i}</li>`
}
return str;
}).children(":first")
    .addClass("hover");
var moved=0;
var timer=null;
var canMove=true;
//设定定时器，通过移动步数和向左移动的距离来实现轮播
function move(){
    if(canMove) {
        timer = setTimeout(()=> {
                moved++;
        $ulImgs.animate({
            left: -LIWIDTH * moved
        }, INTERVAL, ()=> {
            if (moved < imgs.length) {
            $ulIdxs.children(`:eq(${moved})`)
        .addClass("hover")
                .siblings()
                .removeClass("hover");
        } else {
            moved = 0;
            $ulImgs.css("left", 0);
            $ulIdxs.children(":first")
                .addClass("hover")
                .siblings()
                .removeClass("hover")
        }
        move();
    });
}, WAIT);
}
};
move();
//当鼠标悬停在轮播图片时，图片停止轮播
$("#slider").hover(
    ()=>{
    clearTimeout(timer);
timer=null;
canMove=false;
},
()=>{
    canMove=true;
    move();
}
);
//当鼠标略过index时图片滑动到对应的图片位置
$ulIdxs.on("mouseover","li",e=>{
    var $li=$(e.target);
$li.addClass("hover")
    .siblings()
    .removeClass("hover");
moved=$li.index();
$ulImgs.stop(true).animate({
    left:-LIWIDTH*moved
},INTERVAL);
});
//下拉菜单
$("li.dropdown").mouseover(function(){
    var $this=$(this);
    $this.children().last().css("height",50);
})
    .mouseout(function(){
        var $this=$(this);
        $this.children().last().css("height",0);
    });


    //功能2：发送ajax请求获取1楼商品列表动态生成商品列表
    function first(){
        $.ajax({
            url:"data/index/first.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <li>
                            <dl>
                                <dt>
                                    <a href="${obj.fid}"><img src="${obj.fpic}"/></a>
                                    <a href="${obj.fid}">免费申请</a>
                                </dt>
                                <dd><a href="${obj.fid}">${obj.fname}</a></dd>
                                <dd>
                                    <p>
                                        赠送:
                                        <span>${obj.copies}</span>份
                                        <s>&yen;${obj.price}</s>
                                    </p>
                                    <span><img src="images/tBao.png" alt=""/></span>
                                </dd>
                            </dl>
                        </li>
                        `;
                });
                $("ul.firstList").html(html);
            },

            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    first();

//功能3：发送ajax请求获取2楼商品列表动态生成商品列表
    function second(){
        $.ajax({
            url:"data/index/second.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <li>
                                <dl>
                                    <dt><a href="${obj.pid}"><img src="${obj.pic}" alt=""/></a></dt>
                                    <dd><a href="${obj.pid}">${obj.pname}</a></dd>
                                    <dd>限量： ${obj.copies}份</dd>
                                    <dd>
                                        <span>奖励红包：${obj.packet}元</span>
                                        <a href="#">立即参与</a>
                                    </dd>
                                </dl>
                            </li>
                        `;
                });
                $("ul.secondList").html(html);
            },

            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    second();

//功能4：发送ajax请求获取3楼商品列表动态生成商品列表
    function third(){
        $.ajax({
            url:"data/index/third.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <li>
                                <dl>
                                    <dt><a href="${obj.mid}"><img src="${obj.pic}" alt=""/></a></dt>
                                    <dd><a href="${obj.mid}">${obj.mname}</a></dd>
                                    <dd>限量： ${obj.copies}份</dd>
                                    <dd>
                                        <span>奖励：&yen;${obj.packet}</span>
                                        <a href="${obj.mid}">立即参与</a>
                                    </dd>
                                </dl>
                            </li>
                        `;
                });
                $("ul.thirdList").html(html);
            },

            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    third();
//功能5：发送ajax请求获取轮播下最新试用商品列表，动态生成商品列表
    function free(){
        $.ajax({
            url:"data/index/free.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <dl>
                            <dt><a href="${obj.fid}"><img src="${obj.fpic}"/><b></b></a></dt>
                            <dd class="firstDd"><a href="${obj.fid}">${obj.fname}</a></dd>
                            <dd class="lastDd">
                                <span><b class="bColor">&yen;<b class="bFont">${obj.price}</b></b> <s class="sGray">&yen;${obj.price}</s> 限量：${obj.copies}份</span>
                                <a href="${obj.fid}" class="aColor">
                                    免费申请
                                    <b class="rect"></b>
                                </a>
                            </dd>
                        </dl>
                        `;
                });
                $("div.free").html(html);
            },

            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    free();
//功能6：发送ajax请求获取轮播下红包活动商品列表，动态生成商品列表
    function packet(){
        $.ajax({
            url:"data/index/packet.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <dl>
                            <dt><a href="${obj.pid}"><img src="${obj.pic}"/><b></b></a></dt>
                            <dd class="firstDd"><a href="${obj.pid}">${obj.pname}</a></dd>
                            <dd class="lastDd">
                                <span><b class="bColor">&yen;<b class="bFont">${obj.packet}</b></b> <s class="sGray">&yen;${obj.price}</s> 限量：${obj.copies}份</span>
                                <a href="${obj.pid}" class="aColor">
                                    免费参与
                                    <b class="rect"></b>
                                </a>
                            </dd>
                        </dl>
                        `;
                });
                $("div.packet").html(html);
            },

            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    packet();

//功能7：发送ajax请求获取轮播下天天赚商品列表，动态生成商品列表
    function money(){
        $.ajax({
            url:"data/index/money.php",
            type:"GET",
            success:function(data){
                var html="";
                $.each(data,function(idx,obj){
                    html+=`
                        <dl>
                            <dt><a href="${obj.mid}"><img src="${obj.pic}"/><b></b></a></dt>
                            <dd class="firstDd"><a href="${obj.mid}">${obj.mname}</a></dd>
                            <dd class="lastDd">
                                <span ><b class="bColor">&yen;<b class="bFont">${obj.packet}</b></b> <s class="sGray">&yen;${obj.price}</s> 限量：${obj.copies}份</span>
                                <a href="${obj.mid}" class="aColor">
                                    免费参与
                                    <b class="rect"></b>
                                </a>
                            </dd>
                        </dl>
                        `;
                });
                $("div.money").html(html);
            },
            error:function(){
                alert("网络出错，请检查");
            }
        })


    }
    money();

//功能8 ：绑定class为shopList的ul的mouseenter事件，切换主体
    $('ul.shopList').on('mouseenter','a',(e)=>{
        var tar=$(e.target);
        e.preventDefault();
        var id=tar.attr("id");
        tar.addClass("active").parent().siblings().children().removeClass("active");
       $(`.${id}`).addClass("show").removeClass("hide").siblings().addClass("hide").removeClass("show");
        const w=92;
        var i=tar.parent().index();
            $("span[class='mouseenter']").css('left',i*w+10);
        });


//这个js全是一些小的特效
/* mouse 鼠标点击特效*/
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array("爱国","守法","爱岗","敬业","我爱你","你爱我吗?", "你最帅啦");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            1500,
            function() {
                $i.remove();
            });
    });
});

})