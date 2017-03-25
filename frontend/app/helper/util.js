export default class Util {

  static isMobile(){
    var isMobile = false; //initiate as false
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      isMobile = true;
    }
    // device detection
    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // isMobile = true;
    // }
    return isMobile;
  }

  static isModernBroswer(){
    var a = navigator.userAgent || navigator.vendor || window.opera;
    var versions = { chrome: 46, ie: 11, firefox: 42, safari: 9, opera: 33 };
    var t, m, r;
    m = a.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(m[0])) {
      t = a.match(/\brv[ :]+(\d+)/i) || [];
      r = { b: 'ie', v: parseInt(t[1]) || 0 };
    } else if (a.indexOf('OPR') > -1) {
      t = a.match(/opr\/(\d+)/i) || [];
      r = { b: 'opera', v: parseInt(t[1]) || 0 };
    } else if (m[1] === 'Chrome') {
      r = { b: 'chrome', v: parseInt(m[2]) || 0 };
    } else if (m[1] === 'Firefox') {
      r = { b: 'firefox', v: parseInt(m[2]) || 0 };
    } else if (m[1] === 'Safari') {
      t = a.match(/version\/(\d+)/i) || [];
      r = { b: 'safari', v: parseInt(t[1]) || 0 };
    } else {
      r = { b: 'unknown', v: -1 };
    }
    // console.log(r);
    return r.v >= (versions[r.b] || 0);
  }

  static filterXSS(str){
    str = str || '';
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, 'quot;');
    str = str.replace(/"/g, '&#x27;');
    str = str.replace(/\//g, '&#x2f;');
    return str;
  }

  static validateEmail(email){
    var reg = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    return reg.test(email);
  }

  //min: include; max: exclude
  static getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getUrlParam(name){
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    if (r) return unescape(r[2]);return null;
  }

  static roundNumber(number, precision = 100){
    return Math.round(number * precision) / precision;
  }

  static addUrlParam(url, key, value){
    var result, connector;
    if(url){
      connector = url.indexOf('?') > -1 ? '&' : '?';
      result = url + connector + key + '=' + value;
    }
    return result;
  }

  static uuid(){
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
  }

  static store(key, data, temporary){
    const drive = temporary ? sessionStorage : localStorage;
    const str = drive.getItem(key);
    var result;
    if (data) {
      drive.setItem(key, JSON.stringify(data));
    }else{
      result = (str && JSON.parse(str)) || {};
    }
    return result;
  }

  static getNav(splitor){
    var str = document.location.hash.split(splitor)[1] || '';
    var navs, nid;
    str = str.split(':') || [''];
    navs = str[0].split('/');
    nid = str[1];
    // #/home/second:nid
    return {navs, nid};
  }

  static clone(parent){
    var child = Array.isArray(parent) ? [] : {};
    for(var i in parent) {
      if(parent.hasOwnProperty(i)) {
        if(typeof parent[i] === 'object') {
          child[i] = Util.clone(parent[i]);
        }else{
          child[i] = parent[i];
        }
      }
    }
    return child;
  }


}
