import { Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import Login from './Components/Login';
import { Matches } from './Components/Matches/Matches';

	const App = () => {
	return (
		<>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/matches" element={<Matches/>} />
			<Route path="/home" element={<Main />} />
		</Routes>
		</>
	);
};

export default App;