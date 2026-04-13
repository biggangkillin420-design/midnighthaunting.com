import { Link, useOutletContext } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Lock } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'MIDNIGHT INVESTIGATIONS TEE', price: '$34', memberPrice: '$29', img: '/__generating__/img_c730d36b3b91.png', tag: 'LIMITED' },
  { id: 2, name: 'SPECTRAL HOODIE — OBSIDIAN', price: '$68', memberPrice: '$58', img: '/__generating__/img_2f5502b3e6d1.png', tag: 'NEW DROP' },
  { id: 3, name: 'EMF TRACKER PATCH SET', price: '$18', memberPrice: '$14', img: '/__generating__/img_7efac07fe35c.png', tag: 'MEMBERS EARLY' },
  { id: 4, name: 'PHANTOM VIOLET WINDBREAKER', price: '$89', memberPrice: '$74', img: '/__generating__/img_35005d362807.png', tag: 'SOLD OUT SOON' },
  { id: 5, name: 'THE VAULT TOTE BAG', price: '$28', memberPrice: '$22', img: '/__generating__/img_b5f53be0c4e0.png', tag: 'BESTSELLER' },
  { id: 6, name: 'CURSED ARTIFACT CANDLE SET', price: '$42', memberPrice: '$35', img: '/__generating__/img_ff84587aa377.png', tag: 'COLLAB' },
];

export default function Store() {
  const { membership } = useOutletContext() || {};
  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-phantom uppercase mb-4 block">Haunted Artifacts</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-bebas text-6xl md:text-8xl text-spectral leading-none">
              THE<br /><span className="text-phantom">RELIQUARY</span>
            </h1>
            <p className="font-inter text-mist text-lg max-w-md leading-relaxed">
              Authenticated paranormal artifacts and exclusive merchandise. Members receive early access and member pricing.
            </p>
          </div>
        </div>

        {membership && (
          <div className="mb-10 flex items-center gap-3 p-4 rounded-lg border border-phantom/20 bg-phantom/5">
            <ShoppingBag className="w-5 h-5 text-phantom flex-shrink-0" />
            <p className="font-mono text-xs text-phantom tracking-widest">
              {membership.toUpperCase()} MEMBER — YOU HAVE EARLY ACCESS + MEMBER PRICING ON ALL DROPS
            </p>
          </div>
        )}

        {/* Product grid — horizontal scroll feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id} className="group relative overflow-hidden rounded-xl border border-phantom/20 hover:border-phantom/60 transition-all duration-500 cursor-pointer bg-obsidian-deep/40">
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-obsidian/80 backdrop-blur border border-phantom/40 font-mono text-xs text-phantom tracking-widest rounded">
                {product.tag}
              </div>

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 group-hover:brightness-75"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent">
                  <button className="w-full py-3 bg-phantom text-obsidian font-mono text-xs tracking-widest rounded min-h-[48px] hover:bg-phantom/80 transition-colors">
                    {membership ? 'SHOP NOW' : 'JOIN TO ACCESS MEMBER PRICE'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bebas text-xl text-spectral tracking-wide mb-2">{product.name}</h3>
                <div className="flex items-center gap-3">
                  {membership ? (
                    <>
                      <span className="font-mono text-sm text-phantom">{product.memberPrice}</span>
                      <span className="font-mono text-xs text-mist/40 line-through">{product.price}</span>
                      <span className="font-mono text-xs text-phantom/60 tracking-wider">MEMBER PRICE</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-sm text-spectral">{product.price}</span>
                      <div className="flex items-center gap-1 text-mist/40">
                        <Lock className="w-3 h-3" />
                        <span className="font-mono text-xs">MEMBER PRICE HIDDEN</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!membership && (
          <div className="mt-16 text-center p-12 rounded-xl border border-phantom/20 bg-obsidian-deep/40">
            <Lock className="w-10 h-10 text-phantom mx-auto mb-4" />
            <h3 className="font-bebas text-3xl text-spectral mb-4">MEMBERS GET EARLY ACCESS</h3>
            <p className="font-inter text-mist text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Members receive 48-hour early access to all drops, member pricing, and exclusive merch before it sells out.
            </p>
            <Link to="/membership" className="inline-flex items-center gap-3 px-8 py-4 bg-phantom text-obsidian font-mono text-sm tracking-widest rounded hover:bg-phantom/80 transition-all min-h-[48px]">
              JOIN FOR MEMBER PERKS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}