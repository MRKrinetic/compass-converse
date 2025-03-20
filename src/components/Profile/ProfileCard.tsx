
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileCardProps {
  username?: string;
  email?: string;
  profileImage?: string;
  isLoggedIn?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onProfile?: () => void;
  className?: string;
}

const ProfileCard = ({
  username = "Guest User",
  email = "Sign in to access your account",
  profileImage = "",
  isLoggedIn = false,
  onSignIn,
  onSignUp,
  onProfile,
  className,
}: ProfileCardProps) => {
  return (
    <Card className={`w-full shadow-md ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-compass-100">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-compass-100 text-compass-700 text-xl">
              {username ? username.charAt(0).toUpperCase() : "G"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base truncate">{username}</h3>
            <p className="text-sm text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onProfile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Manage Profile
            </Button>
          ) : (
            <>
              <Button 
                variant="default" 
                className="w-full justify-start bg-compass-500 hover:bg-compass-600"
                onClick={onSignIn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
                Sign In
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onSignUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                Create Account
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
