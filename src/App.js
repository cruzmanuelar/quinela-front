import { Routes, Route } from 'react-router-dom';
import Main from './Routes/Main';
import Login from './Components/Login';

	const App = () => {
	return (
		<>
		<Routes>
			<Route path="/" element={<Login />} />

			<Route path="/home" element={<Main />} />
		</Routes>
		</>
	);
};

export default App;