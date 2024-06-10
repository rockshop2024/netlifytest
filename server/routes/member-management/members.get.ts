import type {Member, ReturnJSONMembers} from "@/interfaces";

export default defineEventHandler(
	async (event): Promise<ReturnJSONMembers> => {
		let memberList = new Map<number, Member>();
		let resultVal = 0;

		try{
			const storage = useStorage();
			const memberListStorage = await storage.getItem("member-management:members");
			if(memberListStorage != undefined) {
				memberList = new Map<number, Member>(memberListStorage);
			}
			resultVal = 1;
		}
		catch(err) {
			console.log(err);
		}

		const memberListValues =  memberList.values();
		const memberListArray = Array.from(memberListValues);
		return {
			result: resultVal,
			data: memberListArray
		}
	}
);
