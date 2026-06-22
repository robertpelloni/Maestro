import React from 'react';
import { MaestroDashboard } from './maestro/MaestroDashboard';

// Example shell of an App component that would mount the MaestroDashboard
export const App: React.FC = () => {
	return (
		<div>
			<h1>Maestro Control Center</h1>
			<MaestroDashboard />
		</div>
	);
};
