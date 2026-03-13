import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Building2, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    institution: '',
    userType: 'buyer'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (value) => {
    setFormData({
      ...formData,
      userType: value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Determine initial status based on role
      // Buyers are active immediately, agents are pending
      const initialStatus = formData.userType === 'buyer' ? 'active' : 'pending';

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            user_type: formData.userType,
            subscription_type: 'free',
            phone: formData.phone,
            institution: formData.institution,
            status: initialStatus
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        if (initialStatus === 'pending') {
          toast({
            title: "Application Received",
            description: "Your account is pending approval. You will be notified once an administrator reviews your details.",
          });
          // Redirect to a page that handles pending state or just dashboard (which should handle it)
          navigate('/agent-dashboard'); 
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to Auprolis. You have been signed in.",
          });
          navigate('/dashboard');
        }
      } else if (data.user) {
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
        navigate('/signin');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred during registration.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAgent = formData.userType === 'sheriff' || formData.userType === 'bank';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign Up - Auprolis</title>
        <meta name="description" content="Create your Auprolis account" />
      </Helmet>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center mb-6 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-[#2563eb] hover:text-[#1d4ed8]">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <Label className="mb-3 block">I am a...</Label>
              <RadioGroup defaultValue="buyer" onValueChange={handleUserTypeChange} className="grid grid-cols-1 gap-4">
                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${formData.userType === 'buyer' ? 'border-[#2563eb] ring-1 ring-[#2563eb] bg-blue-50/50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer" className="cursor-pointer flex-1">
                    <span className="block font-medium">Buyer</span>
                    <span className="block text-xs text-gray-500">Looking to purchase properties</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${formData.userType === 'sheriff' ? 'border-[#2563eb] ring-1 ring-[#2563eb] bg-blue-50/50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="sheriff" id="sheriff" />
                  <Label htmlFor="sheriff" className="cursor-pointer flex-1">
                    <span className="block font-medium">Sheriff</span>
                    <span className="block text-xs text-gray-500">Official listing properties for auction</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${formData.userType === 'bank' ? 'border-[#2563eb] ring-1 ring-[#2563eb] bg-blue-50/50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="cursor-pointer flex-1">
                    <span className="block font-medium">Bank Agent</span>
                    <span className="block text-xs text-gray-500">Managing distressed bank assets</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isAgent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-2 border-t border-gray-100"
              >
                <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                  <p className="font-medium">Verification Required</p>
                  <p>As a {formData.userType === 'sheriff' ? 'Sheriff' : 'Bank Agent'}, your account will require administrator approval before you can list properties.</p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+267 71234567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="institution">Institution / Office Name</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="institution"
                      name="institution"
                      type="text"
                      required
                      value={formData.institution}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder={formData.userType === 'sheriff' ? "e.g. Sheriff's Office Gaborone" : "e.g. First National Bank"}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isAgent ? 'Submit for Approval' : 'Create Account'}
                  </>
                ) : (
                  isAgent ? 'Register & Request Access' : 'Create Account'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;