import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Signal, Wifi, BatteryFull } from "lucide-react";

const menu = [
  { id: 1, name: "Zinger Burger", price: 6.5, emoji: "🍔" },
  { id: 2, name: "Crispy Wings", price: 5.0, emoji: "🍗" },
  { id: 3, name: "Loaded Fries", price: 3.5, emoji: "🍟" },
  { id: 4, name: "Cheesy Pizza", price: 8.0, emoji: "🍕" },
];

export default function ChickBiteSimulator() {
  const [cart, setCart] = useState<Record<number, number>>({});

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id: number) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const totalItems = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const totalPrice = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => sum + (menu.find((m) => m.id === Number(id))?.price || 0) * qty, 0),
    [cart]
  );

  return (
    <div className="relative mx-auto w-[280px] select-none sm:w-[300px]">
      <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-orange-500/20 to-red-600/20 blur-2xl" />
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-black/60">
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-950" />
        <div className="relative h-[560px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-orange-50 to-white">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-slate-800">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Signal size={11} />
              <Wifi size={11} />
              <BatteryFull size={13} />
            </div>
          </div>

          {/* header */}
          <div className="mt-2 flex items-center justify-between px-5">
            <div>
              <p className="font-display text-lg font-bold text-orange-600">ChickBite 🐔</p>
              <p className="text-[10px] text-slate-500">Fast Food, Faster Delivery</p>
            </div>
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                <ShoppingCart size={16} />
              </div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* menu list */}
          <div className="mt-4 space-y-2.5 px-4">
            {menu.map((item) => (
              <div
                key={item.id}
                data-cursor-hover
                className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm shadow-orange-900/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">{item.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                    <p className="text-[11px] text-orange-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {cart[item.id] ? (
                  <div className="flex items-center gap-2 rounded-full bg-orange-500 px-1.5 py-1">
                    <button onClick={() => remove(item.id)} className="text-white">
                      <Minus size={12} />
                    </button>
                    <span className="w-3 text-center text-[11px] font-bold text-white">{cart[item.id]}</span>
                    <button onClick={() => add(item.id)} className="text-white">
                      <Plus size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => add(item.id)}
                    className="rounded-full bg-orange-100 p-2 text-orange-600 transition hover:bg-orange-500 hover:text-white"
                  >
                    <Plus size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* checkout bar */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 shadow-lg"
              >
                <span className="text-xs text-slate-300">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
                <span className="font-mono text-sm font-bold text-white">${totalPrice.toFixed(2)}</span>
                <button className="rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold text-white">Checkout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
