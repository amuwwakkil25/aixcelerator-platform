import React from 'react';
import { motion } from 'framer-motion';
import { Presentation as PresentationChart, FileText, TrendingUp } from 'lucide-react';

const InvestorPack = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <PresentationChart className="h-10 w-10 text-teal-400" />
            <span>Investor Pack</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Generate pitch decks and investor materials
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Coming Soon</h2>
          <p className="text-gray-400">
            The Investor Pack module is currently under development. This will enable automated pitch deck and investor material generation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorPack;