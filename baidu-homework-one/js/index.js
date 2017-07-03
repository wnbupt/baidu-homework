/**
 * Created by wangning on 2017/6/26.
 */

/* js version of navbar pull down*/
// var div_nodes = document.getElementsByClassName("m-title")
// for(let div_node of div_nodes)
// {
//     div_node.onmouseover = function (e) {
//         pullDown(e.currentTarget)
//     }
//     div_node.onmouseleave = function(e){
//         pullBack(e.currentTarget)
//     }
// }
//
// function pullDown(target) {
//     let img_node = target.getElementsByTagName("img")[0]
//     img_node.style.cssText = "-moz-transform:scaleY(-1); -webkit-transform:scaleY(-1); -o-transform:scaleY(-1);transform:scaleY(-1);"
//     let ul_node = target.getElementsByTagName("ul")[0]
//     ul_node.style.zIndex = 999
// }
// function pullBack(target) {
//     let img_node = target.getElementsByTagName("img")[0]
//     img_node.style.cssText = ""
//     let ul_node = target.getElementsByTagName("ul")[0]
//     ul_node.style.zIndex = -999
// }

/* fade in and out*/
setInterval(function () {
    setImage()
}, 2000);

// 替换class达到淡入淡出的效果
function fadeIn(e) {
    e.className = "u-bd-img fade-in"
};

function fadeOut(e) {
    e.className = "u-bd-img"
};

//申明图片数组中当前的轮播图片
var cur_img = 0;

function setImage() {
    //图片轮播函数
    var imgs = document.getElementsByClassName("m-bd-2")[0].children;
    var dots = document.getElementsByClassName("u-bd-dot")[0].children;
    if (cur_img == 3) {
        fadeOut(imgs[cur_img]);
        dots[cur_img].className = ""
        cur_img = 0;
        fadeIn(imgs[cur_img]);
        dots[cur_img].className = "f-bgc"
    } else {
        fadeOut(imgs[cur_img]);
        dots[cur_img].className = ""
        fadeIn(imgs[cur_img + 1]);
        cur_img++;
        dots[cur_img].className = "f-bgc"
    }

}


/* slide left and rigth */
// setInterval(function () {
//     setImage()
// }, 2000);
//
// var cur_img = 0;
//
// function setImage() {
//     //图片轮播函数
//     var box = document.getElementsByClassName("m-slide")[0]
//     var dots = document.getElementsByClassName("u-bd-dot")[0].children;
//     if (cur_img == 3) {
//         dots[cur_img].className = ""
//         cur_img = 0
//         dots[cur_img].className = "f-bgc"
//     } else {
//         dots[cur_img].className = ""
//         cur_img ++
//         dots[cur_img].className = "f-bgc"
//     }
//     box.style.marginLeft = (0 - cur_img) * 960 + "px";
//
// }

/* tab */
var tab_nodes = document.getElementsByClassName("u-bd-tab")
for(let tab_node of tab_nodes)
{
    tab_node.onclick = function (e) {
        changeTab(e.currentTarget)
    }
}
function changeTab(target)
{
    document.getElementsByClassName("z-selected")[0].className = "u-bd-tab"
    document.getElementsByClassName("f-show")[0].className = "u-bd-ct"

    target.className = "u-bd-tab z-selected"

    if(target.innerHTML.indexOf("ONE") > -1)
    {
        document.getElementsByClassName("u-bd-ct")[0].className = "u-bd-ct f-show"
    }
    if(target.innerHTML.indexOf("TWO") > -1)
    {
        document.getElementsByClassName("u-bd-ct")[1].className = "u-bd-ct f-show"
    }
    if(target.innerHTML.indexOf("THR") > -1)
    {
        document.getElementsByClassName("u-bd-ct")[2].className = "u-bd-ct f-show"
    }
    if(target.innerHTML.indexOf("FOR") > -1)
    {
        document.getElementsByClassName("u-bd-ct")[3].className = "u-bd-ct f-show"
    }
}

/* select */
document.getElementsByClassName("u-sl-1")[0].onchange = function (e) {
    var index = e.target.selectedIndex
    if(index === 1)
    {
        document.getElementsByClassName("u-sl-2")[0].innerHTML = "" +
            "<option>北京</option>" +
            "<option>上海</option>" +
            "<option>广州</option>";
    }
    if(index === 2)
    {
        document.getElementsByClassName("u-sl-2")[0].innerHTML = "" +
            "<option>洛杉矶</option>" +
            "<option>纽约</option>" +
            "<option>旧金山</option>";
    }
    if(index === 3)
    {
        document.getElementsByClassName("u-sl-2")[0].innerHTML = "" +
            "<option>伦敦</option>" +
            "<option>利物浦</option>" +
            "<option>曼彻斯特</option>";
    }
}