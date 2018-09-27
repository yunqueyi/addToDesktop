function openApp(url) {
  var Base64 = function () {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    };
    this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    };
  };

  if (window.navigator.standalone) {
    window.location.href = url;
  } else {
    //将资源引用相对路径替换为绝对路径
    var links = document.getElementsByTagName('link');
    for(var i=0;i<links.length;i++){
      console.log(links[i].href)
      if(links[i].href){
        links[i].href = links[i].href
      }
    }
    var scripts = document.getElementsByTagName('script');
    for(var i=0;i<scripts.length;i++){
      if(scripts[i].src){
        scripts[i].src = scripts[i].src;
      }
    }
    var imgs = document.getElementsByTagName('img');
    for(var i=0;i<imgs.length;i++){
      if(imgs[i].src){
        imgs[i].src = imgs[i].src;
      }
    }

    var base64 = new Base64();
    var domhtml = '<!DOCTYPE html><html>' + document.getElementsByTagName('html')[0].innerHTML + '</html>';

    var base64Tpl = base64.encode(domhtml);
      if (window.location.href.indexOf('data:text/html;base64,') == -1) {
        window.location.href = 'data:text/html;base64,' + base64Tpl;
      }
    }
}