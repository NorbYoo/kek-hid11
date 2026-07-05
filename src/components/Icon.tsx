import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  HandHeart,
  Heart,
  HelpingHand,
  Mail,
  MapPin,
  Phone,
  Ribbon,
  Sprout,
  Star,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  users: Users,
  book: BookOpen,
  'hand-heart': HandHeart,
  sprout: Sprout,
  brain: Brain,
  ribbon: Ribbon,
  user: User,
  heart: Heart,
  'helping-hand': HelpingHand,
  star: Star,
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin,
  calendar: Calendar,
  'arrow-right': ArrowRight,
}

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name?: string | null
  className?: string
  strokeWidth?: number
}) {
  const Cmp = (name && map[name]) || Star
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
