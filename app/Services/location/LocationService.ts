import env from '#start/env/index'
import { LocationError } from '#app/Exceptions/LocationError/index'
import axios from 'axios'

interface GeocodingResult {
  latitude: number
  longitude: number
}

export class LocationService {
  private readonly apiKey: string
  private readonly geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

  constructor() {
    this.apiKey = env.get('GOOGLE_MAPS_API_KEY')
  }

  public async geocodeAddress(address: string): Promise<GeocodingResult> {
    try {
      const response = await axios.get(this.geocodingUrl, {
        params: {
          address: encodeURIComponent(address),
          key: this.apiKey
        }
      })

      if (response.data.results.length === 0) {
        throw new LocationError('Address not found')
      }

      const { lat, lng } = response.data.results[0].geometry.location
      return { latitude: lat, longitude: lng }
    } catch (error) {
      if (error instanceof LocationError) throw error
      throw new LocationError('Failed to geocode address')
    }
  }

  public validateCoordinates(latitude: number, longitude: number): boolean {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
  }
}