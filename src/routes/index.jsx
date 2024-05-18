import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import Home from '../pages/Home/Home';
import DetailContact from '../pages/DetailContact';

const RouterComponent = () => {

	return (
		<Router>
			<Routes>
				<Route
                    path='/'
                    element={ <Home /> } 
                />
				<Route 
                    path='contact/:id'
                    element={ <DetailContact /> } 
                />
			</Routes>
		</Router>
	);
};

export default RouterComponent;
