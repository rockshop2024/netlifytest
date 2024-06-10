import type {Member, ReturnJSONMembers} from "@/interfaces";

export default defineEventHandler(
	async (event): Promise<ReturnJSONMembers> => {
		let resultVal = 0;
		const memberListArray: Member[] = [];
		
		try{
			const params = event.context.params;
			let memberList = new Map<number, Member>();
			const storage = useStorage();
			const memberListStorage = await storage.getItem("member-management:members");
			if(memberListStorage != undefined) {
				memberList = new Map<number, Member>(memberListStorage);
			}
			if(params != undefined) {
				const idNo = Number(params.id);
				const member = memberList.get(idNo);
				resultVal = 1;
				if(member != undefined) {
					memberListArray[0] = member;
				}
			}
		}
		catch(err) {
			console.log(err);
		}
		return {
			result: resultVal,
			data: memberListArray
		};
	}
);
