//	HYPE.documents["index"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="index.hyperesources",c="index",e="index_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/index_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_596","HYPE_dtl_596",!0==(null!=a&&10>a||false==!0)?"HYPE-596.full.min.js":"HYPE-596.thin.min.js"),false==!0&&(a=a||l("HYPE_w_596","HYPE_wdtl_596","HYPE-596.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"hypeNewFlyer",source:"function(hypeDocument, element, event) {\tnewFlyer(hypeDocument);\n\n\n}",identifier:"112"},{name:"hypeLoadUser",source:"function(hypeDocument, element, event) {\n\t\n}",identifier:"113"},{name:"hypeShowFlyers",source:"function(hypeDocument, element, event) {\tshowFlyers(hypeDocument);\n\t\n}",identifier:"200"},{name:"hypeOpen",source:"function(hypeDocument, element, event) {\topen(hypeDocument);\n\t\n}",identifier:"201"},{name:"hypeHandleTicketConfirm",source:"function(hypeDocument, element, event) {\t\n\tif(GLOBALS.ticketConfirm == 0){\n\t\thypeDocument.startTimelineNamed('confirmTicketOrder', hypeDocument.kDirectionForward)\n\t\t\n\t}else if (GLOBALS.ticketConfirm == 1){\n\t\tGLOBALS.ticketConfirm = 0;\n\t\torderTicket();\n\n\t\t\n\t}\n\t\n\tGLOBALS.ticketConfirm++;\n\n}",identifier:"332"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_596(c,e,{"10":{n:"logic.js"},"2":{n:"jquery-3.3.1.min.js"},"-2":{n:"blank.gif"},"3":{n:"bootstrap.min.css"},"4":{p:1,n:"Pasted-1.jpg",g:"202",o:true,t:"@1x"},"5":{p:1,n:"Pasted-1_2x.jpg",g:"202",o:true,t:"@2x"},"6":{p:1,n:"Pasted-2.jpg",g:"212",o:true,t:"@1x"},"7":{p:1,n:"Pasted-2_2x.jpg",g:"212",o:true,t:"@2x"},"-1":{n:"PIE.htc"},"0":{p:1,n:"Pasted.jpg",g:"88",o:true,t:"@1x"},"8":{p:1,n:"Pasted-3.png",g:"224",o:true,t:"@1x"},"1":{p:1,n:"Pasted_2x.jpg",g:"88",o:true,t:"@2x"},"9":{p:1,n:"Pasted-3_2x.png",g:"224",o:true,t:"@2x"}},h,[],d,[{n:"Index",o:"23",X:[0]},{n:"flyers",o:"162",X:[1]},{n:"tickets",o:"206",X:[2]},{n:"flyer",o:"1",X:[3]}],[{o:"25",A:{a:[{p:4,h:"201"}]},p:"600px",a:100,Y:375,Z:667,b:100,cA:false,c:"#F2F4E7",L:[],bY:1,d:375,U:{},T:{"124":{i:"124",n:"showNewFlyer",z:0.03,b:[],a:[{f:"c",y:0,z:0.03,i:"e",e:1,s:0,o:"348"},{f:"c",y:0,z:0.01,i:"cY",e:"0",s:"1",o:"348"},{y:0.01,i:"cY",s:"0",z:0,o:"348",f:"c"},{y:0.03,i:"e",s:1,z:0,o:"348",f:"c"}],f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["353","346","359","355","347","356","357","352","348","354","349","351","350","358"],n:"Untitled Layout","_":0,v:{"352":{B:"#D8DDE4",bF:"348",c:218,P:0,d:141,I:"None",J:"None",K:"None",g:"#D4CDAB",L:"None",M:0,w:"",aI:10,N:0,O:0,A:"#D8DDE4",x:"visible",aJ:10,j:"absolute",C:"#D8DDE4",Q:2,z:3,D:"#D8DDE4",R:"#9B967D",aK:10,k:"div",S:2,a:1,aL:10,T:2,b:1},"349":{c:192,d:36,I:"None",J:"None",K:"None",L:"None",M:0,w:"\n  <input type=\"text\" class=\"form-control\" placeholder=\"Username\" id=\"signupFlyerName\" aria-label=\"Username\" aria-describedby=\"basic-addon1\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"348",C:"#D8DDE4",z:4,O:0,D:"#D8DDE4",P:0,a:14,b:14},"355":{c:100,bS:37,d:89,I:"None",r:"inline",cQ:1,J:"None",K:"None",cR:1,L:"None",aP:"pointer",M:0,N:0,aI:10,aA:{a:[{b:"124",p:3,z:false,symbolOid:"24"}]},O:0,x:"hidden",j:"absolute",aJ:10,k:"div",dB:"button",z:1,bF:"347",aK:10,P:0,a:1,aL:10,b:-3},"350":{c:95,d:36,I:"None",r:"inline",J:"None",K:"None",L:"None",M:0,w:"<button type=\"button\" style=\"width:100%\" class=\"btn btn-light\" onclick=\"newFlyer(HYPE.documents['index'])\">Sign Up</button>",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"348",C:"#D8DDE4",z:6,O:0,D:"#D8DDE4",P:0,a:14,b:90},"358":{c:96,d:36,I:"None",r:"inline",J:"None",K:"None",L:"None",aP:"pointer",M:0,w:"<button type=\"button\" style=\"width:100%\" class=\"btn btn-light\">Login</button>",N:0,A:"#D8DDE4",x:"visible",aA:{a:[{d:0.20000000298023224,p:1,g:5,e:"162"}]},j:"absolute",O:0,k:"div",dB:"button",z:8,C:"#D8DDE4",D:"#D8DDE4",B:"#D8DDE4",bF:"348",P:0,a:110,b:90},"347":{k:"div",x:"visible",c:102,d:86,z:1,r:"inline",a:26,j:"absolute",bF:"346",b:130},"353":{b:-679,z:1,K:"None",c:1086,L:"None",d:1556,M:0,N:0,dB:"button",O:0,P:0,bF:"348",Q:0,R:"#9B967D",j:"absolute",S:0,k:"div",aI:10,T:0,aJ:10,aK:10,aL:10,A:"#D8DDE4",B:"#D8DDE4",r:"inline",C:"#D8DDE4",D:"#D8DDE4",aA:{a:[{b:"124",p:3,z:true,symbolOid:"24"}]},aP:"pointer",w:"",x:"visible",I:"None",a:-590,J:"None"},"356":{b:13,z:4,K:"Solid",c:47,bC:2,L:"Solid",d:45,aS:0,M:2,J:"Solid",N:2,aT:0,O:2,aU:0,P:2,bF:"355",aV:0,j:"absolute",aI:25,k:"div",aJ:25,aK:25,aZ:0,aL:25,Y:31,Z:"break-word",r:"inline",s:"Helvetica,Arial,Sans-Serif",t:64,F:"center",G:"#FFFFFF",w:"+",bA:"#F0AB02",x:"visible",I:"Solid",a:24,y:"preserve",bB:2},"351":{c:192,d:36,I:"None",J:"None",K:"None",L:"None",M:0,w:"\n  <input type=\"text\" class=\"form-control\" placeholder=\"address\" id=\"signupFlyerAddress\" aria-label=\"address\" aria-describedby=\"basic-addon1\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"348",C:"#D8DDE4",z:5,O:0,D:"#D8DDE4",P:0,a:14,b:52},"359":{h:"202",p:"no-repeat",x:"visible",a:-9,q:"100% 100%",b:0,j:"absolute",bF:"355",z:2,k:"div",dB:"img",d:89,c:168,r:"inline"},"348":{x:"visible",a:-8,b:96,j:"absolute",cY:"1",c:219,k:"div",r:"inline",d:142,z:2,bF:"347",e:0},"354":{c:48,d:48,I:"None",r:"inline",J:"None",f:45,K:"None",g:"#D3CDAF",L:"None",M:0,w:"",N:0,A:"#D8DDE4",O:0,x:"visible",j:"absolute",k:"div",B:"#D8DDE4",C:"#D8DDE4",Q:2,z:2,D:"#D8DDE4",R:"#9B967D",bF:"348",P:0,S:2,a:38,T:-2,b:-5},"357":{G:"#9B967D",aU:0,c:100,d:17,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:12,g:"#FFFFFF",Z:"break-word",w:"Flyers",bF:"355",j:"absolute",x:"visible",k:"div",y:"preserve",z:5,aS:0,aT:0,a:0,F:"center",b:72},"346":{k:"div",x:"visible",c:375,d:667,z:1,a:0,j:"absolute",bS:37,b:-36}}},{o:"164",A:{a:[{p:4,h:"200"}]},p:"600px",a:100,Y:375,Z:667,b:100,cA:false,c:"#F2F4E7",L:[],bY:1,d:375,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["362","360","361"],n:"Untitled Layout","_":1,v:{"360":{k:"div",x:"scroll",c:375,d:667,z:2,r:"inline",a:0,j:"absolute",bS:61,b:-16},"361":{c:373,d:556,I:"None",J:"None",K:"None",L:"None",M:0,w:"<table id=\"flyersTable\" class=\"table\">\n<tbody>\n<tr><td>name</td><td>Trip count</td></tr><tr>\n\n\n</tr></tbody>\n</table>",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"360",C:"#D8DDE4",z:1,O:0,D:"#D8DDE4",P:0,a:0,b:198},"362":{h:"202",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",bF:"360",z:2,k:"div",dB:"img",d:198.125,c:375,r:"inline"}}},{o:"211",p:"600px",a:100,Y:375,Z:667,b:100,cA:false,c:"#F2F4E7",L:[],bY:1,d:375,U:{},T:{"313":{i:"313",n:"moveDepartAnimArrival",z:0.03,b:[],a:[{f:"c",y:0,z:0.03,i:"a",e:-381,s:5,o:"411"},{f:"c",y:0,z:0.03,i:"a",e:5,s:391,o:"409"},{f:"c",y:0,z:0.03,i:"a",e:5,s:391,o:"410"},{f:"c",y:0.01,z:0.01,i:"a",e:-40,s:0,o:"363"},{y:0.02,i:"a",s:-40,z:0,o:"363",f:"c"},{y:0.03,i:"a",s:5,z:0,o:"410",f:"c"},{y:0.03,i:"a",s:-381,z:0,o:"411",f:"c"},{y:0.03,i:"a",s:5,z:0,o:"409",f:"a"}],f:30},"331":{i:"331",n:"confirmTicketOrder",z:0.05,b:[],a:[{f:"a",y:0,z:0.01,i:"w",e:"<button type=\"button\" style=\"width:100%;font-size:10px\" class=\"btn btn-success\">Confirm</button>",s:"<button type=\"button\" style=\"width:100%;font-size:10px\" class=\"btn btn-info\">Book</button>",o:"412"},{f:"c",y:0,z:0.01,i:"c",e:57,s:49,o:"412"},{f:"c",y:0,z:0.01,i:"a",e:305,s:313,o:"412"},{f:"c",y:0,z:0.05,i:"g",e:"#D2DBC7",s:"#D4CDAB",o:"383"},{y:0.01,i:"w",s:"<button type=\"button\" style=\"width:100%;font-size:10px\" class=\"btn btn-success\">Confirm</button>",z:0,o:"412",f:"a"},{y:0.01,i:"c",s:57,z:0,o:"412",f:"c"},{y:0.01,i:"a",s:305,z:0,o:"412",f:"c"},{y:0.05,i:"g",s:"#D2DBC7",z:0,o:"383",f:"c"}],f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["363","368","364","365","366","367","370","411","369","408","409","372","371","375","373","378","376","379","381","380","397","396","400","398","403","401","404","406","405","374","377","382","399","402","407","395","410","383","384","387","385","390","388","391","393","392","412","386","389","394"],n:"Untitled Layout","_":2,v:{"392":{k:"div",x:"visible",c:91,d:38,z:8,r:"inline",a:222,j:"absolute",bF:"383",b:8},"368":{k:"div",x:"visible",c:376,d:147,z:1,r:"inline",a:-1,j:"absolute",bF:"364",b:-32},"387":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Depart",bF:"385",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"401":{k:"div",x:"visible",c:91,d:35,z:6,a:151,j:"absolute",bF:"396",b:8},"374":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"JFK &nbsp; 5:30pm",bF:"373",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"409":{k:"div",x:"visible",c:365,d:78,z:12,r:"inline",a:391,j:"absolute",bF:"369",b:0},"393":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Non - Stop",bF:"392",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:0},"369":{k:"div",x:"visible",c:375,d:531,z:5,r:"inline",a:0,j:"absolute",bF:"364",b:122},"380":{k:"div",x:"visible",c:91,d:38,z:9,r:"inline",a:246,j:"absolute",bF:"371",b:8},"388":{k:"div",x:"visible",c:91,d:35,z:5,a:131,j:"absolute",bF:"383",b:9},"402":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"CGN &nbsp; 2:30am",bF:"401",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"375":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Depart",bF:"373",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"394":{G:"#34495E",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"normal",w:"$1,123",bF:"392",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:19},"381":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Non - Stop",bF:"380",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:0},"389":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"CGN &nbsp; 2:30am",bF:"388",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"403":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"<b>Arrive</b>",bF:"401",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"376":{k:"div",x:"visible",c:91,d:35,z:6,a:151,j:"absolute",bF:"371",b:8},"395":{G:"#575757",aU:0,c:365,d:24,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",v:"bold",w:"Arrivals<br>",bF:"410",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"left",b:0},"363":{h:"212",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:-16,j:"absolute",bF:"368",z:1,k:"div",dB:"img",d:163,c:416,r:"inline"},"382":{G:"#34495E",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"normal",w:"$1,123",bF:"380",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:19},"404":{G:"#38495C",aU:0,c:15,bS:39,d:13,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",X:-2,t:11,Z:"break-word",w:"+1",bF:"401",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:0,E:-22,aT:0,a:61,F:"center",b:-3},"377":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"CGN &nbsp; 2:30am",bF:"376",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"396":{x:"visible",aI:5,a:0,b:24,j:"absolute",aJ:5,z:1,k:"div",bF:"409",d:54,aK:5,c:365,r:"inline",aL:5,g:"#D4CDAB"},"364":{k:"div",x:"hidden",c:375,d:667,z:2,r:"inline",a:-1,j:"absolute",bS:61,b:-1},"410":{k:"div",x:"visible",c:365,d:78,z:9,r:"inline",a:391,j:"absolute",bF:"369",b:84},"383":{aI:5,a:0,dB:"button",b:24,x:"visible",aJ:5,aA:{a:[{p:4,h:"332"}]},z:1,j:"absolute",d:54,aK:5,k:"div",aP:"pointer",bF:"410",c:365,aL:5,r:"inline",g:"#D4CDAB"},"370":{G:"#575757",aU:0,c:365,d:24,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",v:"bold",w:"Departures<br>",bF:"411",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"left",b:0},"378":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"<b>Arrive</b>",bF:"376",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"405":{k:"div",x:"visible",c:91,d:38,z:9,r:"inline",a:246,j:"absolute",bF:"396",b:8},"397":{Q:0,h:"224",x:"visible",R:"#000000",q:"100% 100%",b:7,S:0,a:0,z:2,T:0,dB:"img",d:40,j:"absolute",k:"div",p:"no-repeat",bF:"396",c:40,r:"inline"},"365":{c:118,d:36,I:"None",r:"inline",J:"None",K:"None",L:"None",M:0,w:"<input type=\"text\" class=\"form-control\" style=\"opacity: 0.75;\" placeholder=\"To\" id=\"ticketTo\" aria-label=\"Username\" aria-describedby=\"basic-addon1\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"368",C:"#D8DDE4",z:2,O:0,D:"#D8DDE4",P:0,a:5,b:101},"411":{k:"div",x:"visible",c:365,d:78,z:6,r:"inline",a:5,j:"absolute",bF:"369",b:0},"384":{Q:0,h:"224",x:"visible",R:"#000000",q:"100% 100%",b:7,S:0,a:0,z:2,T:0,dB:"img",d:40,j:"absolute",k:"div",p:"no-repeat",bF:"383",c:40,r:"inline"},"371":{aI:5,a:0,dB:"button",b:24,x:"visible",aJ:5,aA:{a:[{b:"313",p:3,z:false,symbolOid:"207"}]},z:1,j:"absolute",d:54,aK:5,k:"div",aP:"pointer",bF:"411",c:365,aL:5,r:"inline",g:"#D4CDAB"},"379":{G:"#38495C",aU:0,c:15,bS:39,d:13,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",X:-2,t:11,Z:"break-word",w:"+1",bF:"376",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:0,E:-22,aT:0,a:61,F:"center",b:-3},"390":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"<b>Arrive</b>",bF:"388",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"398":{k:"div",x:"visible",c:91,d:35,z:4,a:56,j:"absolute",bF:"396",b:8},"366":{c:118,d:36,I:"None",r:"inline",J:"None",K:"None",L:"None",M:0,w:"<input type=\"text\" class=\"form-control\" style=\"opacity: 0.75;\" placeholder=\"From\" id=\"ticketFrom\" aria-label=\"Username\" aria-describedby=\"basic-addon1\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"368",C:"#D8DDE4",z:3,O:0,D:"#D8DDE4",P:0,a:133,b:101},"406":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Non - Stop",bF:"405",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:0},"385":{k:"div",x:"visible",c:91,d:35,z:4,a:40,j:"absolute",bF:"383",b:8},"412":{c:49,d:25,I:"None",r:"inline",J:"None",K:"None",t:12,L:"None",M:0,w:"<button type=\"button\" style=\"width:100%;font-size:10px\" class=\"btn btn-info\">Book</button>",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"383",C:"#D8DDE4",z:9,O:0,D:"#D8DDE4",P:0,a:313,b:13},"372":{Q:0,h:"224",x:"visible",R:"#000000",q:"100% 100%",b:7,S:0,a:0,z:2,T:0,dB:"img",d:40,j:"absolute",k:"div",p:"no-repeat",bF:"371",c:40,r:"inline"},"407":{G:"#34495E",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"normal",w:"$1,123",bF:"405",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:19},"391":{G:"#38495C",aU:0,c:15,bS:39,d:13,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",X:-2,t:11,Z:"break-word",w:"+1",bF:"388",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:0,E:-22,aT:0,a:61,F:"center",b:-3},"399":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"JFK &nbsp; 5:30pm",bF:"398",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"367":{c:107,d:36,I:"None",r:"inline",J:"None",K:"None",t:12,L:"None",M:0,w:"<button type=\"button\" style=\"width:100%\" class=\"btn btn-light\">Flights</button>",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",bF:"368",C:"#D8DDE4",z:4,O:0,D:"#D8DDE4",P:0,a:262,b:101},"386":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",w:"JFK &nbsp; 5:30pm",bF:"385",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"center",b:16},"400":{G:"#FFFFFF",aU:0,c:91,bS:39,d:19,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:13,Z:"break-word",v:"bold",w:"Depart",bF:"398",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:0},"373":{k:"div",x:"visible",c:91,d:35,z:4,a:56,j:"absolute",bF:"371",b:8},"408":{G:"#575757",aU:0,c:365,d:24,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",v:"bold",w:"Departure Ticket<br>",bF:"409",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"left",b:0}}},{o:"3",p:"600px",a:100,Y:375,Z:667,b:100,cA:false,c:"#F2F4E7",L:[],bY:1,d:375,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["413","422","414","417","416","415","418","420","421","419","436","435","438","430","437","431","433","432","434","426","424","429","423","439","425","427","428"],n:"Untitled Layout","_":3,v:{"433":{G:"#FFFFFF",aU:0,c:108,aV:0,d:46,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:36,Z:"break-word",w:"0<br>",bF:"430",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:0,aT:0,a:9,F:"center",b:60},"425":{c:100,bS:33,d:90,I:"None",r:"inline",cQ:1,J:"None",K:"None",cR:1,L:"None",aP:"pointer",M:0,i:"flyerTripIcon",N:0,aI:10,aA:{a:[{d:0.30000001192092896,p:1,g:5,e:"206"}]},O:0,x:"hidden",j:"absolute",aJ:10,k:"div",dB:"button",z:1,bF:"424",aK:10,P:0,a:5,aL:10,b:6},"417":{G:"#000000",aU:0,c:76,d:31,aV:0,r:"inline",s:"Arial,Helvetica,Sans-Serif",t:16,Y:29,u:"normal",Z:"break-word",v:"normal",w:"<font color=\"#232330\"><span style=\"caret-color: rgb(35, 35, 48);\">Welcome</span></font><br>",bF:"416",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"right",b:0},"438":{b:1,z:1,K:"None",c:361,bC:0,cP:"section",d:210,L:"None",M:0,J:"None",N:0,O:0,P:0,bF:"430",Q:2,R:"#B9A394",j:"absolute",S:2,k:"div",aI:20,T:2,aJ:20,aK:20,aZ:0,aL:20,A:"#D8DDE4",B:"#D8DDE4",r:"inline",C:"#D8DDE4",D:"#D8DDE4",w:"",bA:"#000000",x:"visible",I:"None",a:0,bB:0},"421":{G:"#000000",aU:0,c:328,d:31,aV:0,r:"inline",s:"Arial,Helvetica,Sans-Serif",t:13,Y:29,u:"normal",Z:"break-word",v:"normal",i:"flyerId",w:"<font color=\"#232330\"><span style=\"caret-color: rgb(35, 35, 48);\">0xa</span></font><br>",bF:"419",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:47,b:-7},"413":{Q:2,x:"visible",R:"#D4CDAB",a:0,b:0,S:0,j:"absolute",z:4,cP:"header",T:2,d:78,k:"div",bS:37,c:375,r:"inline",g:"rgba(242, 244, 232, 0.750)"},"434":{G:"#9B967D",aU:0,c:359,d:25,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:12,Y:25,g:"#FFFFFF",L:"Solid",Z:"break-word",v:"bold",w:"<span style=\"font-weight: normal;\">Use Your airCoins Anywhere Accepted</span><br>",aI:18,j:"absolute",x:"visible",bF:"430",k:"div",y:"preserve",aJ:18,P:1,z:6,aS:0,D:"#FFFFFF",aT:10,a:2,F:"left",b:184},"426":{h:"88",p:"no-repeat",x:"visible",a:-24,q:"100% 100%",b:-1,j:"absolute",i:"flyerCityBG",z:2,k:"div",dB:"img",d:90,bF:"425",c:162,e:1,r:"inline"},"418":{G:"#000000",aU:0,c:299,d:31,aV:0,r:"inline",s:"Arial,Helvetica,Sans-Serif",t:16,Y:29,u:"normal",Z:"break-word",v:"bold",i:"flyerName",w:"<font color=\"#232330\"><span style=\"caret-color: rgb(35, 35, 48);\">Marius</span></font><br>",bF:"416",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:76,b:0},"439":{G:"#9B967D",aU:0,c:100,d:17,aV:0,cY:"1",r:"inline",s:"Helvetica,Arial,Sans-Serif",t:12,Y:18,g:"#FFFFFF",Z:"break-word",v:"bold",i:"flyerTicketNumber",w:"T1533001622554",bF:"425",j:"absolute",x:"visible",k:"div",y:"preserve",z:6,aS:0,aT:0,a:0,F:"center",b:0},"430":{k:"div",x:"visible",c:361,d:212,z:3,a:7,j:"absolute",bF:"422",b:118},"422":{k:"div",x:"scroll",c:375,d:667,z:3,a:0,j:"absolute",bS:61,b:0},"414":{G:"#000000",aU:0,c:177,d:31,aV:0,r:"inline",s:"Arial,Helvetica,Sans-Serif",t:24,Y:29,u:"normal",Z:"break-word",v:"normal",w:"<b><font color=\"#232330\">air</font></b><span style=\"font-size: 30px;\"><font color=\"#4f6367\">Pay</font></span>",bF:"413",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:10,a:0,b:8},"435":{k:"div",x:"visible",bF:"430",c:75,d:75,z:4,a:272,j:"absolute",bS:33,b:-38},"427":{b:13,z:3,K:"Solid",c:47,bC:2,L:"Solid",d:45,aS:0,M:2,J:"Solid",N:2,aT:0,O:2,aU:0,P:2,bF:"425",i:"flyerAddSign",aV:0,j:"absolute",aI:25,k:"div",aJ:25,aK:25,aZ:0,aL:25,Y:31,Z:"break-word",r:"inline",s:"Helvetica,Arial,Sans-Serif",t:64,F:"center",G:"#FFFFFF",w:"+",bA:"#F0AB02",x:"visible",I:"Solid",a:24,y:"preserve",bB:2},"419":{k:"div",x:"visible",c:375,d:24,z:3,r:"inline",a:0,j:"absolute",bF:"415",b:24},"431":{G:"#FFFFFF",aU:0,c:108,d:18,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",v:"bold",w:"Balance<br>",bF:"430",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:9,F:"center",b:37},"423":{k:"div",x:"visible",c:375,d:100,z:1,a:0,j:"absolute",bF:"422",b:346},"415":{k:"div",x:"visible",bF:"413",c:375,d:39,z:1,r:"inline",a:0,j:"absolute",bS:39,b:35},"436":{B:"#D8DDE4",bF:"435",c:75,P:0,d:75,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,w:"",aI:40,N:0,O:0,A:"#D8DDE4",x:"visible",aJ:40,j:"absolute",C:"#D8DDE4",Q:2,z:1,D:"#D8DDE4",R:"#D4CDAB",aK:40,k:"div",S:2,a:0,aL:40,T:2,b:0},"428":{G:"#9B967D",aU:0,c:100,d:17,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:12,g:"#FFFFFF",Z:"break-word",i:"flyerTripLoc",w:"New Trip<br>",bF:"425",j:"absolute",x:"visible",k:"div",y:"preserve",z:5,aS:0,aT:0,a:0,F:"center",b:72},"432":{G:"#FFFFFF",aU:0,c:111,d:18,aV:0,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",v:"bold",w:"<span style=\"font-weight: normal;\">airCoins</span><br>",bF:"430",j:"absolute",x:"visible",k:"div",y:"preserve",z:5,aS:0,aT:0,a:9,F:"center",b:106},"424":{k:"div",x:"scroll",c:375,d:100,z:2,i:"flyerTrips",a:0,j:"absolute",bF:"423",b:0},"416":{k:"div",x:"visible",c:375,d:24,z:2,a:0,j:"absolute",bF:"415",b:0},"437":{G:"#9B967D",aU:0,c:75,aV:0,d:24,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:12,Z:"break-word",w:"Top Up",bF:"435",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:0,aT:0,a:0,F:"center",b:51},"429":{c:375,cP:"section",d:100,I:"None",r:"inline",J:"None",K:"None",L:"None",M:0,w:"",aI:0,A:"#D8DDE4",N:0,x:"visible",O:0,aJ:0,j:"absolute",C:"#D8DDE4",z:1,k:"div",D:"#D8DDE4",aK:0,B:"#D8DDE4",bF:"423",P:0,a:0,aL:0,b:0},"420":{G:"#000000",aU:0,c:39,d:31,aV:0,r:"inline",s:"Arial,Helvetica,Sans-Serif",t:13,Y:29,u:"normal",Z:"break-word",v:"normal",w:"<font color=\"#232330\"><span style=\"caret-color: rgb(35, 35, 48);\">Flyer</span></font><br>",bF:"419",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:0,aT:0,a:0,F:"right",b:-7}}}],{},g,{},null,false,true,-1,true,false,true,true);f[c]=a.API;document.getElementById(e).setAttribute("HYP_dn",
c);a.z_o(this.body)})();})();
