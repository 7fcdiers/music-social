import { Exception } from "@adonisjs/core/exceptions";

export class LocationError extends Exception {
  constructor(message: string) {
    super(message, 400)
  }
}