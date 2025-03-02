import { UserProfile } from "@/components/ui/user-profile";
import { Navbar } from "@/components/ui/navbar";
import { Sidebar } from "@/components/ui/sidebar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>
            <UserProfile />
          </div>
        </main>
      </div>
    </div>
  );
} 