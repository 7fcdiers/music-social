import Rating from '#app/Models/Rating'
import Concert from '#app/Models/Concert'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class RatingService {
  public async rateConcert(concertId: number, score: number, auth: AuthContract) {
    const concert = await Concert.findOrFail(concertId)
    
    const existingRating = await Rating.query()
      .where('concert_id', concertId)
      .where('user_id', auth.user!.id)
      .first()

    if (existingRating) {
      existingRating.score = score
      await existingRating.save()
      return existingRating
    }

    return await Rating.create({
      score,
      userId: auth.user!.id,
      concertId: concert.id
    })
  }

  public async getUserRating(concertId: number, userId: number) {
    return await Rating.query()
      .where('concert_id', concertId)
      .where('user_id', userId)
      .first()
  }
}