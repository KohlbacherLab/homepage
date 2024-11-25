import{_ as S,c as y,d as A,a as M,e as B,f as I}from"./chunks/theme.D-ofjo87.js";import{d as v,_ as b,B as d,o as a,c as n,j as t,G as i,w as _,a as k,t as h,e as f,n as g,h as $,F as T,C as L,a0 as w,p as z}from"./chunks/framework.NNQQ-GEh.js";import{d as C}from"./chunks/team.data.Buf_Pcb3.js";var l=(e=>(e.ALL="all",e.TBI="tbi",e.ABI="abi",e))(l||{});const K=v({components:{VPLink:S,VPSocialLinks:y},props:{size:{type:String,default:"medium"},member:{type:Object,required:!0},slug:{type:String,required:!0}}}),N={class:"profile"},O=["src","alt"],j={class:"data"},q={class:"name"},F={key:0,class:"affiliation"},H={class:"title"},E=["innerHTML"],G={key:2,class:"links"},J={key:0,class:"sp"};function D(e,s,c,m,o,p){const r=d("VPLink"),u=d("VPSocialLinks");return a(),n("article",{class:g(["VPTeamMembersItem",[e.size]])},[t("div",N,[t("div",null,[i(r,{href:"/team/"+e.slug},{default:_(()=>[t("img",{class:"avatar",src:e.member.avatar,alt:e.member.name},null,8,O)]),_:1},8,["href"])]),t("div",j,[t("h1",q,[i(r,{href:"/team/"+e.slug},{default:_(()=>[k(h(e.member.name),1)]),_:1},8,["href"])]),e.member.role?(a(),n("p",F,[t("span",H,h(e.member.role),1)])):f("",!0),e.member.description?(a(),n("p",{key:1,class:"desc",innerHTML:e.member.description},null,8,E)):f("",!0),e.member.socialLinks?(a(),n("div",G,[i(u,{links:e.member.socialLinks},null,8,["links"])])):f("",!0)])]),e.member.sponsor?(a(),n("div",J,[i(r,{class:"sp-link",href:e.member.sponsor,"no-icon":""},{default:_(()=>[s[0]||(s[0]=t("span",{class:"vpi-heart sp-icon"},null,-1)),k(" "+h(e.member.actionText||"Sponsor"),1)]),_:1},8,["href"])])):f("",!0)],2)}const Q=b(K,[["render",D],["__scopeId","data-v-9c4cc606"]]),R={class:"container"},U=v({__name:"KTeamMembers",props:{size:{default:"medium"},members:{}},setup(e){const s=e,c=$(()=>[s.size,`count-${s.members.length}`]);return(m,o)=>(a(),n("div",{class:g(["VPTeamMembers",c.value])},[t("div",R,[(a(!0),n(T,null,L(m.members,([p,r])=>(a(),n("div",{key:r.name,class:"item"},[i(Q,{size:m.size,member:r,slug:p},null,8,["size","member","slug"])]))),128))])],2))}}),W=b(U,[["__scopeId","data-v-161721db"]]),X=v({props:{group:{type:String,required:!0,default:`${l.ALL}`}},emits:["picked"],setup(e,{emit:s}){return{items:[{id:l.ALL,value:"All"},{id:l.ABI,value:"ABI"},{id:l.TBI,value:"TBI"}],pick:o=>{s("picked",o)}}}}),Y={class:"d-flex flex-row gap-2"},Z={class:"mb-0"},x=["onClick"];function ee(e,s,c,m,o,p){return a(),n("div",Y,[(a(!0),n(T,null,L(e.items,(r,u)=>(a(),n("div",{key:u,class:g(["entity-card w-100 ratio-1x1 text-center",{active:e.group===r.id}])},[t("h3",Z,[t("a",{href:"",class:"stretched-link",onClick:w(P=>e.pick(r.id),["prevent"])},h(r.value),9,x)])],2))),128))])}const se=b(X,[["render",ee]]),te=v({components:{KTeamMembers:W,KTeamSwitch:se,VPTeamPage:A,VPTeamPageTitle:M,VPTeamMembers:B,VPTeamPageSection:I},setup(){const e=z(l.ALL),s=o=>{e.value=o},c=C,m=$(()=>c.filter(([,o])=>e.value===l.ALL?!0:(Array.isArray(o.team)?o.team:[o.team]).indexOf(e.value)!==-1));return{group:e,handlePicked:s,items:m}}}),ae={class:"mb-3"},ne={class:"mt-3 m-auto"};function re(e,s,c,m,o,p){const r=d("KTeamSwitch"),u=d("KTeamMembers"),P=d("VPTeamPageSection"),V=d("VPTeamPage");return a(),n("div",ae,[s[0]||(s[0]=t("div",{class:"page-title"},[t("h1",{class:"page-title-text"},[t("i",{class:"fas fa-user-friends"}),k(" Team")])],-1)),t("div",ne,[i(r,{group:e.group,onPicked:e.handlePicked},null,8,["group","onPicked"])]),i(V,null,{default:_(()=>[i(P,null,{members:_(()=>[i(u,{members:e.items},null,8,["members"])]),_:1})]),_:1})])}const oe=b(te,[["render",re],["__scopeId","data-v-160e5720"]]),de=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"team/index.md","filePath":"team/index.md"}'),ie={name:"team/index.md"},pe=Object.assign(ie,{setup(e){return(s,c)=>(a(),n("div",null,[i(oe)]))}});export{de as __pageData,pe as default};