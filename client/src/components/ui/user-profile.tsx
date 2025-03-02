import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Calendar, FileText, LogOut } from "lucide-react";

export function UserProfile() {
  return (
    <div className="flex flex-col space-y-4">
      <Card className="p-6 bg-gray-900 text-gray-100 border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-blue-500">
              <AvatarImage src="https://github.com/shadcn.png" alt="Dr. Sarah Reynolds" />
              <AvatarFallback className="bg-blue-600">SR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Dr. Sarah Reynolds</h2>
              <p className="text-gray-400">Cardiologist</p>
              <div className="flex mt-2 space-x-2">
                <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">Premium</Badge>
                <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">Verified</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Account</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Bell className="h-4 w-4 mr-3" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Calendar className="h-4 w-4 mr-3" />
              <span>Calendar</span>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <FileText className="h-4 w-4 mr-3" />
              <span>Documents</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800 p-0">
            <LogOut className="h-4 w-4 mr-3" />
            <span>Log out</span>
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gray-900 text-gray-100 border-gray-800">
        <h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Consultations</span>
              <span className="text-gray-300">42/50</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "84%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Storage</span>
              <span className="text-gray-300">1.2GB/5GB</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">AI Credits</span>
              <span className="text-gray-300">89/100</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "89%" }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 