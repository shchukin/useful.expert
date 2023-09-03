Templater = (function () {
  var cache = {};
  var id;
  var el;

  return function (str, data) {
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] || str :
      new Function("obj",
        "obj=obj||{};!obj.content?obj.content='<%= content %>':'';var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}p.push('\\n');return p.join('');");
    fn.data = function (attr) {
      return (el ? el.getAttribute('data-' + attr) : 'undefined');
    };
    fn.toString = function () {
      console.warn('You should run template with data');/*RemoveLogging:skip*/
      return fn({});
    };
    return data ? fn( data ) : fn;
  };
})();
