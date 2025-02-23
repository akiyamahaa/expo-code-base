import { Audio, InterruptionModeIOS } from 'expo-av'

class SoundManager {
  private backgroundSound: Audio.Sound | null = null
  private sfxSound: Audio.Sound | null = null

  constructor() {
    this.configureAudioMode() // Ensure audio mode is set when app starts
  }

  /**
   * 🎛 Configure the Audio Mode for iOS
   */
  async configureAudioMode() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, // Ensure no microphone interference
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true, // Allow playback even in silent mode
        staysActiveInBackground: true, // Allow background playback
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      })
    } catch (error) {
      console.error('Error setting audio mode:', error)
    }
  }

  /**
   * 🔊 Play Background Sound
   * @param soundFile
   */
  async playBackgroundSound(soundFile: any): Promise<void> {
    try {
      if (this.backgroundSound) return

      this.backgroundSound = new Audio.Sound()
      await this.backgroundSound.loadAsync(soundFile)
      await this.backgroundSound.setIsLoopingAsync(true) // background repeat
      await this.backgroundSound.playAsync()
    } catch (error) {
      console.error('Lỗi phát nhạc nền:', error)
    }
  }

  /**
   * ⏹️ stop background sound
   */
  async stopBackgroundSound(): Promise<void> {
    if (this.backgroundSound) {
      await this.backgroundSound.stopAsync()
      await this.backgroundSound.unloadAsync()
      this.backgroundSound = null
    }
  }

  /**
   * 🎵 Play sound effect
   * @param soundFile
   */
  async playSFX(soundFile: any): Promise<void> {
    try {
      if (this.sfxSound) {
        await this.sfxSound.unloadAsync()
      }
      this.sfxSound = new Audio.Sound()
      await this.sfxSound.loadAsync(soundFile)
      await this.sfxSound.playAsync()
    } catch (error) {
      console.error('Lỗi phát âm thanh hiệu ứng:', error)
    }
  }

  /**
   * ⏹️ stop all sound
   */
  async stopAllSounds(): Promise<void> {
    await this.stopBackgroundSound()
    if (this.sfxSound) {
      await this.sfxSound.unloadAsync()
      this.sfxSound = null
    }
  }
}

export default new SoundManager()
