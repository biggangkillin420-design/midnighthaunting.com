import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Crown, Eye, Zap, LogOut, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import moment from 'moment';

const TIER_ICONS = { gold: Crown, silver: Eye, bronze: Zap };
const TIER_PRICES = { gold: '$12/mo', silver: '$10/mo', bronze: '$4/mo' };
const TIER_COLORS = {
  gold:   'text-yellow-400',
  silver: 'text-purple-400',
  bronze: 'text-amber-500',
};

export default function Account() {
  const { user, membership } = useOutletContext();

  const handleLogout = () => base44.auth.logout('/');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const TierIcon = membership ? (TIER_ICONS[membership.tier] || User) : User;

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-bebas text-4xl sm:text-6xl text-foreground mb-12">YOUR ACCOUNT</h1>

          {/* Profile */}
          <div className="bg-card border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bebas text-xl text-foreground">{user.full_name || 'Member'}</h3>
                <p className="font-mono text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-card border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-5">Membership</h3>
            {membership ? (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <TierIcon className={`w-5 h-5 ${TIER_COLORS[membership.tier]}`} />
                  </div>
                  <div>
                    <p className="font-bebas text-2xl text-foreground">{membership.tier?.toUpperCase()} TIER</p>
                    <p className="font-mono text-xs text-muted-foreground">{TIER_PRICES[membership.tier]}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="font-inter text-muted-foreground">Status</span>
                    <span className="font-mono text-xs text-green-400 uppercase">{membership.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-inter text-muted-foreground">Billing</span>
                    <span className="font-mono text-xs text-foreground capitalize">{membership.billing_cycle}</span>
                  </div>
                  {membership.expires_at && (
                    <div className="flex justify-between">
                      <span className="font-inter text-muted-foreground">Renews</span>
                      <span className="font-mono text-xs text-foreground">{moment(membership.expires_at).format('MMM D, YYYY')}</span>
                    </div>
                  )}
                </div>
                <Link to="/membership" className="inline-flex items-center gap-2 font-mono text-xs text-primary tracking-wider hover:underline">
                  Change Tier <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            ) : (
              <div>
                <p className="font-inter text-muted-foreground text-sm mb-5">No active membership.</p>
                <Link to="/membership"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase min-h-[44px]">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors font-mono text-xs tracking-wider"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}