import { Header } from "../dashboard/Header";
import { Sidebar } from "../dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout = ({ children, onLogout }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="flex min-h-screen pt-[64px]">
        <div className="fixed left-0 top-[64px] bottom-0 h-[calc(100vh-64px)] bg-white border-r border-slate-200">
          <Sidebar onLogout={onLogout} />
        </div>

        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}; 