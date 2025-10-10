import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const getSessionUser = async () => {

    try{

         const session = await getServerSession(authOptions);
    // return session?.user;

    if(!session || !session.user) return null;
    return {
        user: session.user,
        userId: (session.user as { id?: string }).id ?? null,
    }
    }catch(error){
        console.log(error);
        
    }

    }
   


