/**
 * Created by Chun on 2017/2/4.
 */
window.onload = function () {
    var startB = true;
    var gameOverB = false;
    var logoIndex = true;
    /*true为网上递减，false为往下递增*/
    var birdIndex = 0;
    var speedY = 0;
    var imgageIndex = 0;
    var arr = ["img/bird0.png", "img/bird1.png", "img/down_bird0.png",
        "img/down_bird1.png", "img/up_bird0.png", "img/up_bird1.png"];
    var add = function (addNum) {
        return ++addNum;
    }
    var sub = function (sunNum) {
        return --sunNum;
    }
    /*创建元素*/
    var cElement = function (elName) {
        return document.createElement(elName);
    }
    /*创建小鸟*/
    var createBird = function () {
        var myBird = cElement("div");
        myBird.className = "myBird";
        document.getElementById("fallBird").appendChild(myBird);
    }
    var spaceBird = function (ev) {
        var eventObj = ev || event;
        var bird = document.getElementsByClassName("myBird");
        if (eventObj.keyCode == 32 && bird.length != 0) {
            bird[0].style.top = bird.offsetTop + speedY + "px";
        }
    }
    var clickBird = function () {
        var bird = document.getElementsByClassName("myBird");
        if (bird.length != 0) {
            bird[0].style.top = bird.offsetTop +speedY + "px";
        }

    }
    var fly = function () {
        var myBird = document.getElementsByClassName("myBird")[0];
        speedY+=0.5;
        myBirdT = myBird.offsetTop;
        if (myBirdT < 401) {
            myBird.style.top = myBirdT + "px";
        }
        if (myBirdT >= 400) {
            /*游戏完了*/
            return;
        }
        myBird.style.background = "url(" + arr[imgageIndex++] + ") no-repeat";
        if (imgageIndex == 2) {
            imgageIndex = 0;
        }
    }
    var move = function () {
        var banner = document.getElementById("banner");
        var bannerLeft = banner.offsetLeft;
        banner.style.left = bannerLeft - 3 + "px";
        if (bannerLeft < -330) {
            banner.style.left = "0px";
        }
        var start = document.getElementById("start");
        //设置小鸟动画
        var logoBird = document.getElementsByClassName("logoBird")[0];

        logoBird.style.background = "url(" + arr[birdIndex++] + ")" + " no-repeat";
        if (birdIndex > arr.length - 1) {
            birdIndex = 0;
        }

        var logo = document.getElementById("logo");
        var logoTop = logo.offsetTop;
        if (logoTop >= -1) {
            if (logoIndex) {
                logoTop = sub(logoTop);
                if (logoTop < 0) logoIndex = false
            } else {
                logoTop = add(logoTop);
                if (logoTop > 45) logoIndex = true;
            }
            logo.style.top = logoTop + "px";
        }
    }

    function moveBird(Bird) {
        setInterval(fly, 50);
    }

    document.onclick = clickBird;
    document.onkeydown = spaceBird;
    setInterval(move, 100);
}
