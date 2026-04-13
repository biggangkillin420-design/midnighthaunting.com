import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'MIDNIGHT INVESTIGATIONS TEE', price: 34, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', tag: 'NEW DROP' },
  { id: 2, name: 'SPECTRAL HOODIE — OBSIDIAN', price: 68, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', tag: 'LIMITED' },
  { id: 3, name: 'EMF TRACKER PATCH SET', price: 18, image: 'https://images.unsplash.com/photo-1503342564405-2c935b0ec4b7?w=600&q=80', tag: 'MEMBERS FIRST' },
  { id: 4, name: 'PHANTOM WINDBREAKER', price: 89, image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80', tag: 'BESTSELLER' },
  { id: 5, name: 'THE VAULT TOTE BAG', price: 28, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80', tag: 'IN STOCK' },
  { id: 6, name: 'CURSED ARTIFACT CANDLE SET', price: 42, image: 'https://images.unsplash.com/photo-1602874801006-bd45db2fe1e5?w=600&q=80', tag: 'COLLAB' },
];

export default function Merch() {
  const { membership } = useOutletContext();
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await base44.entities.Product.list('-created_date', 50);
      setDbProducts(all);
      setLoading(false);
    }
    load();
  }, []);

  const products = dbProducts.length > 0 ? dbProducts : SAMPLE_PRODUCTS;

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-3">The Reliquary</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h1 className="font-bebas text-5xl sm:text-7xl text-foreground leading-none">
              ARTIFACTS<br /><span className="text-primary">&amp; MERCH</span>
            </h1>
            <p className="font-inter text-muted-foreground max-w-sm leading-relaxed">
              Exclusive merchandise. Members receive early access and member pricing on all drops.
            </p>
          </div>

          {membership && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
              <ShoppingBag className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="font-mono text-xs text-primary tracking-widest">
                {membership.tier?.toUpperCase()} MEMBER — EARLY ACCESS + MEMBER PRICING ON ALL DROPS
              </p>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group overflow-hidden rounded-xl border border-white/10 hover:border-primary/40 transition-all duration-300 bg-card">
                {product.tag && (
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/80 backdrop-blur border border-primary/40 font-mono text-xs text-primary tracking-widest rounded">
                      {product.tag}
                    </div>
                  </div>
                )}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image || product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 bg-gradient-to-t from-background/90 to-transparent">
                    <button className="w-full py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest rounded min-h-[44px] hover:bg-primary/80 transition-colors">
                      {membership ? 'SHOP NOW' : 'JOIN FOR MEMBER PRICE'}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bebas text-xl text-foreground tracking-wide mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-primary">${product.price}</span>
                    {!membership && (
                      <div className="flex items-center gap-1 text-muted-foreground/50">
                        <Lock className="w-3 h-3" />
                        <span className="font-mono text-xs">MEMBER PRICE HIDDEN</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!membership && (
          <div className="mt-16 text-center p-12 rounded-xl border border-white/10 bg-card">
            <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-bebas text-3xl text-foreground mb-4">MEMBERS GET EARLY ACCESS</h3>
            <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Members receive 48-hour early access to all drops, member pricing, and exclusive merch before it sells out.
            </p>
            <Link to="/membership"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-sm tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px]">
              JOIN FOR MEMBER PERKS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}