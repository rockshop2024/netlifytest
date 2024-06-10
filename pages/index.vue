<script setup lang="ts">
// import type {User} from "@/interfaces";

// console.log("index.vue started");
definePageMeta({
	middleware: ["loggedin-check"]
	// middleware: ["logging", "loggedin-check"]
	// middleware: ["loggedin-check", "logging"]
	// middleware: (to, from) => {
	// 	const loginTokenCookie = useCookie<string|null>("loginToken");
	// 	const loginUserCookie = useCookie<User|null>("loginUser");
	// 	if(loginTokenCookie.value  == null || loginUserCookie.value == null) {
	// 		return navigateTo("/login");
	// 		// return abortNavigation();
	// 		// return abortNavigation(new Error());
	// 	}
	// 	else {
	// 		return;
	// 	}
	// }
});
// const loginTokenCookie = useCookie<string|null>("loginToken");
// const loginUserCookie = useCookie<User|null>("loginUser");
// if(loginTokenCookie.value  == null || loginUserCookie.value == null) {
// 	await navigateTo("/login");
// }
</script>

<template>
	<h1>TOP</h1>
	<nav id="breadcrumbs">
		<ul>
			<li>TOP</li>
		</ul>
	</nav>
	<section>
		<p>
			<NuxtLink v-bind:to="{name: 'member-memberList'}">
				会員管理はこちら
			</NuxtLink>
		</p>
	</section>
</template>
