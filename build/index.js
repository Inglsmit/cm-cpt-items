!function(){"use strict";var e,t={101:function(){var e=window.wp.blocks,t=window.wp.element,r=window.wp.i18n,a=window.wp.blockEditor,n=window.wp.data,c=window.wp.components;(0,e.registerBlockType)("cm-block/gb-cpt-items",{edit:function(){const e=(0,n.useSelect)((e=>e("core").getEntityRecords("postType","gb_movies",{})),[]),l=(0,n.useSelect)((e=>e("core").getEntityRecords("postType","gb_movies",{per_page:2,_embed:!0})),[]),m=e&&e.length&&Math.ceil(e.length/2);return console.log(m),(0,t.createElement)("div",(0,a.useBlockProps)(),l&&l.length?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__list"},l.map((e=>{const a=e._embedded&&e._embedded["wp:term"]&&e._embedded["wp:term"].length>0&&e._embedded["wp:term"][0],n=e._embedded&&e._embedded["wp:featuredmedia"]&&e._embedded["wp:featuredmedia"].length>0&&e._embedded["wp:featuredmedia"][0];return(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__card",key:e.id},(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__card-img-box"},(0,t.createElement)("a",{href:e.link},n&&(0,t.createElement)("img",{src:n.media_details.sizes.medium.source_url,alt:n.alt_text}))),(0,t.createElement)("h2",{className:"wp-block-cm-block-gb-cpt-items__card-title"},(0,t.createElement)("a",{href:e.link},e.title.rendered?(0,t.createElement)(t.RawHTML,null,e.title.rendered):(0,r.__)("(No title)","gb-cpt-items"))),(0,t.createElement)("p",{className:"wp-block-cm-block-gb-cpt-items__card-text"},e.excerpt.rendered&&(0,t.createElement)(t.RawHTML,null,e.excerpt.rendered)),(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__card-tags"},a&&a.map((e=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)("a",{className:"wp-block-cm-block-gb-cpt-items__card-tag",href:e.link},"#",e.name))))))}))),m>4?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__paginator"},(0,t.createElement)("span",{"aria-current":"page",className:"page-numbers current"},"1"),(0,t.createElement)("a",{className:"page-numbers",href:"#"},"2"),(0,t.createElement)("a",{className:"page-numbers",href:"#"},"3"),(0,t.createElement)("span",{className:"page-numbers dots"},"…"),(0,t.createElement)("a",{className:"page-numbers",href:"#"},m),(0,t.createElement)("a",{className:"next page-numbers",href:"#"},"Next »"))):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"wp-block-cm-block-gb-cpt-items__paginator"},(0,t.createElement)("span",{"aria-current":"page",className:"page-numbers current"},"1"),[...Array(m+1)].map(((e,r)=>r>1&&(0,t.createElement)("a",{key:r,className:"page-numbers",href:"#"},r))),(0,t.createElement)("a",{className:"next page-numbers",href:"#"},"Next »")))):(0,t.createElement)(t.Fragment,null,null===l?(0,t.createElement)(c.Placeholder,{icon:"admin-generic",label:"Movies list is loading..."},(0,t.createElement)(c.Spinner,null)):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("p",null,(0,r.__)("Sorry, movies not found.","gb-cpt-items")))))},save:function(){return null}})}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var c=r[e]={exports:{}};return t[e](c,c.exports,a),c.exports}a.m=t,e=[],a.O=function(t,r,n,c){if(!r){var l=1/0;for(o=0;o<e.length;o++){r=e[o][0],n=e[o][1],c=e[o][2];for(var m=!0,s=0;s<r.length;s++)(!1&c||l>=c)&&Object.keys(a.O).every((function(e){return a.O[e](r[s])}))?r.splice(s--,1):(m=!1,c<l&&(l=c));if(m){e.splice(o--,1);var i=n();void 0!==i&&(t=i)}}return t}c=c||0;for(var o=e.length;o>0&&e[o-1][2]>c;o--)e[o]=e[o-1];e[o]=[r,n,c]},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,46:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,c,l=r[0],m=r[1],s=r[2],i=0;if(l.some((function(t){return 0!==e[t]}))){for(n in m)a.o(m,n)&&(a.m[n]=m[n]);if(s)var o=s(a)}for(t&&t(r);i<l.length;i++)c=l[i],a.o(e,c)&&e[c]&&e[c][0](),e[l[i]]=0;return a.O(o)},r=self.webpackChunkgb_cpt_items=self.webpackChunkgb_cpt_items||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var n=a.O(void 0,[46],(function(){return a(101)}));n=a.O(n)}();