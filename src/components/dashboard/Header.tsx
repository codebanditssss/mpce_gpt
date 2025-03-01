// import React from "react";
// import {
//   Bell,
//   Settings,
//   Menu,
//   Brain,
//   Sparkles,
//   Zap,
//   BarChart4,
// } from "lucide-react";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Badge } from "../ui/badge";

// interface HeaderProps {
//   userName?: string;
//   userAvatar?: string;
//   onSettingsClick?: () => void;
//   onProfileClick?: () => void;
//   onNotificationsClick?: () => void;
//   onMenuToggle?: () => void;
// }

// const Header = ({
//   userName = "John Doe",
//   userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//   onSettingsClick = () => {},
//   onProfileClick = () => {},
//   onNotificationsClick = () => {},
//   onMenuToggle = () => {},
// }: HeaderProps) => {
//   return (
//     <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8">
//       <div className="flex items-center gap-4">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden"
//           onClick={onMenuToggle}
//         >
//           <Menu className="h-5 w-5" />
//         </Button>

//         <div className="flex items-center gap-2">
//           <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center">
//             <Brain className="h-6 w-6 text-primary-foreground" />
//           </div>
//           <div className="flex flex-col">
//             <h1 className="text-xl font-bold hidden md:block">MPCE-GPT</h1>
//             <Badge variant="outline" className="hidden md:flex">
//               AI-Powered Finance
//             </Badge>
//           </div>
//         </div>
//       </div>

//       <div className="hidden md:flex items-center gap-4">
//         {/* Header buttons removed as requested */}
//       </div>

//       <div className="flex items-center gap-2">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onNotificationsClick}
//           className="relative"
//         >
//           <Bell className="h-5 w-5" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
//         </Button>

//         <Button variant="ghost" size="icon" onClick={onSettingsClick}>
//           <Settings className="h-5 w-5" />
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
//               <Avatar>
//                 <AvatarImage src={userAvatar} alt={userName} />
//                 <AvatarFallback>
//                   {userName
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={onProfileClick}>
//               Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={onSettingsClick}>
//               Settings
//             </DropdownMenuItem>
//             <DropdownMenuItem>Subscription Plan</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Log out</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { User } from '@supabase/supabase-js';
import {
  Bell,
  Settings,
  Menu,
  Brain,
  Sparkles,
  Zap,
  BarChart4,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface HeaderProps {
  user: User;
  signOut: () => Promise<void>;
  userName?: string;
  userAvatar?: string;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  onMenuToggle?: () => void;
}

const Header = ({
  user,
  signOut,
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  onSettingsClick = () => {},
  onProfileClick = () => {},
  onNotificationsClick = () => {},
  onMenuToggle = () => {},
}: HeaderProps) => {
  // Get username from email if available
  const displayName = user?.email 
    ? user.email.split('@')[0]
    : userName;
  
  // Generate initials for avatar fallback
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold hidden md:block">MPCE-GPT</h1>
            <Badge variant="outline" className="hidden md:flex">
              AI-Powered Finance
            </Badge>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {/* Header buttons removed as requested */}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
              <Avatar>
                <AvatarImage src={userAvatar} alt={displayName} />
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="text-sm">
              {user?.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>Subscription Plan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;