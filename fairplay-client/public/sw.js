if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let a={};const o=e=>i(e,c),r={module:{uri:c},exports:a,require:o};s[c]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(t(...e),a)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bdbae26906f355bde267d2c85a75f3cd"},{url:"/_next/static/chunks/114-902ff8b85024408d.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/222.d79c430c46e91b50.js",revision:"d79c430c46e91b50"},{url:"/_next/static/chunks/327-8617d0be849a6d3d.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/4e5642dd-005d6a1eed0198e4.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/601.c95c1d828c5326c8.js",revision:"c95c1d828c5326c8"},{url:"/_next/static/chunks/714.e82b157cd07ff42f.js",revision:"e82b157cd07ff42f"},{url:"/_next/static/chunks/77f316de-3214c1b287bdeb62.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/796-42379932f4cd253b.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/902.267495babd79ca12.js",revision:"267495babd79ca12"},{url:"/_next/static/chunks/app/_not-found-f2909383d1f458f3.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/app/layout-7281e5797ce50605.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/app/page-9711183ff7f1e320.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/c082bd9a-e65de6d31bd148a3.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/e1bbbf97-9a85e160124e9a53.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/framework-4951739b1a051b2a.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/main-ac15ef1e5527267f.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/main-app-af38c92931fd5ad7.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/pages/_app-f8d27d4bb1fc8fc4.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/pages/_error-7465867ac91e2875.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6fe023904a33edc5.js",revision:"wisOo3eyxSmeZs4iLA74w"},{url:"/_next/static/css/b039b7085f676fd9.css",revision:"b039b7085f676fd9"},{url:"/_next/static/wisOo3eyxSmeZs4iLA74w/_buildManifest.js",revision:"95cad8e522c435a7ce9f85428a28f065"},{url:"/_next/static/wisOo3eyxSmeZs4iLA74w/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/cover.png",revision:"cf600360a39b1bc4134a24e9c34d0f1b"},{url:"/favicon-32x32.png",revision:"9dc84dca75073e2ede699e6c8993e545"},{url:"/fingerprint.svg",revision:"8f7255ece052e8853021ab1200d1c24d"},{url:"/icons/eth.svg",revision:"5267b1df91d980bbe519868008986203"},{url:"/manifest.json",revision:"b6c9ced595b73c45a30a11207b73795d"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/safari-pinned-tab.svg",revision:"b149a7b26f02134bd64e00df0c915a1b"},{url:"/title-logo.png",revision:"8ab25742c8d2532da3b74cc719db2cc7"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
