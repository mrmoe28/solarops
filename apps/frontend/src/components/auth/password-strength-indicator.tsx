import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const calculateStrength = (pass: string): { score: number; label: string; color: string } => {
    let score = 0;

    if (!pass) return { score: 0, label: '', color: '' };

    // Length check
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 10;

    // Character variety checks
    if (/[a-z]/.test(pass)) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    // Determine label and color
    if (score <= 30) return { score, label: 'Weak', color: 'text-red-600' };
    if (score <= 50) return { score, label: 'Fair', color: 'text-orange-600' };
    if (score <= 70) return { score, label: 'Good', color: 'text-yellow-600' };
    if (score <= 90) return { score, label: 'Strong', color: 'text-green-600' };
    return { score: 100, label: 'Very Strong', color: 'text-green-700' };
  };

  const { score, label, color } = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-1 mt-2">
      <Progress value={score} className="h-2" />
      <p className={`text-xs ${color}`}>Password strength: {label}</p>
    </div>
  );
}
