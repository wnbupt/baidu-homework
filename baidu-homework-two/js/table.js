var flag = true
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