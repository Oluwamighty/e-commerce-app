// components/Button.tsx
import Link from 'next/link';
import { cn } from '../lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & (
    | {href:string; onClick?:never}
    | {onClick:()=>void; href?:never}
)


export default function Button({ children, variant = 'primary', href, onClick }: ButtonProps) {
  const styles = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
  }

  const className = cn(
    'px-4 py-2 rounded-lg transition-colors cursor-pointer',
    variant === 'primary' && 'bg-green-600 hover:bg-green-700 text-white',
    variant === 'secondary' && 'bg-gray-700 hover:bg-gray-600 text-white',
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick ?? undefined} className={className}>
      {children}
    </button>
  )
}