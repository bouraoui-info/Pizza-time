import { authOptions } from "../api/route";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session?.user
    
}