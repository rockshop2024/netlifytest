<script setup lang="ts">
import type {User} from "@/interfaces";

definePageMeta({
	//レイアウトをloggedoutに設定。
	layout: "loggedout"
});

//ログイン入力コントール用テンプレート変数。
const loginId = ref("");
//パスワード入力コントール用テンプレート変数。
const password = ref("");
//ペンディングかどうかを表すテンプレート変数。
const pending = ref(false);
//Web API側でエラーがないことを表すテンプレート変数。
const noServerError = ref(true);
//認証が失敗したことを表すテンプレート変数。
const authFailed = ref(false);
//ログインボタンクリック時の処理メソッド。
const onLoginButtonClick = async (): Promise<void> => {
	//ペンディングをtrueに変更。
	pending.value = true;
	//authFailedを初期値に変更。
	authFailed.value = false;
	//noServerErrorを初期値に変更。
	noServerError.value = true;
	//ログインデータのPOST送信。
	const asyncData = await useFetch(
		"/user-management/auth",
		{
			method: "POST",
			body: {
				loginId: loginId.value,
				password: password.value
			}
		}
	);
	//Web API側の処理が成功したならば…
	if(asyncData.error.value == null && asyncData.data.value != null && asyncData.data.value.result == 1) {
		//認証が通ったならば…
		if(asyncData.data.value.token != "" && asyncData.data.value.user != null) {
			//ログインユーザ情報をクッキーに格納。
			const loginUserCookie = useCookie<User|null>("loginUser");
			loginUserCookie.value = asyncData.data.value.user;
			//ログイントークン文字列をクッキーに格納。
			const loginTokenCookie = useCookie<string|null>("loginToken");
			loginTokenCookie.value = asyncData.data.value.token;
			//トップ画面に遷移
			await navigateTo("/");
		}
		//認証が通らなかった場合…
		else {
			pending.value = false;
			authFailed.value = true;
		}
	}
	//Web API側の処理が失敗した場合…
	else {
		pending.value = false;
		noServerError.value = false;
	}
};
</script>

<template>
	<h1>ログイン</h1>
	<p v-if="pending">ログイン中…</p>
	<template v-else>
		<p v-if="authFailed">ログインIDまたはパスワードが違います。</p>
		<p v-if="noServerError">IDとパスワードを入力してログインしてください。</p>
		<p v-else>サーバ処理中に障害が発生しました。もう一度ログインを行なってください。</p>
		<form v-on:submit.prevent="onLoginButtonClick">
			<dl>
				<dt>ID</dt>
				<dd><input type="text" v-model="loginId" required></dd>
				<dt>パスワード</dt>
				<dd><input type="password" v-model="password" required></dd>
			</dl>
			<button type="submit">ログイン</button>
		</form>
	</template>
</template>
