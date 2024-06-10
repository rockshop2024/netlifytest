import type {User, ReturnJSONAuth} from "@/interfaces";

export default defineEventHandler(
	async (event): Promise<ReturnJSONAuth> => {
		//レスポンスオブジェクトの各プロパティの初期値を用意。
		let resultVal = 0;
		let tokenVal = "";
		let loginUser: User|null = null;
		
		try{
			// throw createError("擬似エラー発生。");
			//リクエストボディを取得。
			const body = await readBody(event);
			//この時点でWeb API側の処理は成功とみなす。
			resultVal = 1;
			//ログインIDとパスワードが正しければ…
			if(body.loginId == "bow" && body.password == "wow") {
				//ログイントークンを生成。
				tokenVal = "abcsefghijklmn";
				//ログインユーザ情報を格納。
				loginUser = {
					id: 1234,
					name: "山本五郎",
					loginId: body.loginId,
					password: ""
				}
			}
		}
		//エラー処理。
		catch(err) {
			console.log(err);
		}

		//レスポンスオブジェクトをリターン。
		return {
			result: resultVal,
			token: tokenVal,
			user: loginUser
		};
	}
);
