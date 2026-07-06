import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet as TabletIcon, Laptop, Wifi, Battery, Signal, ArrowLeft, RotateCcw } from 'lucide-react';

interface DeviceSimulatorFrameProps {
  children: React.ReactNode;
  activeDevice: 'desktop' | 'android' | 'tablet' | 'iphone';
  onDeviceChange: (device: 'desktop' | 'android' | 'tablet' | 'iphone') => void;
}

export default function DeviceSimulatorFrame({ children, activeDevice, onDeviceChange }: DeviceSimulatorFrameProps) {
  const [time, setTime] = useState('12:00');
  const isDesktopSelected = activeDevice === 'desktop';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  if (activeDevice === 'desktop') {
    return <>{children}</>;
  }

  // Define frames sizing
  let frameClasses = '';
  let screenClasses = '';
  let deviceName = '';

  if (activeDevice === 'iphone') {
    deviceName = 'Apple iPhone 15 Pro';
    frameClasses = 'w-[375px] h-[812px] border-[12px] border-slate-900 rounded-[48px] shadow-2xl relative bg-slate-950 flex flex-col overflow-hidden ring-4 ring-slate-800';
    screenClasses = 'flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden relative flex flex-col rounded-[36px]';
  } else if (activeDevice === 'android') {
    deviceName = 'Samsung Galaxy S24 Ultra';
    frameClasses = 'w-[390px] h-[844px] border-[10px] border-slate-900 rounded-[32px] shadow-2xl relative bg-slate-950 flex flex-col overflow-hidden ring-4 ring-slate-800';
    screenClasses = 'flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden relative flex flex-col rounded-[22px]';
  } else if (activeDevice === 'tablet') {
    deviceName = 'Apple iPad Pro 11"';
    frameClasses = 'w-[768px] h-[1024px] border-[14px] border-slate-900 rounded-[28px] shadow-2xl relative bg-slate-950 flex flex-col overflow-hidden ring-4 ring-slate-800';
    screenClasses = 'flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden relative flex flex-col rounded-[14px]';
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 flex flex-col items-center justify-center relative">
      {/* Background cyber design */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      
      {/* Device Switcher HUD Header */}
      <div className="mb-8 z-10 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
          <Smartphone className="h-3.5 w-3.5" />
          <span>Simulador de Ambiente Multidispositivo</span>
        </div>
        
        <h2 className="font-display text-2xl font-black text-white">
          Visualizando Versão: <span className="text-blue-500">{deviceName}</span>
        </h2>
        
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Navegue pela aplicação simulando o comportamento responsivo e as interações nativas de celulares, tablets e desktops de última geração.
        </p>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isDesktopSelected
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <Laptop className="h-4 w-4" />
            <span>Site (Desktop)</span>
          </button>
          
          <button
            onClick={() => onDeviceChange('iphone')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeDevice === 'iphone'
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Apple iOS</span>
          </button>

          <button
            onClick={() => onDeviceChange('android')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeDevice === 'android'
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Android</span>
          </button>

          <button
            onClick={() => onDeviceChange('tablet')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeDevice === 'tablet'
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <TabletIcon className="h-4 w-4" />
            <span>Tablet</span>
          </button>
        </div>
      </div>

      {/* Actual Device Frame Mockup Container */}
      <div className={frameClasses}>
        
        {/* Dynamic Notch/Dynamic Island for Apple iPhone */}
        {activeDevice === 'iphone' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-auto mr-4" />
          </div>
        )}

        {/* Camera Punch Hole for Android */}
        {activeDevice === 'android' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50" />
        )}

        {/* Operating System Status Bar */}
        <div className={`px-6 py-2 bg-white text-slate-800 flex items-center justify-between text-[11px] font-semibold z-40 select-none border-b border-slate-100 ${
          activeDevice === 'iphone' ? 'pt-3.5 pb-1' : 'py-2'
        }`}>
          <span className="font-mono">{time}</span>
          
          {/* Status Bar Icons */}
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Device Inner Content Screen */}
        <div className={screenClasses}>
          {children}
        </div>

        {/* Bottom Interactive home Indicator / Virtual Navigation pill */}
        <div className="bg-white py-2 flex justify-center items-center border-t border-slate-100 select-none z-40">
          {activeDevice === 'iphone' || activeDevice === 'tablet' ? (
            <div className="w-[120px] h-1.5 bg-slate-800 rounded-full" />
          ) : (
            <div className="flex items-center justify-around w-full max-w-[200px] text-slate-500 py-0.5 text-xs font-bold">
              <span className="hover:text-slate-800 cursor-pointer">◀</span>
              <span className="h-3.5 w-3.5 border-2 border-slate-500 rounded-full hover:border-slate-800 cursor-pointer" />
              <span className="w-3.5 h-3.5 border-2 border-slate-500 rounded-xs hover:border-slate-800 cursor-pointer" />
            </div>
          )}
        </div>

      </div>

      {/* Reset Floating Control */}
      <div className="mt-8 z-10 flex items-center gap-4">
        <button
          onClick={() => onDeviceChange('desktop')}
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Sair da Simulação de Dispositivo</span>
        </button>
      </div>
    </div>
  );
}
