
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { User, KeyRound, Link2, Trash2 } from 'lucide-react';

export const AccountSettings = () => {
  const [deleteAccountOpen, setDeleteAccountOpen] = React.useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Update your account information and how others see you on the platform.
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-compass-100 text-compass-700 text-xl">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <Button size="sm" variant="outline" className="mb-2">
              Change Avatar
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. 1MB max.
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" defaultValue="john.doe@example.com" className="col-span-3" />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Password &amp; Security
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Update your password to enhance account security.
        </p>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-password" className="text-right">
              Current Password
            </Label>
            <Input id="current-password" type="password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right">
              New Password
            </Label>
            <Input id="new-password" type="password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-right">
              Confirm Password
            </Label>
            <Input id="confirm-password" type="password" className="col-span-3" />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Connected Accounts
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage accounts you have connected for easier sign in.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border p-4 rounded-md">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="font-medium">Google</div>
                <div className="text-sm text-muted-foreground">Sign in with Google</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="flex items-center justify-between border p-4 rounded-md">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.35 0-.837-.05-1.687-.42-1.24-.54-1.843-.54-2.08-.54-.238 0-.843.02-1.657.4-.187.09-.394.18-.614.27C4.193 6.43 2 9.43 2 12.34c0 1.77.553 3.58 1.431 4.82.877 1.25 2.526 2.84 4.439 2.84.877 0 1.21-.08 1.985-.28 1.154-.3 1.374-.3 1.985-.3s.877.04 2.033.32c.561.14.86.24 1.356.24 2.526 0 4.439-3.13 4.439-3.13s-2.526-1.07-2.526-4.02c0-2.232 1.822-3.283 1.822-3.283s-1.036-2.64-3.39-2.64c-.386 0-1.456.13-2.635.54-.719.23-1.198.36-1.47.36-.254 0-.719-.13-1.431-.38-.93-.34-1.685-.52-2.033-.52-.631 0-1.307.16-1.918.46l.001-.02c.631-1.04 1.333-1.94 2.093-2.64C9.34 3.68 10.555 3 11.948 3c.315 0 1.177.08 2.081.4.904.34 1.536.53 2.337.53z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <div className="font-medium">Apple</div>
                <div className="text-sm text-muted-foreground">Sign in with Apple</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2 text-destructive">
          <Trash2 className="h-5 w-5" />
          Delete Account
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all your data. This action cannot be undone.
        </p>
        
        <AlertDialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete your account and remove all your data from our servers. 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
