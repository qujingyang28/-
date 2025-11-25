import { LucideIcon } from "lucide-react";

export interface SubStep {
  title: string;
  content: string;
  code?: string;
  warning?: string;
  tips?: string[];
}

export interface PhaseData {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  steps: SubStep[];
}

export interface ToolItem {
  name: string;
  description: string;
  link?: string;
  recommended?: boolean;
}