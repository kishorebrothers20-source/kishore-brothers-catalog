'use client';

import React from 'react';
import { Button, ButtonProps } from '@/components/ui/Button';
import { MessageSquare } from 'lucide-react';

export interface WhatsAppButtonProps {
  productName: string;
  productSlug?: string;
  phoneNumber?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}

export function WhatsAppButton({
  productName,
  productSlug,
  phoneNumber = '919317604151',
  variant = 'accent',
  size = 'md',
  className,
}: WhatsAppButtonProps) {
  const message = `Hello Kishore Brothers, I am inquiring about wholesale prices, bulk availability, and specifications for: ${productName}${
    productSlug ? ` (Slug: ${productSlug})` : ''
  }.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
      <Button
        variant={variant}
        size={size}
        className={`bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md shadow-[#25D366]/20 border-none ${className}`}
        leftIcon={<MessageSquare className="w-4 h-4 fill-white" />}
      >
        Enquire on WhatsApp
      </Button>
    </a>
  );
}
