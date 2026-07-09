import type { FragmentResult } from '@/lib/fetchFragment';
import styles from './FragmentSlot.module.css';

interface FragmentSlotProps {
  label: string;
  result: FragmentResult;
}

export function FragmentSlot({ label, result }: FragmentSlotProps) {
  if (!result.ok) {
    return (
      <div className={styles.error} role="alert">
        <strong>{label}</strong>
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div
      className={styles.slot}
      data-fragment={label}
      dangerouslySetInnerHTML={{ __html: result.html }}
    />
  );
}
