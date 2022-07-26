//////////////////////////////////////////
//
// Utilities v2.0
// 2022.07.26 by pp
//
//////////////////////////////////////////

/*------------------------------------
 プラットフォーム判定
------------------------------------*/
const _ua = ((u) =>{
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());


/*------------------------------------
 トレース
------------------------------------*/
const trace = (xTxt) =>{
	console.log(xTxt);
	//window.console && console.log(xTxt);
};

/*------------------------------------
 GETパラメータの取得
------------------------------------*/
const getParamArgs = () =>{
	const xResArray = null;
	const xQuery = window.location.search.substring(1);
	const xGetDatas = xQuery.split('&');

	if (xGetDatas.length > 0){
		xResArray = {};
		for (var i=0; i<xGetDatas.length; i++) {
			var xPos = xGetDatas[i].indexOf('=');
			if (xPos > 0) {
				const xKey = xGetDatas[i].substring(0,xPos);
				let xValue = xGetDatas[i].substring(xPos+1);
				xValue = decodeURI(xValue);
				xResArray[xKey] = xValue;
			}
		}
	}

	return xResArray;
};


/*------------------------------------
 スムーススクロール
------------------------------------*/
const paageScroll = (xAncar) =>{
  let xPos;
  const xHeight = $("#header").height();
  if (xAncar == "#top"){
  	xPos = 0;
  }else if (xAncar != "#"){
  	xPos = $(xAncar).offset().top - xHeight;
  }
  trace(xPos);
  $('body,html').animate({scrollTop:xPos}, "slow", 'swing');
} 


//////////////////////////////////////////

/*------------------------------------
ページ幅チェック*/
const fsCheakPageMode = () =>{
  if($(window).width() <= 738){
    $("html").addClass("modeN");
   }else{
    $("html").removeClass("modeN");
  }
}

/*------------------------------------
外部JSファイル動的読み込み
------------------------------------*/
const fsLoadJSfile = (xUrl) =>{
  const xElm = document.createElement("script");
  xElm.type = "text/javascript";
  xElm.src = xUrl;
  xElm.onload = function(){
    trace("Load JS >>" + xUrl)
  };
  document.head.appendChild(xElm);
};

/*------------------------------------
配列のシャッフル
------------------------------------*/
/*var shuffleArray = function(xArray){
  var  m = xArray.length;
  while (m) {
    var i = Math.floor(Math.random() * m--);
    xArray[m] = xArray[i];
    xArray[i] = xArray[m]
    //[xArray[m],xArray[i]] = [xArray[i],xArray[m]];
  }
  return xArray;
};*/

const shuffleArray = (xArray) =>{
    for (var i = xArray.length - 1; i > 0; i = 0 | i - 1) {
        const j = 0 | Math.random() * (i + 1);
        const swap = xArray[i];
        xArray[i] = xArray[j];
        xArray[j] = swap;
    }
    return xArray;
}


/*------------------------------------
 イニシャライズ
------------------------------------*/

$(function(){
  
  trace(">loaded _util.js v2.0");

  if(_ua.Mobile){
    $("html").addClass("sp");
  }else if(_ua.Tablet){
    $("html").addClass("tb");
  }else{
    $("html").addClass("pc");
  }


  /*$("a[href^='#']").on("click",function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    var xAncar = $(this).attr("href");
    paageScroll(xAncar);
  });*/


  $(window).on("resize",()=>{
    //
  });

  $(window).on("load",() =>{
    //
  });

});


/*------------------------------------

 SNS Share Action

------------------------------------*/
const fsShareTweet = (evt) =>{
  evt.preventDefault();
  evt.stopPropagation();
  var xLink = $("meta[name='twitter:url']").attr("value");
  var xDiscription = $("meta[name='twitter:description']").attr("value");
  var xTmpPath = "https://twitter.com/intent/tweet?url="+xLink+"&text=" + encodeURIComponent(xDiscription);
  fsDoShareSNS(xTmpPath);
}

const fsShareFacebook = (evt) =>{
  evt.preventDefault();
  evt.stopPropagation();
  var xLink = $("meta[property='og:url']").attr("content");
  var xDiscription = $("meta[property='og:description']").attr("content");
  trace(xLink);
  trace(xDiscription);
  var xTmpPath = "https://www.facebook.com/sharer/sharer.php?u="+xLink+"&t=" + encodeURIComponent(xDiscription)
  fsDoShareSNS(xTmpPath);
}

const fsDoShareSNS = (xTmpPath) =>{
  //var xLocation = $("link[name='canonical']").attr("href");
  //var xLocation = location.href;
  window.open(xTmpPath, '_blank', 'width=600, height=600, menubar=no, toolbar=no, scrollbars=yes');
}
