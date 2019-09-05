import VueRouter from 'vue-router'
//import Detail from './components/Detail.vue'
import PlanetPage from './components/PlanetPage.vue'
import ErrorPage from './components/ErrorPage.vue'


export default new VueRouter ({
	mode: 'history',
	routes: [
		{path: '/', component: PlanetPage},
		{path: '*', component: ErrorPage}
	]
})
