import { Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import Login from './Routes/Login';
import Matches from './Routes/Matches';
import Admin from './Routes/Admin';

const App = () => {

	return (
		<>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/home" element={<Main />} />
			<Route path="/matches" element={<Matches/>} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
		</>
	);
};

export default App;