import { mainScreenMachine } from '../../../stateMachines/screenMachine';
import { useMachine, useSelector } from '@xstate/react';
import { ScreenLayout } from '../SreenLayout/ScreenLayout';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LayoutForm } from '../LayoutForm/LayoutForm';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [state, send, service] = useMachine(mainScreenMachine, {
		actions: {
			changePage: (e) => {
				navigate(e.path);
			},
		},
	});
	console.log(state);
	//sync URL PATH in browser with state machine (when use arrow for navigation)
	useEffect(() => {
		if (location.pathname == '/' && !state.matches('main')) navigate('/create');
	}, [location]);
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<ScreenLayout
							savedData={state.context.formsData.main}
							service={state.context.formMachines}></ScreenLayout>
					}></Route>
				<Route path="/create" element={<LayoutForm service={service}></LayoutForm>}></Route>
			</Routes>
		</>
	);
};
