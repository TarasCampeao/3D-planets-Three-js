import VueRouter from 'vue-router'
//import Detail from './components/Detail.vue'
import Users from './components/Users.vue'
import ErrorPage from './components/ErrorPage.vue'


export default new VueRouter ({
	mode: 'history',
	routes: [
		{path: '/', component: Users},
		//{path: '/detail/:id', name: 'item', component: Detail },
		{path: '*', component: ErrorPage}
	]
})
