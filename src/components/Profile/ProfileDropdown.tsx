
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SettingsDialog } from '@/components/Settings/SettingsDialog';
import ProfileCard from './ProfileCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout } = useChat();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors overflow-hidden border">
            {isAuthenticated && user ? (
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-compass-50 text-compass-700">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-5 w-5 text-slate-500" />
            )}
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-compass-50 text-compass-700">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onSelect={() => setProfileCardOpen(true)}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onSelect={() => setIsSettingsOpen(true)}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onSelect={handleLogout}
                className="cursor-pointer text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem 
                onSelect={handleLogin}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Sign in</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Create Account</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onSelect={() => setIsSettingsOpen(true)}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <SettingsDialog open={isSettingsOpen} setOpen={setIsSettingsOpen} />
      
      {/* Profile Card Dialog */}
      {profileCardOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setProfileCardOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-md w-full">
            <ProfileCard 
              username={user?.name || "Guest User"}
              email={user?.email || "Sign in to access your account"}
              isLoggedIn={isAuthenticated}
              onSignIn={handleLogin}
              onSignUp={() => {}}
              onProfile={() => {}}
              className="transform transition-all animate-in slide-in-from-bottom-10"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
