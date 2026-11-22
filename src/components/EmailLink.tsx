'use client';

import { useEffect, useState } from 'react';
import { AtSignIcon } from '@/components/ui/at-sign';
import { IconLink, type AnimatedIcon } from './IconLink';

const EMAIL = 'luhzhang@gmail.com';

/**
 * Email button. It opens the reader's mail app, and also copies the address
 * and says so, because a `mailto:` link does nothing visible on machines with
 * no mail app set up (common for people who use webmail).
 */
export function EmailLink({
  label = 'Email',
  variant,
}: {
  label?: string;
  variant?: 'primary' | 'secondary';
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <>
      <IconLink
        href={`mailto:${EMAIL}`}
        label={copied ? 'Address copied' : label}
        Icon={AtSignIcon as AnimatedIcon}
        variant={variant}
        // No preventDefault: the mail app still opens where there is one.
        onClick={() => {
          navigator.clipboard
            ?.writeText(EMAIL)
            .then(() => setCopied(true))
            .catch(() => {
              /* clipboard blocked: the mailto link still does its job */
            });
        }}
      />
      <span className="sr-only" role="status">
        {copied ? `Email address ${EMAIL} copied` : ''}
      </span>
    </>
  );
}
