import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VeilOverlay({ message = 'Membership Required' }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-sm px-4">
      <div className="text-center">
        <Lock className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse-slow" />
        <h2 className="font-bebas text-4xl sm:text-6xl text-foreground mb-3">{message}</h2>
        <p className="font-mono text-xs text-muted-foreground tracking-wider mb-8 max-w-sm mx-auto">
          Initiate your membership to access The Vault and unlock exclusive paranormal content.
        </p>
        <Link to="/membership"
          className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded font-mono text-xs tracking-widest uppercase hover:bg-primary/80 transition-all min-h-[48px]">
          Initiate Membership <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}