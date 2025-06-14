
import { useState } from 'react';
import { Check, Crown, Zap, Users, BookOpen, Star } from 'lucide-react';

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for beginners',
      features: [
        '50 words per pack',
        'Basic flashcards',
        'Daily challenge',
        'Community leaderboard'
      ],
      limitations: [
        'Limited word packs',
        'No multiplayer',
        'Ads included'
      ],
      color: 'gray',
      popular: false
    },
    {
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Most popular choice',
      features: [
        'Unlimited word packs',
        'Multiplayer battles',
        'Advanced analytics',
        'No ads',
        'Priority support',
        'Offline mode'
      ],
      limitations: [],
      color: 'purple',
      popular: true
    },
    {
      name: 'Pro',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'For serious learners',
      features: [
        'Everything in Premium',
        'AI-powered recommendations',
        'Custom word lists',
        'Advanced progress tracking',
        'Export study materials',
        'White-label sharing'
      ],
      limitations: [],
      color: 'orange',
      popular: false
    }
  ];

  const getColorClasses = (color: string, type: 'gradient' | 'text' | 'border' | 'bg') => {
    const colorMap = {
      gray: {
        gradient: 'gradient-purple',
        text: 'text-gray-600',
        border: 'border-gray-200',
        bg: 'bg-gray-50'
      },
      purple: {
        gradient: 'gradient-purple',
        text: 'text-game-purple',
        border: 'border-purple-200',
        bg: 'bg-purple-50'
      },
      orange: {
        gradient: 'gradient-orange',
        text: 'text-orange-600',
        border: 'border-orange-200',
        bg: 'bg-orange-50'
      }
    };
    return colorMap[color as keyof typeof colorMap][type];
  };

  return (
    <section className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Unlock Your Full Potential
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Choose the perfect plan to accelerate your vocabulary mastery
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-sm text-game-purple font-medium'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white shadow-sm text-game-purple font-medium'
                  : 'text-gray-600'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${
                plan.popular ? 'border-purple-300 shadow-lg scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">
                    ${plan.price[billingCycle]}
                  </span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="text-gray-600 ml-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                
                <button
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                    plan.name === 'Free'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : `${getColorClasses(plan.color, 'gradient')} text-white hover:opacity-90`
                  }`}
                >
                  {plan.name === 'Free' ? 'Current Plan' : `Choose ${plan.name}`}
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Features included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Compare All Features
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Feature</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Free</th>
                  <th className="text-center py-3 px-4 font-medium text-purple-600">Premium</th>
                  <th className="text-center py-3 px-4 font-medium text-orange-600">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Word Packs', free: '5 packs', premium: 'Unlimited', pro: 'Unlimited' },
                  { feature: 'Multiplayer', free: '✗', premium: '✓', pro: '✓' },
                  { feature: 'Offline Mode', free: '✗', premium: '✓', pro: '✓' },
                  { feature: 'AI Recommendations', free: '✗', premium: '✗', pro: '✓' },
                  { feature: 'Custom Lists', free: '✗', premium: '✗', pro: '✓' },
                  { feature: 'Analytics', free: 'Basic', premium: 'Advanced', pro: 'Expert' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{row.free}</td>
                    <td className="py-3 px-4 text-center text-purple-600">{row.premium}</td>
                    <td className="py-3 px-4 text-center text-orange-600">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
