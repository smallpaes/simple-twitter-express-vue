(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f97d0b6"],{"16c0":function(e,t,r){"use strict";var s=r("b60e"),n=r.n(s);n.a},"9f73":function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center"},[r("h1",{staticClass:"mb-2 username"},[e._v(e._s(e.user.name))]),r("div",{staticClass:"userpic mb-2"},[r("img",{staticStyle:{height:"150px",width:"150px"},attrs:{src:e._f("placeholderImage")(e.user.avatar),alt:"avatar"}})]),r("p",{staticClass:"mt-3 mb-3"},[e._v(e._s(e.user.introduction))]),r("ul",{staticClass:"mt-3"},[r("li",[r("router-link",{attrs:{to:{name:"followings",params:{id:e.user.id}}}},[e._v(e._s(e.user.FollowingCount)+" Followings")])],1),r("li",[r("router-link",{attrs:{to:{name:"followers",params:{id:e.user.id}}}},[e._v(e._s(e.user.FollowerCount)+" Followers")])],1),r("li",[r("router-link",{attrs:{to:{name:"likes",params:{id:e.user.id}}}},[e._v(e._s(e.user.LikeCount)+" Likes")])],1),r("li",[r("router-link",{attrs:{to:{name:"user-tweets",params:{id:e.user.id}}}},[e._v(e._s(e.user.TweetsCount)+" Tweets")])],1)]),r("div",{staticClass:"userbuttons"},[e.user.isFollowing?r("button",{staticClass:"btn btn-danger",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.removeFollowing(e.user.id)}}},[e._v("unFollow")]):e.user.id==e.currentUser.id?r("router-link",{staticClass:"btn btn-secondary",attrs:{to:{name:"user-edit",params:{id:e.user.id}}}},[e._v("Edit")]):r("button",{staticClass:"btn btn-primary",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.addFollowing(e.user.id)}}},[e._v("Follow")])],1)])},n=[],o=(r("8e6e"),r("ac6a"),r("456d"),r("c5f6"),r("96cf"),r("3b8d")),i=r("bd86"),a=r("2708"),l=r("2f62"),u=r("b025"),c=r("2fa3");function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(r,!0).forEach((function(t){Object(i["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w={mixins:[a["b"]],props:{initialUser:{type:Object,required:!0}},data:function(){return{user:this.initialUser}},watch:{initialUser:function(e){this.user=p({},this.user,{},e)}},computed:p({},Object(l["b"])(["currentUser"])),methods:{addFollowing:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r,s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u["a"].addFollowing({userId:t});case 3:if(r=e.sent,s=r.data,n=r.statusText,"OK"===n&&"success"===s.status){e.next=8;break}throw new Error(n);case 8:this.user=p({},this.user,{isFollowing:!0,FollowerCount:Number(this.user.FollowerCount)+1}),this.$emit("after-add-followship",{currentUser:this.currentUser}),c["a"].fire({type:"success",title:"Successfully follow the user!"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](0),c["a"].fire({type:"error",title:"Cannot follow the user, please try again later"});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}(),removeFollowing:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r,s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u["a"].removeFollowing({userId:t});case 3:if(r=e.sent,s=r.data,n=r.statusText,"OK"===n&&"success"===s.status){e.next=8;break}throw new Error(n);case 8:this.user=p({},this.user,{isFollowing:!1,FollowerCount:Number(this.user.FollowerCount)-1}),this.$emit("after-remove-followship",{currentUser:this.currentUser}),c["a"].fire({type:"success",title:"Successfully unfollow the user!"}),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](0),this.isProcessing=!1,c["a"].fire({type:"error",title:"Cannot unfollow the user, please try again later"});case 17:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}},d=w,h=(r("16c0"),r("2877")),b=Object(h["a"])(d,s,n,!1,null,null,null);t["a"]=b.exports},b60e:function(e,t,r){},d13f:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isLoading?r("Spinner"):r("section",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-3"},[r("UserProfile",{key:e.user.id,attrs:{"initial-user":e.user},on:{"after-add-followship":e.afterAddFollowship,"after-remove-followship":e.afterRemoveFollowship}})],1),r("div",{staticClass:"col-lg-9"},[r("div",{staticClass:"row px-3"},[r("h4",{staticClass:"col-12 title"},[e._v("Follower")]),e._l(e.followers,(function(t){return r("UserFollowCard",{key:t.id,attrs:{"initial-user":t},on:{"add-following":e.handleAfterFollow,"remove-following":e.handleAfterUnfollow}})})),e.followers.length<1?r("div",{staticClass:"col-12 shadow-sm p-3 rounded bg-white"},[r("i",{staticClass:"fas fa-user mr-2"}),e._v("No followers\n        ")]):e._e()],2)])])])},n=[],o=(r("8e6e"),r("ac6a"),r("456d"),r("c5f6"),r("96cf"),r("3b8d")),i=r("bd86"),a=r("8e88"),l=r("4cce"),u=r("2fa3"),c=r("2375"),f=r("9f73"),p=r("2f62");function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(r,!0).forEach((function(t){Object(i["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h={components:{UserFollowCard:a["a"],Spinner:c["a"],UserProfile:f["a"]},data:function(){return{followers:[],user:{},isLoading:!1}},computed:d({},Object(p["b"])(["currentUser"])),created:function(){var e=this.$route.params.id;this.fetchUserFollowers(e)},beforeRouteUpdate:function(e,t,r){var s=e.params.id;this.fetchUserFollowers(s),r()},methods:{fetchUserFollowers:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r,s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,l["a"].getFollowers({userId:t});case 4:if(r=e.sent,s=r.statusText,n=r.data,"OK"===s&&"success"===n.status){e.next=9;break}throw new Error(s);case 9:this.followers=n.followshipData,this.user=n.userData,this.isLoading=!1,e.next=18;break;case 14:e.prev=14,e.t0=e["catch"](0),this.isLoading=!1,u["a"].fire({type:"error",title:"Cannot get followers, please try again later!"});case 18:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(t){return e.apply(this,arguments)}return t}(),afterAddFollowship:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=t.currentUser,this.followers.push(d({},r,{isFollowing:!0}));case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),afterRemoveFollowship:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=t.currentUser,this.followers=this.followers.filter((function(e){return e.id!==r.id}));case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleAfterFollow:function(){this.currentUser.id===this.user.id&&(this.user.FollowingCount=Number(this.user.FollowingCount)+1)},handleAfterUnfollow:function(){this.currentUser.id===this.user.id&&(this.user.FollowingCount=Number(this.user.FollowingCount)-1)}}},b=h,v=r("2877"),m=Object(v["a"])(b,s,n,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-0f97d0b6.b8cd2731.js.map