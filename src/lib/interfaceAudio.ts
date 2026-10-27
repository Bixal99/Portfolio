/** One soft click signature, generated locally after a real activation. */
export function createInterfaceAudio() {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let lastPress = -Infinity;
  let generation = 0;

  const unlock = () => {
    if (typeof AudioContext === "undefined") return;
    try {
      if (!context || context.state === "closed") {
        context = new AudioContext({ latencyHint: "interactive" });
        master = context.createGain();
        master.gain.value = .12;
        master.connect(context.destination);
      }
      if (context.state === "suspended") return context.resume().catch(() => {});
    } catch { /* Audio support must never block an action. */ }
  };

  const play = () => {
    const requestGeneration = generation;
    const ready = unlock();
    if (!context || context.state !== "running") {
      if (ready) {
        const pendingContext = context;
        void ready.then(() => {
          if (generation === requestGeneration && context === pendingContext && context?.state === "running") play();
        });
      }
      return;
    }
    const time = performance.now();
    if (time - lastPress < 65) return;
    lastPress = time;
    try {
      const now = context.currentTime + .003;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, now);
      oscillator.frequency.exponentialRampToValueAtTime(240, now + .075);
      envelope.gain.setValueAtTime(.0001, now);
      envelope.gain.exponentialRampToValueAtTime(.24, now + .004);
      envelope.gain.exponentialRampToValueAtTime(.0001, now + .085);
      oscillator.connect(envelope);
      envelope.connect(master!);
      oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
      oscillator.start(now);
      oscillator.stop(now + .092);
    } catch { /* Navigation and controls remain immediate if audio is unavailable. */ }
  };

  return {
    play,
    suspend() { generation++; if (context && context.state !== "closed") void context.suspend().catch(() => {}); },
    close() { generation++; if (context && context.state !== "closed") void context.close().catch(() => {}); context = null; master = null; lastPress = -Infinity; },
  };
}
