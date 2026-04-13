import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, Shield, Loader2 } from 'lucide-react';
import MembershipCard from '../components/MembershipCard';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import moment from 'moment';

export default function Membership() {
  const { user, membership, setMembership } = useOutletContext();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (tier) => {
    if (membership?.tier === tier) return;
    setSelected(tier);
  };

  const handleSubscribe = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const expiresAt = moment().add(1, selected === 'bronze' ? 'year' : 'month').toISOString();
      const data = {
        user_email: user?.email,
        tier: selected,
        status: 'active',
        billing_cycle: selected === 'bronze' ? 'yearly' : 'monthly',
        expires_at: expiresAt,
      };

      let updated;
      if (membership) {
        updated = await base44.entities.Membership.update(membership.id, data);
      } else {
        updated = await base44.entities.Membership.create(data);
      }
      setMembership(updated);
      toast.success(`Welcome to the ${selected} tier!`);
      navigate('/vault');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 sm:py-28 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Ghost className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse-slow" />
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-14 bg-primary/60" />
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary">The Initiation</span>
            <div className="h-px w-14 bg-primary/60" />
          </div>
          <h1 className="font-bebas text-5xl sm:text-7xl text-foreground leading-none mb-4">
            Choose Your<br /><span className="text-primary">Membership</span>
          </h1>
          <p className="font-inter text-muted-foreground max-w-lg mx-auto">
            Select a tier to unlock exclusive paranormal content, investigations, and community access.
          </p>
          {membership && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded font-mono text-xs text-primary tracking-widest">
              <Shield className="w-4 h-4" /> CURRENT TIER: {membership.tier?.toUpperCase()}
            </div>
          )}
        </motion.div>
      </section>

      {/* Cards */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {['bronze', 'silver', 'gold'].map((tier, i) => (
            <MembershipCard
              key={tier}
              tier={tier}
              isActive={membership?.tier === tier || selected === tier}
              onSelect={handleSelect}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Sticky subscribe button */}
      {selected && selected !== membership?.tier && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 left-0 right-0 py-5 px-4 bg-background/90 backdrop-blur-xl border-t border-white/10 z-30"
        >
          <div className="max-w-sm mx-auto">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>Subscribe to {selected} — ${selected === 'gold' ? '12' : selected === 'silver' ? '10' : '4'}/{selected === 'bronze' ? 'mo or yr' : 'mo'}</>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Tier comparison table */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bebas text-4xl text-foreground text-center mb-10">Tier Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 font-mono text-xs tracking-widest uppercase text-muted-foreground">Feature</th>
                  <th className="text-center py-3 px-4 font-mono text-xs tracking-widest uppercase text-amber-600">Bronze</th>
                  <th className="text-center py-3 px-4 font-mono text-xs tracking-widest uppercase text-purple-400">Silver</th>
                  <th className="text-center py-3 px-4 font-mono text-xs tracking-widest uppercase text-yellow-400">Gold</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Limited Content Access', true, true, true],
                  ['Community Access', true, true, true],
                  ['Full Content Feed', false, true, true],
                  ['Exclusive Investigations', false, true, true],
                  ['Behind The Scenes', false, true, true],
                  ['Weekly Challenges', false, true, true],
                  ['Live Monthly Events', false, false, true],
                  ['Early Merch Access', false, false, true],
                  ['Inner Circle Community', false, false, true],
                ].map(([feature, bronze, silver, gold], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-inter text-sm text-muted-foreground">{feature}</td>
                    <td className="text-center py-3 px-4 font-mono text-sm">{bronze ? <span className="text-amber-500">✓</span> : <span className="text-muted-foreground/30">—</span>}</td>
                    <td className="text-center py-3 px-4 font-mono text-sm">{silver ? <span className="text-purple-400">✓</span> : <span className="text-muted-foreground/30">—</span>}</td>
                    <td className="text-center py-3 px-4 font-mono text-sm">{gold ? <span className="text-yellow-400">✓</span> : <span className="text-muted-foreground/30">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[['100%', 'Exclusive Content'], ['New', 'Videos Every Week'], ['24/7', 'Vault Access']].map(([stat, label]) => (
            <div key={label}>
              <p className="font-bebas text-5xl text-primary mb-1">{stat}</p>
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center font-mono text-xs text-muted-foreground/40 pb-12 tracking-wider px-4">
        Cancel anytime. By joining you agree to our Terms. Payments are secure and encrypted.
      </p>
    </div>
  );
}