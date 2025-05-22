// src/utils/SoundManager.ts
import {
  createAudioPlayer,
  AudioPlayer,
  AudioSource,
  setAudioModeAsync,
  // hàm setAudioModeAsync nằm ở namespace Audio
} from 'expo-audio'

class SoundManager {
  private backgroundPlayer: AudioPlayer | null = null
  private sfxPlayer: AudioPlayer | null = null

  constructor() {
    // Fire-and-forget: cấu hình audio ngay khi app khởi tạo
    setAudioModeAsync({
      allowsRecording: false,
      interruptionMode: 'duckOthers', // thay cho InterruptionModeIOS.DuckOthers
      interruptionModeAndroid: 'duckOthers',
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      shouldRouteThroughEarpiece: false,
    }).catch(console.warn) // không làm “vỡ” app nếu lỗi cấu hình
  }

  /** 🔊 Phát nhạc nền (lặp vô hạn) */
  async playBackgroundSound(source: AudioSource) {
    if (this.backgroundPlayer) return // đã có thì bỏ qua
    this.backgroundPlayer = createAudioPlayer(source) // :contentReference[oaicite:0]{index=0}
    this.backgroundPlayer.loop = true
    await this.backgroundPlayer.play() // play() không trả Promise, nhưng await OK
  }

  /** ⏹️ Dừng nhạc nền */
  async stopBackgroundSound() {
    if (!this.backgroundPlayer) return
    this.backgroundPlayer.pause()
    this.backgroundPlayer.remove() // giải phóng tài nguyên :contentReference[oaicite:1]{index=1}
    this.backgroundPlayer = null
  }

  /** 🎵 Phát SFX duy nhất (ghi đè cái trước) */
  async playSFX(source: AudioSource) {
    if (this.sfxPlayer) {
      this.sfxPlayer.remove()
      this.sfxPlayer = null
    }
    this.sfxPlayer = createAudioPlayer(source)
    this.sfxPlayer.play()
  }

  /** ⏹️ Dừng tất cả */
  async stopAllSounds() {
    await this.stopBackgroundSound()
    if (this.sfxPlayer) {
      this.sfxPlayer.remove()
      this.sfxPlayer = null
    }
  }
}

export default new SoundManager()
