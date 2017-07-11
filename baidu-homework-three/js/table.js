var flag = true
window.onload = function () {
    // add left list
    var obj = document.getElementsByClassName("g-li")[0]
    var ul = document.createElement("ul")
    //usage:
    readTextFile("../baidu-homework-three/data/list.json", function(text){
        var data = JSON.parse(text);
        var index = 0
        for(data_obj of data)
        {
            var title = data_obj.title
            // var subtitle = data_obj.subtitle
            var li = document.createElement("li")
            li.innerHTML = title
            li.setAttribute("data-id",index)
            li.className = "title"
            ul.appendChild(li)

            var sub_ul = document.createElement("ul")
            var sub_data = data_obj.subtitle
            for(sub_data_obj of sub_data){
                var li = document.createElement("li")
                li.innerHTML = sub_data_obj
                sub_ul.appendChild(li)
                sub_ul.className = "sub-ul"
            }
            ul.appendChild(sub_ul)
            index ++
        }
        obj.appendChild(ul)
    });

    // 获取父节点，并为它添加一个click事件
    ul.addEventListener("click",function(e) {
        // 检查事件源e.targe是否为Li
        if(e.target && e.target.nodeName.toUpperCase() == "LI" && e.target.className == "title" ) {
            if(e.target.nextSibling.className == "sub-ul")
                e.target.nextSibling.className = "sub-ul-active"
            else
                e.target.nextSibling.className = "sub-ul"
        }
    })
}

window.onscroll = function () {
    // console.log(document.getElementsByClassName("g-ct")[0].offsetTop)
    if(document.getElementsByClassName("g-ct")[0].getBoundingClientRect().top <= 0)
    {
        document.getElementsByTagName("thead")[0].style.position = "fixed"
        document.getElementsByTagName("thead")[0].style.top = "-1px"
        document.getElementsByTagName("thead")[0].style.marginLeft = "-1px"
        if(flag)
        {
            getchildWidth()
            flag = false
        }

    }
    else
    {
        document.getElementsByTagName("thead")[0].style.position = "relative"
        document.getElementsByTagName("thead")[0].style.top = "auto"
        flag = true
    }
    setScrollHeight()
}

// set table fixed header
function getchildWidth() {
    var td_nodes = document.getElementsByTagName("tr")[1].children
    var thead_nodes =  document.getElementsByTagName("tr")[0].children
    var i = 0
    for(td_node of td_nodes)
    {
        var w = td_node.offsetWidth
        thead_nodes[i].style.width = w + 'px'
        i ++
    }
}

// set left scroll height
function setScrollHeight() {
    var h = window.innerHeight - document.getElementsByClassName("g-ct")[0].getBoundingClientRect().top
    document.getElementsByClassName("g-li")[0].style.height = h + 'px'
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

