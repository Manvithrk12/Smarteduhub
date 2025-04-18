
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { AuthGuard } from "@/components/AuthGuard"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#F1F0FB]">
          <AppSidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}
