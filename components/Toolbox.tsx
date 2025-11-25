import React from 'react';
import { TOOLBOX_ITEMS } from '../constants';
import { ExternalLink, Star } from 'lucide-react';

const Toolbox: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">菜鸟工具箱</h2>
        <p className="text-lg text-slate-400">不整虚的，只推荐最好用、坑最少的工具。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLBOX_ITEMS.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-brand-500/50 transition-colors group relative overflow-hidden"
          >
            {item.recommended && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                必备
              </div>
            )}
            
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                {item.name}
              </h3>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">极简流程总结</h3>
        <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li><span className="text-brand-400 font-semibold">装环境</span> (Conda, SDK, LeRobot)</li>
            <li><span className="text-brand-400 font-semibold">写控制</span> (用鼠标 SpaceMouse 控制 JAKA 动)</li>
            <li><span className="text-brand-400 font-semibold">录像</span> (玩游戏一样录 50 次码垛，注意多样性)</li>
            <li><span className="text-brand-400 font-semibold">训练</span> (跑 LeRobot 的 train 脚本，睡觉等一晚上)</li>
            <li><span className="text-brand-400 font-semibold">测试</span> (跑 inference 脚本，手按在急停上，看它自己动)</li>
        </ol>
      </div>
    </div>
  );
};

export default Toolbox;