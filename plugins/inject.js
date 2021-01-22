import Cookie from 'js-cookie'
import Md5 from 'blueimp-md5'

export default ({ app, $axios }, inject) => {
  // 获取服务端cookie
  inject("getCookiesInServer", function (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  });
  // MD5
  inject("md5", Md5);
  // 占位符
  inject("placeholder", "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=");
}