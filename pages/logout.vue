<script setup lang="ts">
import type {User} from "@/interfaces";

//ログインユーザ情報のクッキーを削除。
const loginUserCookie = useCookie<User|null>("loginUser");
loginUserCookie.value = null;
//ログイントークン文字列のクッキーを削除。
const loginTokenCookie = useCookie<string|null>("loginToken");
loginTokenCookie.value = null;
//ログイン画面に遷移。
await navigateTo("/login");
</script>
