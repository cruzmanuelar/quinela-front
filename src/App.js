import { Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import Login from './Components/Login';
import Matches from './Components/Matches/Matches';
import Admin from './Components/Admin/Admin';


const App = () => {
	return (
		<>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/matches" element={<Matches/>} />
			<Route path="/home" element={<Main />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
		</>
	);
};

export default App;