import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Ghost, Filter } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { base44 } from '@/api/base44Client';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'investigation', label: 'Investigations' },
  { value: 'behind_the_scenes', label: 'Behind The Scenes' },
  { value: 'challenge', label: 'Challenges' },
  { value: 'reaction', label: 'Reactions' },
  { value: 'livestream', label: 'Livestreams' },
  { value: 'personal', label: 'Personal' },
];

const LOCKED_PREVIEW = [
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80',
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80',
  'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&q=80',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
];

export default function Vault() {
  const { membership } = useOutletContext();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function load() {
      const all = await base44.entities.Content.list('-created_date', 100);
      setContents(all);
      setLoading(false);
    }
    load();
  }, []);

  // Gate: no membership → locked page
  if (!membership) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="relative mb-10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-1">
              {LOCKED_PREVIEW.map((src, i) => (
                <img key={i} src={src} alt="" className="aspect-[3/4] w-full object-cover blur-sm brightness-50" />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col items-end justify-end p-8">
              <Lock className="w-14 h-14 text-primary mx-auto mb-4" />
              <Ghost className="w-8 h-8 text-muted-foreground/40 mx-auto" />
            </div>
          </div>
          <p className="font-mono text-xs tracking-widest text-primary uppercase mb-3">Access Restricted</p>
          <h1 className="font-bebas text-5xl sm:text-6xl text-foreground leading-none mb-5">
            THE VAULT IS<br /><span className="text-destructive">SEALED</span>
          </h1>
          <p className="font-inter text-muted-foreground text-lg leading-relaxed mb-10">
            All content inside HAUNTEDMIDNIGHTSTORE is exclusive to members. Join a tier to unlock the archive.
          </p>
          <Link to="/membership"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-sm tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px]">
            INITIATE MEMBERSHIP <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const filtered = category === 'all'
    ? contents
    : contents.filter(c => c.category === category);

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-2">Exclusive Archive</p>
              <h1 className="font-bebas text-5xl sm:text-7xl text-foreground leading-none">THE VAULT</h1>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded border font-mono text-xs tracking-widest ${
              membership.tier === 'gold'   ? 'border-yellow-400/40 text-yellow-300 bg-yellow-400/10' :
              membership.tier === 'silver' ? 'border-purple-400/40 text-purple-300 bg-purple-400/10' :
                                             'border-amber-700/40 text-amber-500 bg-amber-900/10'
            }`}>
              <Ghost className="w-4 h-4" />
              {membership.tier?.toUpperCase()} MEMBER
            </div>
          </div>

          {membership.tier === 'bronze' && (
            <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5 mb-8">
              <Lock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-mono text-xs text-primary tracking-widest mb-1">BRONZE TIER — LIMITED ACCESS</p>
                <p className="font-inter text-sm text-muted-foreground">
                  Some content is restricted to Silver and Gold members.{' '}
                  <Link to="/membership" className="text-primary hover:underline">Upgrade your membership</Link> to unlock the full archive.
                </p>
              </div>
            </div>
          )}

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {CATEGORIES.map(cat => (
              <button key={cat.value} onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap rounded transition-colors min-h-[36px] ${
                  category === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-inter text-muted-foreground">No content in this category yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((content, i) => (
              <ContentCard key={content.id} content={content} userTier={membership.tier} index={i} />
            ))}
          </div>
        )}

        {/* Upgrade CTA for bronze */}
        {membership.tier === 'bronze' && (
          <div className="mt-16 text-center p-12 rounded-xl border border-white/10 bg-card">
            <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bebas text-3xl text-foreground mb-4">UNLOCK THE FULL ARCHIVE</h3>
            <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Upgrade to Silver or Gold to access exclusive investigations, behind-the-scenes content, live event replays, and the complete paranormal archive.
            </p>
            <Link to="/membership"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-sm tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px]">
              UPGRADE NOW <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}