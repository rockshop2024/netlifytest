import type {Member, ReturnJSONMembers} from "@/interfaces";

export default defineEventHandler(
	async (event): Promise<ReturnJSONMembers> => {
		let resultVal = 0;
		const memberListArray: Member[] = [];
		
		try{
			const body = await readBody(event);
			const member = body as Member;
			let memberList = new Map<number, Member>();
			const storage = useStorage();
			const memberListStorage = await storage.getItem("member-management:members");
			if(memberListStorage != undefined) {
				memberList = new Map<number, Member>(memberListStorage);
			}
			memberList.set(member.id, member);
			await storage.setItem("member-management:members", [...memberList]);
			memberListArray[0] = member;
			resultVal = 1;
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
