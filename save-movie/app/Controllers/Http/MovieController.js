'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with movies
 */

const _movie = use('App/Models/Movie')

class MovieController {

  async index ({ auth }) {
    // const movies = await _movie.all()
    const movies = await _movie.query().where('user_id', auth.user.id).where('watched_flag', false).with('genre').fetch()
    
    return movies
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'sinopse', 'genre_id'])
    const movie = await _movie.create({ user_id: auth.user.id, watched_flag: false, ...data })

    return movie
  }

  async show ({ params }) {
    const movie = await _movie.findOrFail(params.id)
    const response = await _movie.query().where('id', movie.id).with('genre').fetch()

    return response
  }

  async update ({ params, request }) {
    const data = request.only(['title', 'sinopse', 'genre_id'])
    const movie = await _movie.findOrFail(params.id)

    movie.merge(data)
    await movie.save()

    return movie
  }

  async destroy ({ params }) {
    const movie = await _movie.findOrFail(params.id)
    await movie.delete()
  }
}

module.exports = MovieController
