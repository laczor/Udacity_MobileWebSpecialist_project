"use strict";!function(t){if(!t.fetch){var s={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(s.arrayBuffer)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=function(t){return t&&DataView.prototype.isPrototypeOf(t)},o=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};f.prototype.append=function(t,e){t=a(t),e=h(e);var r=this.map[t];this.map[t]=r?r+","+e:e},f.prototype.delete=function(t){delete this.map[a(t)]},f.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},f.prototype.set=function(t,e){this.map[a(t)]=h(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},s.iterable&&(f.prototype[Symbol.iterator]=f.prototype.entries);var i=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},c.call(b.prototype),c.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var n=[301,302,303,307,308];w.redirect=function(t,e){if(-1===n.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=f,t.Request=b,t.Response=w,t.fetch=function(r,n){return new Promise(function(o,t){var e=new b(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new f,t.split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new w(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials&&(i.withCredentials=!0),"responseType"in i&&s.blob&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function l(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(s.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(s.arrayBuffer&&s.blob&&r(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!o(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=d(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function b(t,e){var r,o,n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<i.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function m(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function w(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:void 0);
"use strict";!function(t){if(!t.fetch){var s={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(s.arrayBuffer)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=function(t){return t&&DataView.prototype.isPrototypeOf(t)},o=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};f.prototype.append=function(t,e){t=a(t),e=h(e);var r=this.map[t];this.map[t]=r?r+","+e:e},f.prototype.delete=function(t){delete this.map[a(t)]},f.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},f.prototype.set=function(t,e){this.map[a(t)]=h(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},s.iterable&&(f.prototype[Symbol.iterator]=f.prototype.entries);var i=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},c.call(b.prototype),c.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var n=[301,302,303,307,308];w.redirect=function(t,e){if(-1===n.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=f,t.Request=b,t.Response=w,t.fetch=function(r,n){return new Promise(function(o,t){var e=new b(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new f,t.split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new w(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials&&(i.withCredentials=!0),"responseType"in i&&s.blob&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function l(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(s.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(s.arrayBuffer&&s.blob&&r(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!o(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=d(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function b(t,e){var r,o,n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<i.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function m(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function w(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:void 0);
"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function a(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new a(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),a.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(a,"_tx",["objectStoreNames","mode"]),n(a,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(p,"_db",["name","version","objectStoreNames"]),n(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new a(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}}})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var d={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r.onupgradeneeded=function(e){n&&n(new p(r.result,e.oldVersion,r.transaction))},o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function a(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new a(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),a.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(a,"_tx",["objectStoreNames","mode"]),n(a,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(p,"_db",["name","version","objectStoreNames"]),n(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new a(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}}})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var d={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r.onupgradeneeded=function(e){n&&n(new p(r.result,e.oldVersion,r.transaction))},o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";var _createClass=function(){function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}}();function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var dbPromise=window.idb.open("restaurant-db",1,function(n){n.objectStoreNames.contains("restaurants")||n.createObjectStore("restaurants",{keyPath:"id"})}),DBHelper=function(){function i(){_classCallCheck(this,i)}return _createClass(i,null,[{key:"fetchRestaurants",value:function(t){fetch(i.DATABASE_URL).then(function(n){return n.json()}).then(function(r){dbPromise.then(function(n){var t=n.transaction("restaurants","readwrite"),e=t.objectStore("restaurants");return r.map(function(n){e.put(n)}),t.complete}),t(null,r)}).catch(function(n){dbPromise.then(function(n){n.transaction("restaurants","readwrite").objectStore("restaurants").getAll().then(function(n){t(null,n)})})})}},{key:"fetchRestaurantById",value:function(t,e){fetch(i.DATABASE_URL+"/"+t).then(function(n){return n.json()}).then(function(n){e(null,n)}).catch(function(n){dbPromise.then(function(n){n.transaction("restaurants","readwrite").objectStore("restaurants").get(Number(t)).then(function(n){e(null,n)})})})}},{key:"fetchRestaurantByCuisine",value:function(r,u){i.fetchRestaurants(function(n,t){if(n)u(n,null);else{var e=t.filter(function(n){return n.cuisine_type==r});u(null,e)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,u){i.fetchRestaurants(function(n,t){if(n)u(n,null);else{var e=t.filter(function(n){return n.neighborhood==r});u(null,e)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,u,a){i.fetchRestaurants(function(n,t){if(n)a(n,null);else{var e=t;"all"!=r&&(e=e.filter(function(n){return n.cuisine_type==r})),"all"!=u&&(e=e.filter(function(n){return n.neighborhood==u})),a(null,e)}})}},{key:"fetchNeighborhoods",value:function(u){i.fetchRestaurants(function(n,e){if(n)u(n,null);else{var r=e.map(function(n,t){return e[t].neighborhood}),t=r.filter(function(n,t){return r.indexOf(n)==t});u(null,t)}})}},{key:"fetchCuisines",value:function(u){i.fetchRestaurants(function(n,e){if(n)u(n,null);else{var r=e.map(function(n,t){return e[t].cuisine_type}),t=r.filter(function(n,t){return r.indexOf(n)==t});u(null,t)}})}},{key:"urlForRestaurant",value:function(n){return"./restaurants?id="+n.id}},{key:"imageUrlForRestaurant",value:function(n){return"img/"+n.id+"-desktop.jpg"}},{key:"imageUrlForRestaurantMobile",value:function(n){return"img/"+n.id+"-mobile.jpg"}},{key:"mapMarkerForRestaurant",value:function(n,t){return new google.maps.Marker({position:n.latlng,title:n.name,url:i.urlForRestaurant(n),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337/restaurants"}}]),i}();
"use strict";var _createClass=function(){function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}}();function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}var dbPromise=window.idb.open("restaurant-db",1,function(n){n.objectStoreNames.contains("restaurants")||n.createObjectStore("restaurants",{keyPath:"id"})}),DBHelper=function(){function i(){_classCallCheck(this,i)}return _createClass(i,null,[{key:"fetchRestaurants",value:function(t){fetch(i.DATABASE_URL).then(function(n){return n.json()}).then(function(r){dbPromise.then(function(n){var t=n.transaction("restaurants","readwrite"),e=t.objectStore("restaurants");return r.map(function(n){e.put(n)}),t.complete}),t(null,r)}).catch(function(n){dbPromise.then(function(n){n.transaction("restaurants","readwrite").objectStore("restaurants").getAll().then(function(n){t(null,n)})})})}},{key:"fetchRestaurantById",value:function(t,e){fetch(i.DATABASE_URL+"/"+t).then(function(n){return n.json()}).then(function(n){e(null,n)}).catch(function(n){dbPromise.then(function(n){n.transaction("restaurants","readwrite").objectStore("restaurants").get(Number(t)).then(function(n){e(null,n)})})})}},{key:"fetchRestaurantByCuisine",value:function(r,u){i.fetchRestaurants(function(n,t){if(n)u(n,null);else{var e=t.filter(function(n){return n.cuisine_type==r});u(null,e)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,u){i.fetchRestaurants(function(n,t){if(n)u(n,null);else{var e=t.filter(function(n){return n.neighborhood==r});u(null,e)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,u,a){i.fetchRestaurants(function(n,t){if(n)a(n,null);else{var e=t;"all"!=r&&(e=e.filter(function(n){return n.cuisine_type==r})),"all"!=u&&(e=e.filter(function(n){return n.neighborhood==u})),a(null,e)}})}},{key:"fetchNeighborhoods",value:function(u){i.fetchRestaurants(function(n,e){if(n)u(n,null);else{var r=e.map(function(n,t){return e[t].neighborhood}),t=r.filter(function(n,t){return r.indexOf(n)==t});u(null,t)}})}},{key:"fetchCuisines",value:function(u){i.fetchRestaurants(function(n,e){if(n)u(n,null);else{var r=e.map(function(n,t){return e[t].cuisine_type}),t=r.filter(function(n,t){return r.indexOf(n)==t});u(null,t)}})}},{key:"urlForRestaurant",value:function(n){return"./restaurants?id="+n.id}},{key:"imageUrlForRestaurant",value:function(n){return"img/"+n.id+"-desktop.jpg"}},{key:"imageUrlForRestaurantMobile",value:function(n){return"img/"+n.id+"-mobile.jpg"}},{key:"mapMarkerForRestaurant",value:function(n,t){return new google.maps.Marker({position:n.latlng,title:n.name,url:i.urlForRestaurant(n),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337/restaurants"}}]),i}();
"use strict";var map,mapIframe,restaurants=void 0,neighborhoods=void 0,cuisines=void 0,markers=[];function startServiceWorker(){if(navigator.serviceWorker){navigator.serviceWorker.register("../sw.js",{scope:"/"}).then(function(e){navigator.serviceWorker.controller})}}function hideLoader(){document.getElementById("maincontent").style.display="flex",document.getElementById("loader-div").style.display="none"}function toggleMapView(){var e=document.getElementById("map-container");"none"==e.style.display||""==e.style.display?(e.style.display="flex",document.getElementById("map-toggle").innerText="Hide map",(mapIframe=document.querySelector("iframe")).title&&""==mapIframe.title&&(mapIframe.title="Google Maps")):(e.style.display="none",document.getElementById("map-toggle").innerText="Show map")}function fetchNeighborhoods(){DBHelper.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}function fillNeighborhoodsHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})}function fetchCuisines(){DBHelper.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}function fillCuisinesHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)}),updateRestaurants(),hideLoader()}function updateRestaurants(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,r=t.selectedIndex,a=e[n].value,o=t[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(a,o,function(e,t){e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})}function resetRestaurants(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e}function fillRestaurantsHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(createRestaurantHTML(e))}),addMarkersToMap()}function createRestaurantHTML(e){var t=document.createElement("li"),n=document.createElement("img");n.className="restaurant-img lazyload",n.alt="Restaurant of "+e.name+"with cuisine type of "+e.cuisine_type,n.src=DBHelper.imageUrlForRestaurant(e),n.srcset=DBHelper.imageUrlForRestaurantMobile(e)+" 350w",t.append(n);var r=document.createElement("h2");r.innerHTML=e.name,t.append(r);var a=document.createElement("p");a.innerHTML=e.neighborhood,t.append(a);var o=document.createElement("p");o.innerHTML=e.address,t.append(o);var i=document.createElement("span");i.innerHTML="Link to the "+e.name;var s=document.createElement("a");return s.innerHTML="View Details",s.href=DBHelper.urlForRestaurant(e),s.append(i),t.append(s),t}function addMarkersToMap(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),self.markers.push(t)})}window.onload=function(){},startServiceWorker(),document.addEventListener("DOMContentLoaded",function(e){fetchNeighborhoods(),fetchCuisines(),document.getElementById("map-toggle").addEventListener("click",function(e){toggleMapView()})}),window.initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1})};
"use strict";function writeData(r,n){return dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).put(n),e.complete})}function readAllData(e){return dbPromise.then(function(t){return t.transaction(e,"readonly").objectStore(e).getAll()})}function clearAllData(r){return dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).clear(),e.complete})}function deleteItemFromData(r,n){dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).delete(n),e.complete}).then(function(){console.log("Item deleted!")})}
"use strict";function writeData(r,n){return dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).put(n),e.complete})}function readAllData(e){return dbPromise.then(function(t){return t.transaction(e,"readonly").objectStore(e).getAll()})}function clearAllData(r){return dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).clear(),e.complete})}function deleteItemFromData(r,n){dbPromise.then(function(t){var e=t.transaction(r,"readwrite");return e.objectStore(r).delete(n),e.complete}).then(function(){console.log("Item deleted!")})}