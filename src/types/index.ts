export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  pricing: PricingPlan[];
  icon: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
}