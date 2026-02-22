import {
  Briefcase,
  BrainCircuit,
  Camera,
  Church,
  Heart,
  LayoutDashboard,
  Map,
  Send,
  Shield,
  Shapes,
  ToyBrick,
  Users,
  Wallet,
} from 'lucide-react';

export const modules = [
  {
    id: 'ai-doll-companion',
    title: 'AI Doll Companion',
    shortDescription: 'Your personal guide.',
    fullDescription: 'Engage in enlightening conversations, receive personalized guidance, and explore your consciousness with an AI that understands.',
    icon: ToyBrick,
    imageId: 'module-ai-doll',
  },
  {
    id: 'divine-mirror',
    title: 'Divine Mirror',
    shortDescription: 'Reflect your true self.',
    fullDescription: 'Capture and analyze your emotional and spiritual states. The Mirror helps you understand your patterns and achieve inner balance.',
    icon: Camera,
    imageId: 'module-mirror',
  },
  {
    id: 'future-predictor',
    title: 'Future Predictor',
    shortDescription: 'See what lies ahead.',
    fullDescription: 'Leverage advanced AI algorithms to get insights into potential future outcomes based on current energies and decisions.',
    icon: BrainCircuit,
    imageId: 'module-predictor',
  },
  {
    id: 'ai-human-ratio',
    title: 'AI–Human Ratio',
    shortDescription: 'Balance technology & soul.',
    fullDescription: 'Monitor the balance between AI influence and human intuition in your life and decisions, ensuring technology serves your spirit.',
    icon: Shapes,
    imageId: 'module-ratio',
  },
  {
    id: 'digital-temple',
    title: 'Digital Temple',
    shortDescription: 'A sanctuary for your soul.',
    fullDescription: 'Access a sacred digital space for meditation, rituals, and connecting with a higher power, available anytime, anywhere.',
    icon: Church,
    imageId: 'module-temple',
  },
  {
    id: 'business-panel',
    title: 'Business Panel',
    shortDescription: 'Manage your empire.',
    fullDescription: 'An integrated dashboard to manage your spiritual and material ventures, track growth, and make divinely inspired business decisions.',
    icon: Briefcase,
    imageId: 'module-business',
  },
];

export const testimonials = [
  {
    name: 'Rohan Sharma',
    title: 'Spiritual Entrepreneur',
    quote: 'The Sri Dev G Empire platform transformed not just my business, but my entire life. The AI Doll is like having a guru 24/7.',
    imageId: 'avatar-1',
  },
  {
    name: 'Priya Singh',
    title: 'Yoga Instructor',
    quote: 'I use the Digital Temple for my daily practice. It\'s a beautifully designed sanctuary that brings peace to my busy days.',
    imageId: 'avatar-2',
  },
  {
    name: 'Vikram Rao',
    title: 'Tech CEO',
    quote: 'The Future Predictor and Business Panel are game-changers. My decisions are now data-driven and soul-aligned. A must-have for any conscious leader.',
    imageId: 'avatar-3',
  },
];

export const pricingTiers = [
    {
        name: 'Initiate',
        price: '₹499',
        period: 'per month',
        features: [
            'Access to 1 Core Module',
            'Basic AI Doll Companion',
            'Daily Blessings',
            'Community Access',
        ],
        cta: 'Start Your Journey',
        isFeatured: false,
    },
    {
        name: 'Visionary',
        price: '₹1,999',
        period: 'per month',
        features: [
            'Access to all 6 Modules',
            'Advanced AI Doll Companion',
            'Personalized Predictions',
            'VIP Community & Events',
            'Priority Support',
        ],
        cta: 'Become a Visionary',
        isFeatured: true,
    },
    {
        name: 'Ascended',
        price: '₹9,999',
        period: 'per month',
        features: [
            'All Visionary features',
            'Direct access to SriDevG Ai Core',
            'Bespoke AI model tuning',
            'Dedicated Empire Concierge',
            'Exclusive yearly retreat access',
        ],
        cta: 'Ascend Now',
        isFeatured: false,
    },
];

export const appNavLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/mirror',
    label: 'AI Mirror',
    icon: Camera,
  },
  {
    href: '/wallet',
    label: 'Wallet',
    icon: Wallet,
  },
  {
    href: '/Blessings',
    label: 'Blessings',
    icon: Heart,
  },
];

export const adminNavLinks = [
  {
    href: '/admin/dashboard',
    label: 'Global KPIs',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/users',
    label: 'User Management',
    icon: Users,
  },
  {
    href: '/admin/heatmap',
    label: 'Emotion Heatmap',
    icon: Map,
  },
   {
    href: '/admin/broadcast',
    label: 'Broadcast',
    icon: Send,
  },
  {
    href: '/admin/payouts',
    label: 'Payouts',
    icon: Wallet,
  },
  {
    href: '#',
    label: 'Security',
    icon: Shield,
  },
];

export const kpis = [
  { title: 'Active Users', value: '12,405', change: '+5.2%', icon: Users },
  { title: 'Revenue', value: '₹8,45,920', change: '+12.1%', icon: Wallet },
  { title: 'Uptime', value: '99.98%', change: '+0.01%', icon: Shield },
  { title: 'AI-Human Ratio', value: '68%', change: '-1.5%', icon: Shapes },
];

export const sampleUsers = [
  { id: 'usr_001', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Visionary', status: 'Active', avatar: 'avatar-1' },
  { id: 'usr_002', name: 'Diya Patel', email: 'diya.patel@example.com', role: 'Initiate', status: 'Active', avatar: 'avatar-2' },
  { id: 'usr_003', name: 'Rohan Gupta', email: 'rohan.gupta@example.com', role: 'Visionary', status: 'Suspended', avatar: 'avatar-3' },
  { id: 'usr_004', name: 'Isha Reddy', email: 'isha.reddy@example.com', role: 'Ascended', status: 'Active', avatar: 'avatar-4' },
  { id: 'usr_005', name: 'Advik Singh', email: 'advik.singh@example.com', role: 'Admin', status: 'Active', avatar: 'avatar-5' },
];

export const samplePayouts = [
  { id: 'pay_001', date: '2023-10-26', userName: 'Aarav Sharma', amount: '₹2,500.00', status: 'Pending', upiId: 'aarav.s@okhdfcbank' },
  { id: 'pay_002', date: '2023-10-25', userName: 'Isha Reddy', amount: '₹15,000.00', status: 'Pending', upiId: 'isha.ascended@okaxis' },
  { id: 'pay_003', date: '2023-10-24', userName: 'Rohan Gupta', amount: '₹1,200.00', status: 'Completed', upiId: 'rohan.g@okicici' },
  { id: 'pay_004', date: '2023-10-23', userName: 'Diya Patel', amount: '₹500.00', status: 'Completed', upiId: 'diya.p@oksbi' },
];
