import { getCurrentUser } from "../../app/lib/session";
import DashWrapper from "../dashboard/Components/DashWrapper";


type DashLayoutProps = {
  children: React.ReactNode;
};


export default async function DashboardLayout({ children }: DashLayoutProps) {
  const user = await getCurrentUser()
  return <DashWrapper>{children}</DashWrapper>;
}