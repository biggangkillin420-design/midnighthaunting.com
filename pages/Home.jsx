import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Ghost, Lock, Play, Star, Eye, Skull } from 'lucide-react';

const FEATURES = [
  {
    title: 'Weekly Paranormal Investigations',
    description: 'Every week, a new haunt awaits. Investigate, experiment, and push the boundaries of the unknown alongside the community.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  },
  {
    title: 'Exclusive Vault Content',
    description: "Watch investigations you won't find anywhere else. These explorations go beyond what we share publicly — only for members.",
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
  },
  {
    title: 'Behind The Scenes',
    description: "Get uncut footage, extended investigations, and never-before-seen paranormal encounters from behind the camera.",
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  },
];

const TESTIMONIALS = [
  { name: 'Amanda V', text: 'The personal connection is my #1 favorite thing. The community is like family and the exclusive content is incredible.' },
  { name: 'Sara C', text: 'I love every bit of exclusive content. It\'s so worth it — supporting this community is the best decision I made.' },
  { name: 'Kayla R', text: 'I\'ve met some of my best friends here. The community is truly one of a kind and always something to look forward to.' },
  { name: 'Jason T', text: 'The exclusive investigations are unlike anything I\'ve seen. Every upload gives me chills in the best way.' },
  { name: 'Mike D', text: 'Worth every penny. The vault alone has more content than I can consume. Absolute goldmine of the paranormal.' },
  { name: 'Kelly M', text: 'I love being able to connect with other people who share the same interests. The challenges are insane.' },
];

const PERKS = [
  { icon: Skull, title: 'Weekly Challenges', desc: 'Take on paranormal challenges with the community. Investigate, analyze, and uncover the unknown together.' },
  { icon: Eye, title: 'Supernatural Deep Dives', desc: 'Share theories, swap stories, and debate the mysteries that keep you up at night.' },
  { icon: Ghost, title: 'Connect With Explorers', desc: 'Meet like-minded supernatural enthusiasts. Join the chat, share experiences, and make lifelong friends.' },
];

const PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80',
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80',
  'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&q=80',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80"
            alt="Haunted scene"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/60 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-14 bg-primary/60" />
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary">Step Into The Unknown</span>
              <div className="h-px w-14 bg-primary/60" />
            </div>

            <h1 className="font-bebas text-6xl sm:text-8xl lg:text-[110px] leading-none mb-6">
              <span className="text-foreground">HAUNTED</span><br />
              <span className="text-primary">MIDNIGHT</span><br />
              <span className="text-foreground/50">STORE</span>
            </h1>

            <p className="font-inter text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join our community to explore the paranormal. Exclusive investigations, supernatural content, and mysteries that go beyond the veil.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/membership"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px] animate-pulse-slow">
                Initiate Membership <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/vault"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded font-mono text-xs tracking-widest uppercase text-muted-foreground hover:border-primary hover:text-primary transition-all min-h-[48px]">
                <Play className="w-4 h-4" /> Explore The Vault
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCROLLING PREVIEW STRIP */}
      <section className="py-16 overflow-hidden border-y border-white/10">
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-2">Welcome To The Vault</p>
            <h2 className="font-bebas text-3xl sm:text-5xl text-foreground">Content We Don't Share Anywhere Else</h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          <motion.div
            className="flex gap-4 flex-shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...PREVIEW_IMAGES, ...PREVIEW_IMAGES].map((src, i) => (
              <div key={i} className="relative w-44 h-60 flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer">
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="text-center mt-8">
          <Link to="/membership"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[44px]">
            Join To Unlock
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-4">Our Mission</p>
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-foreground leading-none mb-6">
              COME HAUNT<br />THE DARKNESS<br />WITH US
            </h2>
            <p className="font-inter text-muted-foreground text-lg leading-relaxed mb-6">
              HAUNTEDMIDNIGHTSTORE is your private passage into the paranormal. We investigate what others fear to touch, document what others refuse to show, and share the raw, unfiltered truth of what lies beyond.
            </p>
            <p className="font-inter text-muted-foreground leading-relaxed mb-10">
              Our members get exclusive investigations, behind-the-scenes footage, weekly challenges, and a community of fellow paranormal enthusiasts who understand the pull of the unknown.
            </p>
            <Link to="/membership" className="inline-flex items-center gap-2 font-mono text-sm tracking-widest text-primary hover:text-foreground transition-colors group">
              JOIN THE RITUAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80" alt="Investigation" className="w-full rounded-xl" />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-3">New Videos Every Week</p>
            <h2 className="font-bebas text-5xl sm:text-6xl text-foreground">What Awaits Inside</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group block overflow-hidden rounded-xl border border-white/10 hover:border-primary/40 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                </div>
                <div className="p-6 bg-card">
                  <h3 className="font-bebas text-2xl text-foreground mb-2 tracking-wide">{f.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{f.desc || f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/membership"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px]">
              JOIN HAUNTEDMIDNIGHTSTORE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl sm:text-6xl text-foreground">The Full Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PERKS.map((perk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6">
                <perk.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bebas text-2xl text-foreground mb-2">{perk.title}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW */}
      <section className="py-24 px-4 border-t border-white/10 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-4">Membership Tiers</p>
          <h2 className="font-bebas text-5xl sm:text-6xl text-foreground leading-none mb-14">CHOOSE YOUR INITIATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'GOLD',   price: '$12/mo', color: 'text-yellow-400', border: 'border-yellow-400/40', desc: 'Full Archive + All Access' },
              { tier: 'SILVER', price: '$10/mo', color: 'text-purple-400', border: 'border-purple-400/40', desc: 'Full Content Feed' },
              { tier: 'BRONZE', price: '$4/mo',  color: 'text-amber-600',  border: 'border-amber-700/40',  desc: 'Limited Content Access' },
            ].map(t => (
              <div key={t.tier} className={`p-6 rounded-xl border ${t.border} bg-card text-center`}>
                <p className={`font-mono text-xs tracking-widest mb-2 ${t.color}`}>{t.tier}</p>
                <p className="font-bebas text-4xl text-foreground mb-2">{t.price}</p>
                <p className="font-inter text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/membership"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 border border-primary/40 text-primary rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/10 transition-all min-h-[48px]">
            VIEW ALL TIERS
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-3">Community</p>
            <h2 className="font-bebas text-5xl sm:text-6xl text-foreground">Why Members Love It</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl border border-white/10 bg-card hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-primary text-primary" />)}
                </div>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <p className="font-mono text-xs text-primary tracking-widest">~ {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="relative max-w-3xl mx-auto text-center">
          <Ghost className="w-12 h-12 text-primary mx-auto mb-8 animate-float" />
          <h2 className="font-bebas text-6xl sm:text-8xl text-foreground leading-none mb-6">
            THE DARKNESS<br />AWAITS YOU
          </h2>
          <p className="font-inter text-muted-foreground text-lg leading-relaxed mb-10">
            Join thousands of paranormal enthusiasts inside HAUNTEDMIDNIGHTSTORE. The vault is open. Are you brave enough to enter?
          </p>
          <Link to="/membership"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded font-mono text-sm tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[56px]">
            INITIATE NOW <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}