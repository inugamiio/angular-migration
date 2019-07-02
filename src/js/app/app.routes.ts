import {RouterModule}	from	'@angular/router'
import {HomeView}	    from	'./view/home.view'

const routes = [
    { path: '', component: HomeView , pathMatch:'full'}
];

export const routing = RouterModule.forRoot(routes);