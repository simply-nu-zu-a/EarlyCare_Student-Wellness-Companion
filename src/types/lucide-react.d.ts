declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ComponentType<LucideProps>;

  export const Activity: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const BarChart2: LucideIcon;
  export const BarChart3: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Brain: LucideIcon;
  export const BrainCircuit: LucideIcon;
  export const Building: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ClipboardCheck: LucideIcon;
  export const Clock: LucideIcon;
  export const Code2: LucideIcon;
  export const Coffee: LucideIcon;
  export const Compass: LucideIcon;
  export const Copy: LucideIcon;
  export const Download: LucideIcon;
  export const Droplets: LucideIcon;
  export const Dumbbell: LucideIcon;
  export const FileText: LucideIcon;
  export const Flame: LucideIcon;
  export const Heart: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const HeartPulse: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Info: LucideIcon;
  export const Lock: LucideIcon;
  export const Menu: LucideIcon;
  export const Monitor: LucideIcon;
  export const Moon: LucideIcon;
  export const Network: LucideIcon;
  export const Phone: LucideIcon;
  export const PhoneCall: LucideIcon;
  export const PlayCircle: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Share2: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Smile: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Stethoscope: LucideIcon;
  export const Sun: LucideIcon;
  export const Terminal: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const X: LucideIcon;

  export const icons: Record<string, LucideIcon>;
  const defaultExport: Record<string, LucideIcon>;
  export default defaultExport;
}
