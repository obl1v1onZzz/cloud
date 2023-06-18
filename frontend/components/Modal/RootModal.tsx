import React from 'react';
import ReactDOM from 'react-dom';

interface IRootModal {
	children: React.ReactNode;
}
export const RootModal: React.FC<IRootModal> = ({ children }) => {
	const modal = document.getElementById('modal-root');
	if (!modal) return;
	return ReactDOM.createPortal(children, modal);
};
