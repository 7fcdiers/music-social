import axios from 'axios'
import env from '#start/env/index'

interface GeocodingResult {
  latitude: number
  longitude: number
}

export default class LocationService {
  private readonly apiKey: string

  constructor() {
    this.apiKey = env.get('GOOGLE_MAPS_API_KEY')
  }

  public async geocodeAddress(address: string): Promise<GeocodingResult> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${this.apiKey}`
      )

      if (response.data.results.length === 0) {
        throw new Error('Address not found')
      }

      const { lat, lng } = response.data.results[0].geometry.location
      return { latitude: lat, longitude: lng }
    } catch (error) {
      throw new Error('Failed to geocode address')
    }
  }

  public async validateCoordinates(latitude: number, longitude: number): Promise<boolean> {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
  }
}