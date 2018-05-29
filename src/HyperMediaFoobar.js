import { EventEmitter } from 'events'
import request from 'request'
import url from 'url'

export class HyperMediaFoobar extends EventEmitter {
  constructor (playerManager, config) {
    super()
    this.playerManager = playerManager
    this.config = Object.assign({
      port: 8888
    }, config.foobar || {})

    this.baseUrl = `http://localhost:${this.config.port}/ajquery`
  }

  // The player's ID
  playerName () {
    return 'foobar'
  }

  // A URL that serves as the icon for this player.
  iconUrl () {
    return 'data:image/png;base64,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'
  }

  // Pauses or resumes playback, and returns a Promise for the status object.
  playPause () {
    return new Promise((resolve, reject) => {
      this.sendCommand('PlayOrPause', (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(this.getStatus().then(x => x.status))
      })
    })
  }

  // Moves playback forward one track, and returns a Promise for the status object.
  nextTrack () {
    return new Promise((resolve, reject) => {
      this.sendCommand('StartNext', (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(this.getStatus().then(x => x.status))
      })
    })
  }

  // Moves playback backwards one track, and returns a Promise for the status object.
  previousTrack () {
    return new Promise((resolve, reject) => {
      this.sendCommand('StartPrevious', (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(this.getStatus().then(x => x.status))
      })
    })
  }

  toggleShuffle () {
    return this.getStatus().then(status => new Promise((resolve, reject) => {
      this.sendCommand('PlaybackOrder', { param1: status.shuffle ? 0 : 3 }, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(this.getStatus().then(x => x.status))
      })
    }))
  }

  toggleRepeat () {
    return this.getStatus().then(status => new Promise((resolve, reject) => {
      this.sendCommand('PlaybackOrder', { param1: status.repeat === 'all' ? 2 : (status.repeat === 'one' ? 0 : 1) }, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }

        resolve(this.getStatus().then(x => x.status))
      })
    }))
  }

  // Activates the player, enabling it to emit events.
  activate () {
    this.eventPumpHandle = setInterval(() => this.eventPump(), 500)
  }

  // Deactivates the player, shutting down the events.
  deactivate () {
    clearInterval(this.eventPumpHandle)
  }

  eventPump () {
    this.getStatus().then(({status, playlist}) => {
      this.emit('status', status)
      this.emit('playlist', playlist)
    })
  }

  // Send a request to the foobar-httpcontrol component with the specified command and handler.
  sendCommand (cmd, args, handler) {
    if (args instanceof Function) {
      return this.sendCommand(cmd, {}, args)
    }

    request({
      method: 'GET',
      url: this.baseUrl,
      qs: Object.assign(args, {
        cmd,
        param3: 'NoResponse'
      }),
      headers: {
        'cache-control': 'no-cache'
      }
    }, handler)
  }

  getStatus () {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: this.baseUrl,
        qs: {
          param3: 'js/state.json'
        },
        headers: {
          'cache-control': 'no-cache'
        },
        json: true
      }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          resolve({ isRunning: false })
          return
        }

        resolve(this.composeStatus(body))
      })
    })
  }

  composeStatus (body) {
    var track = Number(body.playlistItemsCount) <= Number(body.playlistItemsPerPage) ? body.playlist[Number(body.playingItem)] : body.playlist[Number(body.playingItem) - (Number(body.playlistPage) - 1) * Number(body.playlistItemsPerPage)]
    var status = {
      isRunning: true,
      state: (!!Number(body.isPaused) && 'paused') || (!!Number(body.isPlaying) && 'playing') || 'stopped',
      volume: Number(body.volume) / 100,
      progress: body.itemPlayingPos * 1000,
      shuffle: Number(body.playbackOrder) >= 3,
      repeat: Number(body.playbackOrder) === 1 ? 'all' : (Number(body.playbackOrder) === 2 ? 'one' : 'none'),
      track: (track && {
        name: track.t,
        artist: track.a,
        coverUrl: body.albumArt.length > 0 && body.albumArt !== '/ajquery/img/icon1rx.png' ? url.resolve(this.baseUrl, body.albumArt) : undefined,
        duration: body.itemPlayingLen * 1000
      }) || {}
    }

    var playlist = body.playlist.map((x, index) => ({
      name: x.t,
      artist: x.a,
      isPlaying: index === (Number(body.playlistItemsCount) <= Number(body.playlistItemsPerPage) ? Number(body.playingItem) : Number(body.playingItem) - (Number(body.playlistPage) - 1) * Number(body.playlistItemsPerPage))
    }))
    return { status, playlist }
  }
}
