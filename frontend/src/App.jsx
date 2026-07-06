import { useState } from "react";
import { motion } from "framer-motion";
import {
  Train,
  Gauge,
  CloudRain,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Zap,
  Activity,
  Cpu,
} from "lucide-react";

const initialForm = {
  train_no: 12301,
  weather: "Rain",
  day_of_week: "Friday",
  distance_from_source: 1200,
  previous_station_delay: 18,
  track_congestion: "High",
  station_congestion: "Medium",
};

function getDelayStatus(delay) {
  if (delay <= 5) return { label: "On Time", color: "text-emerald-300" };
  if (delay <= 15) return { label: "Minor Delay", color: "text-yellow-300" };
  if (delay <= 30) return { label: "Moderate Delay", color: "text-orange-300" };
  return { label: "Major Delay", color: "text-red-300" };
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    const numberFields = ["train_no", "distance_from_source", "previous_station_delay"];

    setForm({
      ...form,
      [name]: numberFields.includes(name) ? Number(value) : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend error. Start Django server first.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const status = result ? getDelayStatus(result.predicted_delay) : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-premium text-white">
     <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
<div className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
<div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <nav className="glass mb-14 flex items-center justify-between rounded-3xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3 glow">
              <Train className="text-cyan-300" />
            </div>
            <div>
              <h1 className="text-xl font-black">RailMind AI</h1>
              <p className="text-xs text-slate-400">Intelligent Railway Prediction</p>
            </div>
          </div>

          <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2 text-sm text-cyan-200 md:flex items-center gap-2">
            <Zap size={16} />
            AI Powered
          </div>
        </nav>

        <section className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <Activity size={16} />
              Smarter Railway Operations
            </div>

            <h2 className="text-5xl font-black leading-tight md:text-7xl">
              AI Powered
              <span className="neon-text block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Delay Prediction
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Predict train delays using Machine Learning and railway operating
              conditions with real-time explainable insights.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <Stat title="ML Model" value="RF" />
              <Stat title="Inputs" value="7" />
              <Stat title="Backend" value="Django" />
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="glass rounded-[2rem] p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">Prediction Console</h3>
                <p className="text-sm text-slate-400">Enter operational parameters</p>
              </div>
              <Gauge className="text-amber-300" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input icon={<Train size={17} />} label="Train Number" name="train_no" type="number" value={form.train_no} onChange={update} />
              <Select icon={<CloudRain size={17} />} label="Weather" name="weather" value={form.weather} onChange={update} options={["Clear", "Cloudy", "Rain", "Fog"]} />
              <Select icon={<Calendar size={17} />} label="Day of Week" name="day_of_week" value={form.day_of_week} onChange={update} options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} />
              <Input icon={<MapPin size={17} />} label="Distance From Source" name="distance_from_source" type="number" value={form.distance_from_source} onChange={update} />
              <Input icon={<Clock size={17} />} label="Previous Delay" name="previous_station_delay" type="number" value={form.previous_station_delay} onChange={update} />
              <Select icon={<AlertTriangle size={17} />} label="Track Congestion" name="track_congestion" value={form.track_congestion} onChange={update} options={["Low", "Medium", "High"]} />
              <Select icon={<Cpu size={17} />} label="Station Congestion" name="station_congestion" value={form.station_congestion} onChange={update} options={["Low", "Medium", "High"]} />
            </div>

            <button
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-4 font-black text-white shadow-xl shadow-cyan-500/25 transition hover:scale-[1.015] disabled:opacity-60"
            >
              {loading ? "Analyzing Railway Data..." : "Predict Delay"}
            </button>
          </motion.form>
        </section>

        {result && (
          <motion.section
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-10 rounded-[2rem] p-8"
          >
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-400">Predicted Delay</p>
                <h3 className="mt-2 text-7xl font-black text-cyan-300">
                  {result.predicted_delay}
                  <span className="text-2xl text-slate-400"> min</span>
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <p className="text-sm text-slate-400">Delay Status</p>
                <p className={`mt-2 text-3xl font-black ${status.color}`}>
                  {status.label}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm text-slate-400">Detected Reasons</p>
                <div className="space-y-3">
                  {result.reasons?.map((reason) => (
                    <div
                      key={reason}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <AlertTriangle size={17} className="text-amber-300" />
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-2xl font-black text-cyan-300">{value}</p>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>

      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 focus-within:border-cyan-300">
        <span className="pointer-events-none text-cyan-300">{icon}</span>

        <input
          {...props}
          className="w-full min-w-0 bg-transparent text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </label>
  );
}

function Select({ label, icon, options, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>

      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 focus-within:border-cyan-300">
        <span className="pointer-events-none text-cyan-300">{icon}</span>

        <select
          {...props}
          className="w-full min-w-0 appearance-none bg-slate-950 text-white outline-none"
        >
          {options.map((item) => (
            <option key={item} value={item} className="bg-slate-950 text-white">
              {item}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}