import { DefaultSession } from "next-auth";
import { Role } from "../utils/roleType";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    role: Role;
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
