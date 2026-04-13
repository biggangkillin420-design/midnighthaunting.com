import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { base44 } from '@/api/base44Client';

export default function Layout() {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembership() {
      try {
        const user = await base44.auth.me();
        if (user) {
          const records = await base44.entities.UserMembership.filter({ user_email: user.email, active: true });
          if (records && records.length > 0) {
            setMembership(records[0].tier);
          }
        }
      } catch (e) {
        // not logged in or no membership
      } finally {
        setLoading(false);
      }
    }
    loadMembership();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-obsidian flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-phantom/30 border-t-phantom animate-spin" />
          <p className="font-mono text-xs text-phantom/60 tracking-widest animate-pulse">ENTERING THE DARKNESS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-spectral">
      <Navbar membership={membership} />
      <Outlet context={{ membership, setMembership }} />
      <Footer />
    </div>
  );
}