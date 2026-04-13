import { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Play, Clock, Tag } from 'lucide-react';
import { canAccessContent } from '@/lib/membership';
import { base44 } from '@/api/base44Client';

export default function ContentDetail() {
  const { id } = useParams();
  const { membership } = useOutletContext();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const items = await base44.entities.Content.filter({ id });
      if (items.length > 0) setContent(items[0]);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-bebas text-3xl text-foreground mb-2">Content Not Found</h2>
          <Link to="/vault" className="text-primary font-mono text-xs tracking-wider">← Back to The Vault</Link>
        </div>
      </div>
    );
  }

  const hasAccess = membership && canAccessContent(membership.tier, content.min_tier);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <Lock className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-bebas text-4xl text-foreground mb-2">Restricted Content</h2>
          <p className="font-inter text-muted-foreground text-sm mb-6">
            This content requires a <span className="text-primary font-mono uppercase">{content.min_tier}</span> tier membership or higher.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/membership"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase min-h-[44px]">
              Upgrade Membership
            </Link>
            <Link to="/vault" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Vault
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/vault')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-xs tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to The Vault
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {content.video_url ? (
            <div className="aspect-video rounded-xl overflow-hidden bg-secondary mb-8">
              <iframe src={content.video_url} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen title={content.title} />
            </div>
          ) : content.thumbnail ? (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-8">
              <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                <div className="p-5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40">
                  <Play className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded">
              <Tag className="w-3 h-3" />{content.category?.replace('_', ' ')}
            </span>
            {content.duration && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                <Clock className="w-3 h-3" />{content.duration}
              </span>
            )}
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{content.min_tier}+ tier</span>
          </div>

          <h1 className="font-bebas text-4xl sm:text-6xl text-foreground mb-4">{content.title}</h1>
          {content.description && (
            <p className="font-inter text-muted-foreground leading-relaxed text-lg">{content.description}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}