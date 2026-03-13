import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ShieldCheck, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateAdmin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin-user', {
        body: JSON.stringify({
          email: 'hendrickmathumo@gmail.com',
          password: 'Auprolis@60',
          name: 'Hendrick Mathumo',
          user_type: 'admin'
        })
      });

      if (error) {
        throw new Error(error.message || 'Failed to invoke function');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Admin Account Created",
        description: "Credentials: hendrickmathumo@gmail.com / Auprolis@60",
        action: <CheckCircle className="h-5 w-5 text-green-500" />
      });

      // Redirect to sign in after a short delay
      setTimeout(() => navigate('/signin'), 2000);

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: error.message.includes("already registered") 
          ? "This email is already registered." 
          : error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>Create the master administrator account for Auprolis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-md text-sm text-slate-700 space-y-2">
            <p className="font-semibold">Account to be created:</p>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span className="text-slate-500">Email:</span>
              <span className="font-mono">hendrickmathumo@gmail.com</span>
              <span className="text-slate-500">Pass:</span>
              <span className="font-mono">Auprolis@60</span>
              <span className="text-slate-500">Role:</span>
              <span className="font-bold text-blue-600">Admin</span>
            </div>
          </div>

          <Button 
            onClick={handleCreateAdmin} 
            disabled={loading} 
            className="w-full bg-slate-900 hover:bg-slate-800"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              "Create Admin User"
            )}
          </Button>

          <div className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Only use this during initial setup.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;