import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import store from './store'
import Tweets from './views/Tweets'

Vue.use(Router)

// for admin page authorization
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'Admin') {
    next({ name: 'not-found' })
    return
  }
  next()
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'log-in',
      component: Login
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: Signup
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: Tweets
    },
    {
      path: '/tweets/:tweet_id/replies',
      name: 'tweet-replies',
      component: () => import('./views/TweetReplies.vue')
    },
    {
      path: '/users/:id/followings',
      name: 'followings',
      component: () => import('./views/Followings.vue')
    },
    {
      path: '/users/:id/followers',
      name: 'followers',
      component: () => import('./views/Followers.vue')
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('./views/UserEdit.vue')
    },
    {
      path: '/users/:id/tweets',
      name: 'user-tweets',
      component: () => import('./views/UserTweets.vue')
    },
    {
      path: '/users/:id/likes',
      name: 'likes',
      component: () => import('./views/Likes.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('./views/AdminUsers.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/tweets',
      name: 'admin-tweets',
      component: () => import('./views/AdminTweets.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // retrieve token from local storage
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // handle routes without authentication
  const pathWithoutAuthentication = ['sign-up']
  if (pathWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // compare tokens
  if (tokenInLocalStorage && (tokenInStore !== tokenInLocalStorage)) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // redirect to sign in page when user is not authenticated
  if (!isAuthenticated && to.name !== 'log-in') {
    next('/login')
    return
  }
  // redirect to tweets page when user is authenticated
  if (isAuthenticated && to.name === 'log-in') {
    next('/tweets')
    return
  }


  next()
})

export default router