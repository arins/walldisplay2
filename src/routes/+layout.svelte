<script>
	import Header from './Header.svelte';
	
	import { App, Page, Navbar, Block } from 'konsta/svelte';
	import './styles.css';
	import '../app.css';
	const bgImage = 'test.jpg'; 
</script>


<App theme="ios" >
		<Page colors={{"bgIos": "bg-transparent"}}>
			<Header />
			<div style="z-index: 0; background: url('{bgImage}') no-repeat; background-origin: content-box; background-position: center center; background-size: 2000px; filter: blur(8px); position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px">

			</div>
			
				<div class="sm:block md:hidden">
				sm
				</div>
				<div class="hidden md:block lg:hidden">
				md
				</div>
				<div class="hidden lg:block xl:hidden">
				lg
				</div>
				<slot />
		</Page>
</App>