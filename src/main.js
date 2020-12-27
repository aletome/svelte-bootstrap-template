import 'bootstrap/scss/bootstrap.scss';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import App from './App/App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

window.app = app;

export default app;