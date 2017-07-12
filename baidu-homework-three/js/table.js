var flag = true
var isEditMode = true
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


    readTextFile("../baidu-homework-three/data/table.json", function(text){
        var data = JSON.parse(text);
        var tbody_node = document.getElementsByTagName("tbody")[0]
        for(data_obj of data) {
            var tr = document.createElement("tr")
            tr.setAttribute("data-id",data_obj.id)
            var td = document.createElement("td")
            td.innerHTML = data_obj.name
            tr.appendChild(td)
            td = document.createElement("td")
            td.innerHTML = data_obj.content
            tr.appendChild(td)
            td = document.createElement("td")
            td.innerHTML = data_obj.value
            tr.appendChild(td)
            td = document.createElement("td")
            var btn = document.createElement("button")
            btn.innerHTML = "编辑"
            btn.className = "edit-btn"
            td.appendChild(btn)
            btn = document.createElement("button")
            btn.innerHTML = "删除"
            btn.className = "del-btn"
            td.appendChild(btn)
            tr.appendChild(td)
            tbody_node.append(tr)
        }
    })

    var tbody_node = document.getElementsByTagName("tbody")[0]
    // 获取父节点，并为它添加一个click事件
    tbody_node.addEventListener("click",function(e) {
        // 检查事件源e.targe是否为Li
        if(e.target && e.target.nodeName.toUpperCase() == "BUTTON") {
            if (e.target.className == "edit-btn") {
                isEditMode = true
                var id = e.target.parentNode.parentNode.getAttribute('data-id')
                var name = e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML
                var content = e.target.parentNode.previousSibling.previousSibling.innerHTML
                var value = e.target.parentNode.previousSibling.innerHTML
                document.getElementsByClassName("u-fm")[0].innerHTML = '' +
                  '<div class="u-fm f-cb"> ' +
                  '<span>Name</span> ' +
                  '<input type="text" class="tb-name">' +
                  ' </div> ' +
                  '<div class="u-fm f-cb"> ' +
                  '<span>Content</span> ' +
                  '<input type="text" class="tb-content"> ' +
                  '</div> ' +
                  '<div class="u-fm f-cb">' +
                  '<span>Value</span>' +
                  '<input type="text" class="tb-value">' +
                  '</div>'

                document.getElementsByClassName("g-hide")[0].setAttribute("data-id", id)
                document.getElementsByClassName("tb-name")[0].value = name
                document.getElementsByClassName("tb-content")[0].value = content
                document.getElementsByClassName("tb-value")[0].value = value
                document.getElementsByClassName("g-hide")[0].className = "g-hide active"

            }
            else if (e.target.className == "del-btn") {
                isEditMode = false
                var id = e.target.parentNode.parentNode.getAttribute('data-id')
                var name = e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML
                document.getElementsByClassName("u-fm")[0].innerHTML = '<p class="tb-del-name">' + '确认删除' + name + '么？' + '</p>'
                document.getElementsByClassName("g-hide")[0].setAttribute("data-id", id)
                document.getElementsByClassName("g-hide")[0].className = "g-hide active"
            }

        }
    })

    document.getElementsByClassName("tb-submit")[0].onclick = function () {
        if(isEditMode)
        {
            var id = document.getElementsByClassName("active")[0].getAttribute("data-id")
            var name = document.getElementsByClassName("tb-name")[0].value
            var content = document.getElementsByClassName("tb-content")[0].value
            var value = document.getElementsByClassName("tb-value")[0].value
            changeSubmitRow(id, name, content, value)
            document.getElementsByClassName("active")[0].className = "g-hide"
        }
        else
        {
            var id = document.getElementsByClassName("active")[0].getAttribute("data-id")
            RemoveSubmitRow(id)
            document.getElementsByClassName("active")[0].className = "g-hide"
        }
    }

    document.getElementsByClassName("tb-close")[0].onclick = function () {
        document.getElementsByClassName("active")[0].className = "g-hide"
    }

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

// read json file
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

function changeSubmitRow(id, name, content, value) {
    var tbody_node = document.getElementsByTagName("tbody")[0]
    var tr_node = tbody_node.getElementsByTagName("tr")[id-1]
    tr_node.childNodes[0].innerHTML = name
    tr_node.childNodes[1].innerHTML = content
    tr_node.childNodes[2].innerHTML = value
}

function RemoveSubmitRow(id) {
    var tbody_node = document.getElementsByTagName("tbody")[0]
    var tr_node = tbody_node.getElementsByTagName("tr")
    for(var i = 0; i < tr_node.length; i++){
        if(tr_node[i].getAttribute("data-id") == id)
        {
            tbody_node.removeChild(tr_node[i])
            break
        }
    }
}