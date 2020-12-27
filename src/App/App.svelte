<script>
	import Hello from '../Components/Hello/Hello.svelte';

	function buttonClick() {
		alert('Hello!');
	}
</script>

<h1 class="bg-primary text-light text-center">Svelte & Bootstrap 5</h1>
<Hello name={'Ale'}></Hello>
<div class="text-center"><button type="button" class="btn btn-warning" on:click="{buttonClick}">Button</button></div>