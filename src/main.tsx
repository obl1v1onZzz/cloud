import ReactDOM from 'react-dom/client';
import { App } from '../frontend/components/App/App';
import styles from './main.module.css';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
if (!root) throw new Error('Root not found');
ReactDOM.createRoot(root).render(
	<BrowserRouter>
		<div className={styles.wrapper}>
			<App></App>
		</div>
	</BrowserRouter>
);
