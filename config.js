// ============================================================
// VyrxAI — Site Configuration
// Copyright (c) 2025 FluxTV. All rights reserved.
// Unauthorised copying or distribution is prohibited.
// ============================================================
// This is the ONLY file you need to edit.
// ============================================================

const SITE_CONFIG = {
  discordLink: "https://discord.gg/YOUR_INVITE_HERE",

  plans: [
    {
      name: "Free Trial",
      price: "£0",
      priceLabel: "forever",
      description: "Get started with no commitment.",
      features: [
        "Access to Sparx Maths solver",
        "5 questions per day",
        "Basic accuracy",
        "Discord support",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Lifetime",
      price: "£PRICE_HERE", // ← Set your price here
      priceLabel: "one-time",
      description: "One payment. Yours forever.",
      features: [
        "Unlimited Sparx Maths, Reader & Science",
        "99% accuracy guarantee",
        "Custom simulated time",
        "Automated scheduling",
        "Priority Discord support",
        "All future updates included",
      ],
      cta: "Get Lifetime Access",
      highlighted: true,
    },
  ],
};
