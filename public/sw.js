if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2eb6633ee4358222ec4a4403ae8ceef2"},{url:"/_next/static/WI_iAO0wLpwO3Sb2LnlCR/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/WI_iAO0wLpwO3Sb2LnlCR/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/610-ab04d7e34cb1a68a.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/698-c9d9a83b75ac646d.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/743-6ff8120e1f774e9f.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/95-a2914bab1402df99.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/dashboard/layout-1b03a7115bb681f8.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/dashboard/page-b27288d47389c185.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/layout-138135222718a83b.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/login/page-edeeea6aa196118e.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/not-found-f97a971965b74311.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/page-d6cb2921420a99d7.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/signin/page-48494f5cb396b722.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/snippets/page-e6bc24fa122007b4.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/snippets/search-params/page-235fb743f56f04b5.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/template-05d6e86390c5c85d.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/app/todos/page-5cb0621bda47f2bf.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/bce60fc1-f7681b6760b967f4.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/main-4f2610ecb6006a29.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/main-app-9f0b9505bd190847.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-05cbbf7257828ae6.js",revision:"WI_iAO0wLpwO3Sb2LnlCR"},{url:"/_next/static/css/365d9d1ddcea9409.css",revision:"365d9d1ddcea9409"},{url:"/_next/static/css/cda1bfcd48554bb6.css",revision:"cda1bfcd48554bb6"},{url:"/alexander-andrews-brAkTCdnhW8-unsplash.jpg",revision:"10b417ee70a8fced680fbcfb712c0c0f"},{url:"/eniko-kis-KsLPTsYaqIQ-unsplash.jpg",revision:"0d3f3ee77306f5ec27acf679bbbf549b"},{url:"/favicon/android-chrome-192x192.png",revision:"a4a3f52450fa0d22255ae3287df7447f"},{url:"/favicon/android-chrome-512x512.png",revision:"10bab61f8e4848011b5a983bae915321"},{url:"/favicon/apple-touch-icon.png",revision:"941f826cac306e42519aaa0d50f05d40"},{url:"/favicon/browserconfig.xml",revision:"f96bcae101948c2e4c50e722969a411c"},{url:"/favicon/favicon-16x16.png",revision:"eb1cb942a3bfed0950ee55988c4b1405"},{url:"/favicon/favicon-32x32.png",revision:"0efa2e3ef4c44cdbe0d678af8ebc913e"},{url:"/favicon/mstile-150x150.png",revision:"aa4f0ec81da412c1771525b73a6eb02b"},{url:"/favicon/safari-pinned-tab.svg",revision:"40c9bc99e963fb841cd147f0374682fe"},{url:"/favicon/site.webmanifest",revision:"081d6264b9118507486010173ad35208"},{url:"/grid.svg",revision:"71270def81f286aab7209f04c762e1e6"},{url:"/guillaume-coupy-6HuoHgK7FN8-unsplash.jpg",revision:"27bf917259ef0f7b834b96690a5a0d4d"},{url:"/nextjs-icon-light-background.png",revision:"ac38a73ecb20a904d52ebc9b28aa171f"},{url:"/patrick-OIFgeLnjwrM-unsplash.jpg",revision:"3f7f1badefa9cbe0a382d7b31ff98120"},{url:"/prince-akachi-LWkFHEGpleE-unsplash.jpg",revision:"28b5a2d4e0623292a155e5d0860a507b"},{url:"/vote-vibe_logo_color.svg",revision:"04a42674266fe6bbc005f77293d47036"},{url:"/vote-vibe_logo_solid.svg",revision:"22b405d15115e438f14e0ae4b2c17bde"},{url:"/yoann-siloine-_T4w3JDm6ug-unsplash.jpg",revision:"712d5716de5bb5299d520a66aa839e14"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
