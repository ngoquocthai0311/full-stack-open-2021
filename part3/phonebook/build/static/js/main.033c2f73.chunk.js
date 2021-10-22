(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var c=n(16),r=n.n(c),o=n(7),a=n(3),i=n(1),u=n(0),s=function(e){var t=e.country;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h1",{children:t.name}),Object(u.jsxs)("p",{children:["capital ",t.capital," ",Object(u.jsx)("br",{}),"population ",t.population]}),Object(u.jsx)("h1",{children:"Languages"}),Object(u.jsx)("ul",{children:t.languages.map((function(e,t){return Object(u.jsx)("li",{children:e.name},t)}))}),Object(u.jsx)("img",{src:t.flag,alt:"a colorful flag",width:"100",height:"100"})]})},j=function(e){var t=e.countries,n=e.getCountriesFromAPI;return Object(u.jsx)(u.Fragment,{children:function(){switch(t.length){case 1:var e=t[0];return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(s,{country:e})});case 0:return Object(u.jsx)(u.Fragment,{});default:if(t.length>10)return Object(u.jsx)("p",{children:"Too many matches, specify another filter"});if(t.length<=10)return Object(u.jsx)("ul",{children:t.map((function(e,t){return Object(u.jsxs)("li",{children:[e.name," ",Object(u.jsx)("button",{onClick:function(){n(e.name)},children:"show"})," "]},t)}))})}}()})},l=function(e){var t=e.state,n=e.setState;return Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]})},d=function(e){var t=e.persons,n=e.filter,c=e.deletePerson;return Object(u.jsx)("div",{children:function(){if(""!==n){var e=t.filter((function(e){return e.name.toLowerCase().includes(n)}));return Object(u.jsx)("ul",{children:e.map((function(e,t){return Object(u.jsxs)("li",{children:[e.name," ",e.number," ",Object(u.jsx)("button",{onClick:function(){return c(e)},children:"delete"})]},t)}))})}if(0!==t.length)return Object(u.jsx)("ul",{children:t.map((function(e,t){return Object(u.jsxs)("li",{children:[e.name," ",e.number," ",Object(u.jsx)("button",{onClick:function(){return c(e)},children:"delete"})]},t)}))})}()})},h=function(e){return Object(u.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.name,onChange:function(t){return e.setStateName(t.target.value)}})]}),Object(u.jsxs)("div",{children:["phone: ",Object(u.jsx)("input",{value:e.phone,onChange:function(t){return e.setStatePhone(t.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var t=e.notificationMessage,n=e.isError;return""===t?null:!1===n?Object(u.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:t}):Object(u.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:t})},f=n(4),m=n.n(f),O="/api/persons",g={create:function(e){return m.a.post(O,e).then((function(e){return e.data})).catch((function(e){return e}))},getPersons:function(){return m.a.get(O).then((function(e){return e.data})).catch((function(e){return e}))},deletePerson:function(e){return m.a.delete("".concat(O,"/").concat(e)).then((function(e){return e})).catch((function(e){return e}))},updatePerson:function(e,t){return m.a.put("".concat(O,"/").concat(e),t).then((function(e){return e}))}},x={getCountries:function(e){return m.a.get("".concat("https://restcountries.com/v2/name","/").concat(e)).then((function(e){return e.data}))}},p=function(){var e=Object(i.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)(""),s=Object(a.a)(r,2),f=s[0],m=s[1],O=Object(i.useState)(""),p=Object(a.a)(O,2),v=p[0],S=p[1],w=Object(i.useState)(""),y=Object(a.a)(w,2),P=y[0],C=y[1],k=Object(i.useState)(""),F=Object(a.a)(k,2),E=F[0],I=F[1],A=Object(i.useState)([]),B=Object(a.a)(A,2),N=B[0],z=B[1],D=Object(i.useState)(""),J=Object(a.a)(D,2),L=J[0],M=J[1],R=Object(i.useState)(!1),T=Object(a.a)(R,2),q=T[0],G=T[1],H=function(){setTimeout((function(){M("")}),5e3)};Object(i.useEffect)((function(){g.getPersons().then((function(e){c(e)}))}),[]);var K=function(e){x.getCountries(e).then((function(e){z(e)})).catch((function(e){console.log("something is wrong")}))};return Object(u.jsxs)("div",{children:["find country ",Object(u.jsx)("input",{value:E,onChange:function(e){var t=e.target.value;I(t),""!==t&&K(t)}}),Object(u.jsx)(j,{countries:N,getCountriesFromAPI:K}),Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(b,{notificationMessage:L,isError:q}),Object(u.jsx)(l,{state:P,setState:C}),Object(u.jsx)("h2",{children:"add a new"}),Object(u.jsx)(h,{name:f,phone:v,setStateName:m,setStatePhone:S,handleSubmit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===f}));if(t){if(window.confirm(t.name+" is already added to the phone book, replace the old number with a new one ? ")){var r=Object(o.a)(Object(o.a)({},t),{},{number:v});g.updatePerson(r.id,r).then((function(e){switch(e.status){case 200:c(n.map((function(e){return e.name!==r.name?e:r}))),G(!1),M("Phone number of ".concat(r.name," is changed")),H()}})).catch((function(e){G(!0),M("Information of ".concat(r.name," has already been removed from the server")),H(),g.getPersons().then((function(e){return c(e)}))}))}}else{var a={name:f,number:v};g.create(a).then((function(e){c(n.concat(e)),G(!1),M("Added ".concat(e.name)),H()})).catch((function(e){console.log(e)}))}m(""),S("")}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(d,{persons:n,filter:P,deletePerson:function(e){window.confirm("Delete "+e.name+" ?")&&g.deletePerson(e.id).then((function(t){var r=n.filter((function(t){return t.name!==e.name}));c(r)})).catch((function(e){console.log(e)}))}})]})};r.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.033c2f73.chunk.js.map