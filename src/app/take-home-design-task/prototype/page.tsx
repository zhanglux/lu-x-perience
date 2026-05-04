import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { PrototypeExperience } from './PrototypeExperience';

export const metadata: Metadata = {
  title: 'Take-home prototype — Lu Zhang',
  description: 'Prototype demo page for the take-home design task',
};

export default function TakeHomePrototypePage() {
  return <PrototypeExperience siteBasePath={siteBasePath} />;
}
