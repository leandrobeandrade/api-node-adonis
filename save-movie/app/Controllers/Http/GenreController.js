'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with genres
 */

const _genre = use('App/Models/Genre')

class GenreController {

  async index ({ request, response, view }) {           // GET => /genre
    const genres = await _genre.all()

    return genres
  }

  async store ({ request, response }) {                 // POST => /genre
    const data = request.only(['description'])
    const genre = await _genre.create(data)

    return genre
  }

  async show ({ params, request, response, view }) {    // GET => /genre/:id
    const genre = await _genre.findOrFail(params.id)
    
    return genre
  }

  async update ({ params, request, response }) {        // PUT => /genre/:id
    const data = request.only(['description'])
    const genre = await _genre.findOrFail(params.id)

    genre.merge(data)
    await genre.save()

    return genre
  }

  async destroy ({ params, request, response }) {       // DELETE => /genre/:id
    const genre = await _genre.findOrFail(params.id)
    
    await genre.delete()
  }
}

module.exports = GenreController
