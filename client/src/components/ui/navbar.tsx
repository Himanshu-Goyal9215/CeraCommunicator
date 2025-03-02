import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, Search } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <div className="border-b border-gray-800 bg-gray-900 sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden text-gray-300 hover:text-white hover:bg-gray-800">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/">
            <a className="flex items-center">
              <span className="text-xl font-bold text-white">Cera<span className="text-blue-500">Communicator</span></span>
            </a>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-gray-700 bg-gray-800 text-sm text-gray-300 pl-8 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 text-gray-100 border-gray-800">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <Link href="/profile">
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Help</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
} 