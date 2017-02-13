/**
 * Created by Chun on 2017/1/26.
 */
window.onload = function () {
    var AllPipe = function (topP, bottomP) {
        this.topPipe = topP;
        this.bottomPipe = bottomP;
    }
    var fallBird = {
        pipeArr: [],
        startB: true,
        gameOverB: false,
        speedY: 1,
        grade: 0,
        birdWidth: 0,
        myBird: null,
        move: function () {
            var logoIndex = true;
            /*true为网上递减，false为往下递增*/
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
                if (fallBird.logoIndex) {
                    logoTop = fallBird.sub(logoTop);
                    if (logoTop < 0) fallBird.logoIndex = false
                } else {
                    logoTop = fallBird.add(logoTop);
                    if (logoTop > 45) fallBird.logoIndex = true;
                }
                logo.style.top = logoTop + "px";
            }
        },

        add: function (addNum) {
            return ++addNum;
        },
        sub: function (sunNum) {
            return --sunNum;
        },
        /*开始按键*/
        start: function () {
            fallBird.startB = false;
            // fallBird.gameOverB=true;
            var stratShow = document.getElementById("start");
            var gameOverShow = document.getElementById("gameOver");
            if (fallBird.startB) {
                stratShow.style.display = "block";
            } else {
                stratShow.style.display = "none"
            }
            fallBird.createBird();
            time5 = setInterval(fallBird.fall, 50);
            time4 = setInterval(createWater, 2500);
            time3 = setInterval(fallBird.pipe, 15);

            function createWater() {
                var h = parseInt(Math.random() * 180);
                /*创建上下水管*/
                var top = fallBird.cElement("div");
                var bottom = fallBird.cElement("div");
                var waterTop = fallBird.waterPipe(top, h + "px", "60px", "0px", "none", "img/up_mod.png", "img/up_pipe.png");
                var waterBottom = fallBird.waterPipe(bottom, "60px", 180 - h + "px", "none", "57px", "img/down_pipe.png", "img/down_mod.png");
                var b = new AllPipe(waterTop, waterBottom);
                // fallBird.a.push[b];
                fallBird.pipeArr.push(new AllPipe(waterTop, waterBottom));
            }
        },
        /*创建元素*/
        cElement: function (elName) {
            return document.createElement(elName);
        },
        /*创建小鸟*/
        createBird: function () {
            var myBird = fallBird.cElement("div");
            myBird.className = "myBird";
            document.getElementById("fallBird").appendChild(myBird);
        },
        fall: function () {
            fallBird.myBird = document.getElementsByClassName("myBird")[0];
            myBirdT = fallBird.myBird.offsetTop;
            fallBird.birdWidth = fallBird.myBird.offsetWidth;
            fallBird.speedY += 0.5;
            // myBirdT+=fallBird.speedY;
            if (myBirdT < 391) {
                fallBird.myBird.style.top = myBirdT + fallBird.speedY + "px";
            }
            if (myBirdT >= 390) {
                clearInterval(time5);
                fallBird.gameOver();
            }
        },
        spaceBird: function (ev) {
            var eventObj = ev || event;
            if (eventObj.keyCode == 32) {
                // var bird=document.getElementsByClassName("myBird")[0];
                // bird.style.top=bird.offsetTop+fallBird.speedY+"px";
                fallBird.speedY = -8;
            }
        },
        clickBird: function () {
            fallBird.speedY = -8;
        },
        waterPipe: function (pipe, topH, bottomH, top, bottom, imgT, imgB) {
            pipe.className = "waterPipe";
            pipe.style.top = top;
            pipe.style.bottom = bottom;
            var top = fallBird.cElement("div");
            top.style.height = topH;
            top.style.background = "url(" + imgT + ")";
            var bottom = fallBird.cElement("div");
            bottom.style.height = bottomH;
            bottom.style.background = "url(" + imgB + ")";
            pipe.appendChild(top);
            pipe.appendChild(bottom);
            // fallBird.pipeArr.push(pipe);
            return document.getElementById("fallBird").appendChild(pipe);

            // var time100=setInterval(function () {
            //     pipe.style.left=pipe.offsetLeft-1+"px";
            //     if(pipe.offsetLeft+pipe.offsetWidth<=0){
            //         console.log("hhh");
            //         pipe.remove();
            //         clearInterval(time100);
            //     }
            // },15);

        },
        pipe: function () {
            if (fallBird.pipeArr.length != 0) {
                for (var i = 0; i < fallBird.pipeArr.length; i++) {
                    /*碰撞判断*/
                    if (fallBird.pipeArr[i].topPipe.offsetLeft <= 40) {
                        var birdHeight = document.getElementsByClassName("myBird")[0].offsetHeight;
                        var birdOfffset = document.getElementsByClassName("myBird")[0].offsetTop;
                        if (birdOfffset <= fallBird.pipeArr[i].topPipe.offsetHeight || (birdOfffset + birdHeight) > fallBird.pipeArr[i].bottomPipe.offsetTop) {
                            fallBird.gameOver();
                        }
                    }

                    if (fallBird.pipeArr[i].topPipe.offsetLeft + 60 <= 0) {
                        fallBird.grade++;
                        fallBird.setScore(fallBird.grade);
                        fallBird.pipeArr[i].topPipe.remove();
                        fallBird.pipeArr[i].bottomPipe.remove();
                        fallBird.pipeArr.shift();
                    }
                    fallBird.pipeArr[i].topPipe.style.left = fallBird.pipeArr[i].topPipe.offsetLeft - 1 + "px";
                    fallBird.pipeArr[i].bottomPipe.style.left = fallBird.pipeArr[i].bottomPipe.offsetLeft - 1 + "px";
                }
                // console.log(fallBird.birdWidth+"正确分数：    "+fallBird.grade/2);
            }
        },
        setScore: function (score) {
            var myScore = document.getElementById("bigScore");
            myScore.innerHTML = "";
            var scoreStr = score.toString();
            for (i = 0; i < scoreStr.length; i++) {
                myScore.innerHTML = "<img src='img/" + scoreStr[i] + ".jpg'/>";
            }

        },
        gameOver: function () {
            fallBird.grade=12;
            var history = fallBird.getHistory(" bestScore");
            if (history < fallBird.grade) {
                fallBird.setHistory(" bestScore", fallBird.grade, 367);
                history=fallBird.grade;
            }
            clearInterval(time3);
            clearInterval(time4);
            clearInterval(time5);
            document.getElementsByClassName("nowScore")[0].innerHTML = fallBird.grade;
            document.getElementsByClassName("histroyScore")[0].innerHTML=history;/**/
            fallBird.grade = 0;
            document.getElementById("gameOver").style.display = "block";
            console.log("hahha");
        },
        reStart: function () {
            document.getElementsByClassName("myBird")[0].remove();
            for (i = 0; i < fallBird.pipeArr.length; i++) {
                fallBird.pipeArr[i].topPipe.remove();
                fallBird.pipeArr[i].bottomPipe.remove();
            }
            fallBird.pipeArr = [];
            document.getElementById("gameOver").style.display = "none";
            fallBird.start();
        },
        setHistory: function (bestScore, socre, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = bestScore + "=" + escape(socre) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },
        getHistory: function (cookieName) {
            var cookieArr = document.cookie.split(";");
            for (i = 0; i < cookieArr.length; i++) {
                var cookieName1 = cookieArr[i].split("=");
                console.log(cookieName1);
                if (cookieName1[0] == cookieName) return cookieName1[1];
            }
            return 0;
        },
        /*判断是否含有某个cookie值*/
        // getHistory:function (bestScore) {
        //     if(document.cookie.length>0){
        //         /*获取bestScore=  的位置*/
        //         var historeScoreStart=document.cookie.indexOf(bestScore+"=");
        //         if(historeScoreStart!=-1){
        //             /*获取cookie键为bestScore的值开始的位置*/
        //             historeScoreStart=bestScore.length+1+historeScoreStart;
        //             /*根据值开始的地方往后截取*/
        //             var historeScoreEnd=document.cookie.indexOf(";",historeScoreStart);
        //             if(historeScoreEnd!=-1) historeScoreEnd=document.onclick.length;
        //             return unescape(document.cookie.substring(historeScoreStart,historeScoreEnd));
        //         }
        //     }
        //     return 0;
        // },
    }
    document.getElementsByClassName("reStart")[0].addEventListener("click", fallBird.reStart);
    document.getElementById("startBtn").addEventListener("click", fallBird.start);
    document.onkeydown = fallBird.spaceBird;
    document.onclick = fallBird.clickBird;
    var birdIndex = 0;
    var arr = ["img/bird0.png", "img/bird1.png", "img/down_bird0.png",
        "img/down_bird1.png", "img/up_bird0.png", "img/up_bird1.png"];
    time6 = setInterval(fallBird.move, 100);


}

