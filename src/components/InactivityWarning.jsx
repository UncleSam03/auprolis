import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const InactivityWarning = ({ show, remainingTime, onStayLoggedIn, onLogoutNow }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onStayLoggedIn}
          />

          {/* Warning Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="pointer-events-auto"
            >
              <Card className="w-full max-w-md shadow-2xl border-amber-200 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <AlertTriangle className="h-16 w-16 text-amber-500" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-500/20"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Session Expiring Soon
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Your session will expire due to inactivity
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Countdown Display */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600 mb-2">Time Remaining</p>
                      <motion.div
                        key={remainingTime}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-bold text-amber-600 tabular-nums"
                      >
                        {minutes}:{seconds.toString().padStart(2, '0')}
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-2">minutes</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={onStayLoggedIn}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                      size="lg"
                    >
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Stay Logged In
                    </Button>
                    
                    <Button 
                      onClick={onLogoutNow}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 text-base font-semibold"
                      size="lg"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout Now
                    </Button>
                  </div>

                  <p className="text-xs text-center text-gray-500 pt-2">
                    Click anywhere outside to stay logged in
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InactivityWarning;