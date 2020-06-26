'use strict'

const _movie = use('App/Models/Movie')

class WatchedController {
  async index ({ auth }) {
    const movies = await _movie.query().where('user_id', auth.user.id).where('watched_flag', true).with('genre').fetch()
    
    return movies
  }

  async update ({ params }) {
    const data = { watched_flag: true }
    const movie = await _movie.findOrFail(params.id)

    movie.merge(data)
    await movie.save()

    return movie
  }
}

module.exports = WatchedController
