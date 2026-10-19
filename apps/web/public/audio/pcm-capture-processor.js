/**
 * AudioWorklet: يحوّل مدخل الميكروفون إلى عيّنات PCM 16-bit little-endian
 * ويرسلها للسلك الرئيسي بدون ربط بمخرجات السماعة (بيريح من الإيكو).
 *
 * لازم تكون ملف static في /public عشان addModule() يقدر يحمّله.
 */
class PcmCaptureProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0] || input[0].length === 0) {
      return true;
    }

    const samples = input[0];
    const pcm = new Int16Array(samples.length);

    for (let i = 0; i < samples.length; i++) {
      const s = samples[i] < -1 ? -1 : samples[i] > 1 ? 1 : samples[i];
      pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    this.port.postMessage(pcm.buffer, [pcm.buffer]);
    return true;
  }
}

registerProcessor("pcm-capture", PcmCaptureProcessor);
