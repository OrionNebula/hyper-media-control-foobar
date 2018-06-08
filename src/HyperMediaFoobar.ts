import { MediaPlugin, HyperMediaConfig, PlayerManager, Status, State } from 'hyper-media-control'
import { FoobarControl, Foobar } from 'foobar-control-http'
import { EventEmitter } from 'events'
import { Repeat } from 'hyper-media-control/dist/types/Repeat'

interface HyperMediaFoobarConfig {
  port: number
}

export class HyperMediaFoobar extends EventEmitter implements MediaPlugin {
  readonly playerManager: PlayerManager
  private eventPumpHandle: NodeJS.Timer
  private readonly foobar: FoobarControl
  private readonly config: HyperMediaFoobarConfig
  constructor (playerManager: PlayerManager, config: HyperMediaConfig) {
    super()
    this.playerManager = playerManager
    this.config = { port: 8888, ...config['foobar'] }
    this.foobar = new FoobarControl('localhost', this.config.port)
  }

  playerName (): string {
    return 'foobar'
  }

  iconUrl (): string {
    return 'data:image/png;base64,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'
  }

  activate (): void {
    this.eventPumpHandle = setInterval(() => this.eventPump(), 500)
  }

  eventPump () {
    this.foobar.getStatus()
      .then(status => this.emit('status', this.composeStatus(status)))
      .catch(() => this.emit('status', { isRunning: false } as Status))
  }

  deactivate (): void {
    clearInterval(this.eventPumpHandle)
  }

  playPause () {
    return this.foobar.playOrPause().then(status => this.composeStatus(status))
  }

  nextTrack () {
    return this.foobar.next().then(status => this.composeStatus(status))
  }

  previousTrack () {
    return this.foobar.previous().then(status => this.composeStatus(status))
  }

  toggleShuffle () {
    return this.foobar.getStatus()
      .then(status => this.foobar.playbackOrder(status.playbackOrder >= Foobar.PlaybackOrder.Random ? Foobar.PlaybackOrder.Default : Foobar.PlaybackOrder.Random))
      .then(status => this.composeStatus(status))
  }

  toggleRepeat () {
    return this.foobar.getStatus()
      .then(status => this.foobar.playbackOrder(status.playbackOrder === Foobar.PlaybackOrder.RepeatPlaylist ? Foobar.PlaybackOrder.RepeatTrack : status.playbackOrder === Foobar.PlaybackOrder.RepeatTrack ? Foobar.PlaybackOrder.Default : Foobar.PlaybackOrder.RepeatPlaylist))
      .then(status => this.composeStatus(status))
  }

  /**
   * Convert a foobar-control-http status object to a hyper-media-control status object.
   * @param {Foobar.Status} status A status object from foobar-control-http
   * @private
   */
  private composeStatus (status: Foobar.Status): Status {
    return {
      isRunning: true,
      state: status.isPlaying ? State.Playing : status.isPaused ? State.Paused : State.Stopped,
      progress: status.itemPlayingPos,
      repeat: status.playbackOrder === Foobar.PlaybackOrder.RepeatPlaylist ? Repeat.All : status.playbackOrder === Foobar.PlaybackOrder.RepeatTrack ? Repeat.One : Repeat.None,
      shuffle: status.playbackOrder >= Foobar.PlaybackOrder.Random,
      volume: status.volume,
      track: status.playingItem && {
        name: status.playingItem.title,
        artist: status.playingItem.artist,
        duration: status.playingItem.duration,
        coverUrl: status.albumArtUrl,
        isPlaying: true
      }
    }
  }
}
