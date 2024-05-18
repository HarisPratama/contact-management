import './App.css';
import RouterComponent from './routes';
import store from './store';

import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={ store }>
			<RouterComponent />
		</Provider>
  );
}

export default App;
