(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-037409e4"],{"16c0":function(e,t,r){"use strict";var s=r("b60e"),i=r.n(s);i.a},1985:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isLoading?r("Spinner"):r("section",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-3"},[r("UserProfile",{key:e.user.id,attrs:{"initial-user":e.user}})],1),r("div",{staticClass:"col-lg-9"},[r("div",{staticClass:"row px-3"},[r("h4",{staticClass:"col-12 title"},[e._v("Tweet")]),r("TweetCard",{key:e.tweets.id,attrs:{"initial-tweet":e.tweets},on:{"after-remove-like":e.afterRemoveLike,"after-add-like":e.afterAddLike,"after-delete-tweet":e.afterDeleteTweet}}),r("h4",{staticClass:"col-12 title"},[e._v("Replies")]),e._l(e.replies,(function(t){return r("RepliesCard",{key:t.id,attrs:{"initial-reply":t},on:{"after-delete-reply":e.afterDeleteReply}})})),r("CreateReply",{staticClass:"col-12",attrs:{"tweet-id":e.tweets.id,"user-id":e.currentUser.id},on:{"after-create-reply":e.afterCreateReply}})],2)]),e.tweets.length<1?r("div",{staticClass:"col-12 shadow-sm p-3 rounded bg-white"},[r("i",{staticClass:"fas fa-user mr-2"}),e._v("Haven't post any tweets yet\n    ")]):e._e()])])},i=[],n=(r("8e6e"),r("ac6a"),r("456d"),r("c5f6"),r("7f7f"),r("96cf"),r("3b8d")),a=r("bd86"),o=r("8f7b"),c=r("7482"),l=r("9f73"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-12 p-2"},[r("div",{staticClass:"tweets rounded shadow-sm"},[r("div",{staticClass:"avatar"},[r("router-link",{attrs:{to:{name:"user-tweets",params:{id:e.reply.UserId}}}},[r("img",{staticClass:"mr-3 rounded-circle",attrs:{src:e._f("placeholderImage")(e.reply.User.avatar),alt:"avatar"}})])],1),r("div",{staticClass:"content"},[r("div",{staticClass:"username mb-3"},[r("router-link",{staticClass:"userName",attrs:{to:{name:"user-tweets",params:{id:e.reply.UserId}}}},[r("span",{staticClass:"pr-2"},[e._v("@"+e._s(e.reply.User.name)+",")])]),r("span",[e._v(e._s(e._f("date")(e.reply.createdAt)))])],1),r("p",{directives:[{name:"show",rawName:"v-show",value:!e.reply.isEditing,expression:"!reply.isEditing"}]},[e._v(e._s(e.reply.comment))]),r("textarea",{directives:[{name:"show",rawName:"v-show",value:e.reply.isEditing,expression:"reply.isEditing"},{name:"model",rawName:"v-model",value:e.reply.comment,expression:"reply.comment"}],staticClass:"textarea col-12 p-3 bg-light rounded",attrs:{type:"text"},domProps:{value:e.reply.comment},on:{input:function(t){t.target.composing||e.$set(e.reply,"comment",t.target.value)}}})]),e.reply.UserId===e.currentUser.id||"Admin"===e.currentUser.role?r("div",{staticClass:"button"},[r("button",{staticClass:"btn btn-danger",attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.deleteReply(e.reply.id)}}},[e._v("Delete")]),e.reply.UserId===e.currentUser.id?r("div",{staticClass:"edit my-3"},[r("button",{directives:[{name:"show",rawName:"v-show",value:!e.reply.isEditing,expression:"!reply.isEditing"}],staticClass:"btn btn-primary",attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.toggleIsEditing(e.reply.id)}}},[e._v("Edit")]),r("button",{directives:[{name:"show",rawName:"v-show",value:e.reply.isEditing,expression:"reply.isEditing"}],staticClass:"btn btn-info",attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.updateReply(e.reply.id,e.reply.comment)}}},[e._v("Save")])]):e._e(),r("button",{directives:[{name:"show",rawName:"v-show",value:e.reply.isEditing,expression:"reply.isEditing"}],staticClass:"cancel btn btn-warning",on:{click:function(t){return e.handleCancel(e.reply.id)}}},[e._v("Cancel")])]):e._e()])])},p=[],d=r("2708"),f=r("2fa3"),m={putReply:function(e){var t=e.reply_id,r=e.reply;return f["b"].put("/replies/".concat(t),r)},deleteReply:function(e){var t=e.reply_id;return f["b"].delete("/replies/".concat(t))}},h=r("c1df"),w=r.n(h),y=r("2f62");function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b={mixins:[d["b"]],props:{initialReply:{type:Object,require:!0}},computed:v({},Object(y["b"])(["currentUser"])),filters:{date:function(e){return w()(e).format("YYYY-MM-DD, HH:MM")}},data:function(){return{reply:this.initialReply,isProcessing:!1}},methods:{deleteReply:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isProcessing=!0,e.next=3,m.deleteReply({reply_id:t});case 3:if(r=e.sent,s=r.data,i=r.statusText,"Accepted"===i&&"success"===s.status){e.next=8;break}throw new Error(i);case 8:this.$emit("after-delete-reply",t);case 9:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),toggleIsEditing:function(e){if(this.isProcessing=!0,this.reply.id!==e)return this.reply;this.reply.commentCached=this.reply.comment,this.reply.isEditing=!this.reply.isEditing,this.isProcessing=!1},updateReply:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var s,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isProcessing=!0,this.toggleIsEditing(t),e.next=5,m.putReply({reply_id:t,reply:{comment:r}});case 5:if(s=e.sent,i=s.data,n=s.statusText,"Created"===n&&"success"===i.status){e.next=10;break}throw new Error(n);case 10:this.isProcessing=!1,e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](0),f["a"].fire({type:"error",title:"cannot edit reply, please try again later"});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t,r){return e.apply(this,arguments)}return t}(),handleCancel:function(e){if(this.reply.id!==e)return this.reply;this.reply.comment=this.reply.commentCached,this.toggleIsEditing(e)}}},C=b,O=(r("67eb"),r("2877")),x=Object(O["a"])(C,u,p,!1,null,"931ad532",null),k=x.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{staticClass:"mb-5 p-2",on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[r("div",{staticClass:"test"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.comment,expression:"comment"}],staticClass:"textarea col-12 mb-3 bg-light rounded",staticStyle:{"min-height":"9em"},attrs:{minlength:"1",maxlength:"140",required:""},domProps:{value:e.comment},on:{input:[function(t){t.target.composing||(e.comment=t.target.value)},e.input]}})]),r("div",{staticClass:"text-right pr-4"},[r("button",{staticClass:"btn btn-primary rounded",attrs:{type:"submit",disabled:e.isProcessing}},[e._v("Reply")])])])},P=[],j=(r("28a5"),{props:{UserId:{type:Number,required:!0},TweetId:{type:Number,required:!0}},data:function(){return{comment:"",isProcessing:!0}},methods:{handleSubmit:function(){var e=this.comment.split(" ").join("").length;if(0===e)return f["a"].fire({type:"error",title:"the comment cannot empty."});var t={TweetId:this.TweetId,UserId:this.UserId,comment:this.comment};this.comment="",this.$emit("after-create-reply",t),this.isProcessing=!0},input:function(e){e.target.value.length>0?(this.isProcessing=!1,e.target.style.cssText="min-height: 9em;",e.target.style.cssText="min-height: ".concat(e.target.scrollHeight,"px;")):this.isProcessing=!0,this.comment=e.target.value}}}),R=j,U=(r("33bf"),Object(O["a"])(R,_,P,!1,null,"5fc72158",null)),E=U.exports,D=r("2375");function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(r,!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var F={components:{TweetCard:o["a"],Spinner:D["a"],UserProfile:l["a"],RepliesCard:k,CreateReply:E},computed:T({},Object(y["b"])(["currentUser"])),data:function(){return{tweets:{},replies:[],followings:[],user:{},isLoading:!1}},created:function(){var e=this.$route.params.tweet_id;this.fetchUserTweet(e)},beforeRouteUpdate:function(e,t,r){this.fetchUserTweet(e.params.tweet_id),r()},methods:{fetchUserTweet:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,c["a"].getReplies({tweet_id:t});case 4:if(r=e.sent,s=r.statusText,i=r.data,"OK"===s&&"success"===i.status){e.next=9;break}throw new Error(s);case 9:this.tweets=i.tweetData,this.user=i.userData,this.replies=i.Replies.map((function(e){return T({},e,{isEditing:!1})})),this.isLoading=!1,e.next=19;break;case 15:e.prev=15,e.t0=e["catch"](0),this.isLoading=!1,f["a"].fire({type:"error",title:"Cannot get tweet and replies, please try again later!"});case 19:case"end":return e.stop()}}),e,this,[[0,15]])})));function t(t){return e.apply(this,arguments)}return t}(),afterCreateReply:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].postReplies({tweet_id:t.TweetId,formData:t});case 3:if(r=e.sent,s=r.data,i=r.statusText,"Created"===i&&"success"===s.status){e.next=8;break}throw new Error(s.message);case 8:this.replies.unshift({id:s.reply_id,comment:t.comment,TweetId:t.TweetId,UserId:t.UserId,createdAt:new Date,isEditing:!1,User:{id:this.currentUser.id,name:this.currentUser.name,avatar:this.currentUser.avatar}}),this.tweets.RepliesCount=Number(this.tweets.RepliesCount)+1,e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),f["a"].fire({type:"error",title:e.t0.message||"Cannot post tweet, please try again."});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}(),afterDeleteReply:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:try{this.replies=this.replies.filter((function(e){return e.id!==t})),this.tweets.RepliesCount=Number(this.tweets.RepliesCount)-1}catch(r){f["a"].fire({type:"error",title:"cannot delete reply, please try again later"})}case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),afterRemoveLike:function(){this.currentUser.id===this.user.id&&(this.user.LikeCount=Number(this.user.LikeCount)-1)},afterAddLike:function(){this.currentUser.id===this.user.id&&(this.user.LikeCount=Number(this.user.LikeCount)+1)},afterDeleteTweet:function(){this.$router.push({path:"/users/".concat(this.tweets.UserId,"/tweets")})}}},N=F,L=Object(O["a"])(N,s,i,!1,null,null,null);t["default"]=L.exports},"33bf":function(e,t,r){"use strict";var s=r("c7f4"),i=r.n(s);i.a},"67eb":function(e,t,r){"use strict";var s=r("b179"),i=r.n(s);i.a},"9f73":function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center"},[r("h1",{staticClass:"mb-2 username"},[e._v(e._s(e.user.name))]),r("div",{staticClass:"userpic mb-2"},[r("img",{staticStyle:{height:"150px",width:"150px"},attrs:{src:e._f("placeholderImage")(e.user.avatar),alt:"avatar"}})]),r("p",{staticClass:"mt-3 mb-3"},[e._v(e._s(e.user.introduction))]),r("ul",{staticClass:"mt-3"},[r("li",[r("router-link",{attrs:{to:{name:"followings",params:{id:e.user.id}}}},[e._v(e._s(e.user.FollowingCount)+" Followings")])],1),r("li",[r("router-link",{attrs:{to:{name:"followers",params:{id:e.user.id}}}},[e._v(e._s(e.user.FollowerCount)+" Followers")])],1),r("li",[r("router-link",{attrs:{to:{name:"likes",params:{id:e.user.id}}}},[e._v(e._s(e.user.LikeCount)+" Likes")])],1),r("li",[r("router-link",{attrs:{to:{name:"user-tweets",params:{id:e.user.id}}}},[e._v(e._s(e.user.TweetsCount)+" Tweets")])],1)]),r("div",{staticClass:"userbuttons"},[e.user.isFollowing?r("button",{staticClass:"btn btn-danger",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.removeFollowing(e.user.id)}}},[e._v("unFollow")]):e.user.id==e.currentUser.id?r("router-link",{staticClass:"btn btn-secondary",attrs:{to:{name:"user-edit",params:{id:e.user.id}}}},[e._v("Edit")]):r("button",{staticClass:"btn btn-primary",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.addFollowing(e.user.id)}}},[e._v("Follow")])],1)])},i=[],n=(r("8e6e"),r("ac6a"),r("456d"),r("c5f6"),r("96cf"),r("3b8d")),a=r("bd86"),o=r("2708"),c=r("2f62"),l=r("b025"),u=r("2fa3");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(r,!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f={mixins:[o["b"]],props:{initialUser:{type:Object,required:!0}},data:function(){return{user:this.initialUser}},watch:{initialUser:function(e){this.user=d({},this.user,{},e)}},computed:d({},Object(c["b"])(["currentUser"])),methods:{addFollowing:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l["a"].addFollowing({userId:t});case 3:if(r=e.sent,s=r.data,i=r.statusText,"OK"===i&&"success"===s.status){e.next=8;break}throw new Error(i);case 8:this.user=d({},this.user,{isFollowing:!0,FollowerCount:Number(this.user.FollowerCount)+1}),this.$emit("after-add-followship",{currentUser:this.currentUser}),u["a"].fire({type:"success",title:"Successfully follow the user!"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](0),u["a"].fire({type:"error",title:"Cannot follow the user, please try again later"});case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}(),removeFollowing:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l["a"].removeFollowing({userId:t});case 3:if(r=e.sent,s=r.data,i=r.statusText,"OK"===i&&"success"===s.status){e.next=8;break}throw new Error(i);case 8:this.user=d({},this.user,{isFollowing:!1,FollowerCount:Number(this.user.FollowerCount)-1}),this.$emit("after-remove-followship",{currentUser:this.currentUser}),u["a"].fire({type:"success",title:"Successfully unfollow the user!"}),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](0),this.isProcessing=!1,u["a"].fire({type:"error",title:"Cannot unfollow the user, please try again later"});case 17:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}},m=f,h=(r("16c0"),r("2877")),w=Object(h["a"])(m,s,i,!1,null,null,null);t["a"]=w.exports},b179:function(e,t,r){},b60e:function(e,t,r){},c7f4:function(e,t,r){}}]);
//# sourceMappingURL=chunk-037409e4.47deeccf.js.map