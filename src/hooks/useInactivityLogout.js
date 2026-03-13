import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const WARNING_TIME = 25 * 60 * 1000; // 25 minutes (5 minutes before logout)

export const useInactivityLogout = (isAuthenticated = true) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5 * 60); // 5 minutes in seconds

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error during auto-logout:', error);
      navigate('/signin');
    }
  }, [navigate]);

  const resetTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Hide warning if it's showing
    setShowWarning(false);
    setRemainingTime(5 * 60);

    if (!isAuthenticated) return;

    // Set warning timer (25 minutes)
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      
      // Start countdown timer
      let timeLeft = 5 * 60; // 5 minutes in seconds
      const countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setRemainingTime(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      // Store interval ID for cleanup
      warningTimeoutRef.countdownInterval = countdownInterval;
    }, WARNING_TIME);

    // Set logout timer (30 minutes)
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  }, [isAuthenticated, handleLogout]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  const handleStayLoggedIn = useCallback(() => {
    // Clear countdown interval if it exists
    if (warningTimeoutRef.countdownInterval) {
      clearInterval(warningTimeoutRef.countdownInterval);
    }
    resetTimer();
  }, [resetTimer]);

  const handleLogoutNow = useCallback(() => {
    if (warningTimeoutRef.countdownInterval) {
      clearInterval(warningTimeoutRef.countdownInterval);
    }
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Activity events to track
    const events = ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'];

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    // Cleanup function
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (warningTimeoutRef.countdownInterval) {
        clearInterval(warningTimeoutRef.countdownInterval);
      }
    };
  }, [isAuthenticated, handleActivity, resetTimer]);

  return {
    showWarning,
    remainingTime,
    handleStayLoggedIn,
    handleLogoutNow,
    resetTimer
  };
};