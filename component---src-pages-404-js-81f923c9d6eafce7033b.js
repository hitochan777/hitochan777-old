(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{141:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(149),o=n(162),c=n(4),u=n.n(c),s=n(163),l=n.n(s),d=n(144);function m(e){var t=e.description,n=e.lang,a=e.meta,i=e.keywords,c=e.title;return r.a.createElement(d.StaticQuery,{query:h,render:function(e){var o=t||e.site.siteMetadata.description;return r.a.createElement(l.a,{htmlAttributes:{lang:n},title:c,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:o},{property:"og:title",content:c},{property:"og:description",content:o},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:c},{name:"twitter:description",content:o}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(a)})},data:o})}m.defaultProps={lang:"en",meta:[],keywords:[]},m.propTypes={description:u.a.string,lang:u.a.string,meta:u.a.array,keywords:u.a.arrayOf(u.a.string),title:u.a.string.isRequired};var p=m,h="1025518380";t.default=function(){return r.a.createElement(i.a,null,r.a.createElement(p,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},144:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return m}),n.d(t,"StaticQuery",function(){return p});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(143),u=n.n(c);n.d(t,"Link",function(){return u.a}),n.d(t,"withPrefix",function(){return c.withPrefix}),n.d(t,"navigate",function(){return c.navigate}),n.d(t,"push",function(){return c.push}),n.d(t,"replace",function(){return c.replace}),n.d(t,"navigateTo",function(){return c.navigateTo});var s=n(145),l=n.n(s);n.d(t,"PageRenderer",function(){return l.a});var d=n(32);n.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),p=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},145:function(e,t,n){var a;e.exports=(a=n(147))&&a.default||a},146:function(e){e.exports={data:{site:{siteMetadata:{title:"Hitochan's website"}}}}},147:function(e,t,n){"use strict";n.r(t);n(33);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(51),u=n(2),s=function(e){var t=e.location,n=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},148:function(e,t,n){},149:function(e,t,n){"use strict";var a=n(146),r=n(0),i=n.n(r),o=n(4),c=n.n(o),u=n(144),s=function(e){var t=e.siteTitle;return i.a.createElement("div",{style:{background:"orange",marginBottom:"1.45rem"}},i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},i.a.createElement("h1",{style:{margin:0}},i.a.createElement(u.Link,{to:"/",style:{color:"black",textDecoration:"none"}},t))))},l=n(150).a.footer.withConfig({displayName:"footer__Footer",componentId:"sc-1o4kh6a-0"})(["width:100%;text-align:center;min-height:3rem;background-color:orange;display:flex;flex-direction:column;justify-content:center;position:absolute;bottom:0;"]),d=function(){return i.a.createElement(l,null,i.a.createElement("div",null,"© ",(new Date).getFullYear(),", Built by"," ",i.a.createElement("a",{href:"https://github.com/hitochan777"},"hitochan777")," with love♡"))},m=(n(148),function(e){var t=e.children;return i.a.createElement(u.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement("div",{style:{position:"relative",minHeight:"100vh"}},i.a.createElement(s,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 3rem"}},t),i.a.createElement(d,null))},data:a})});m.propTypes={children:c.a.node.isRequired};t.a=m},162:function(e){e.exports={data:{site:{siteMetadata:{title:"Hitochan's website",description:"Hitochan's website",author:"hitochan777"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-81f923c9d6eafce7033b.js.map