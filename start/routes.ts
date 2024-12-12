import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/http/AuthController'
import HomeController from '#controllers/Http/HomeController'
import AlbumsController from '#controllers/Http/AlbumsController'
import ArtistsController from '#controllers/Http/ArtistsController'
import CommunitiesController from '#controllers/Http/CommunitiesController'
import ConcertsController from '#controllers/Http/ConcertsController'
import MusicSyncController from '#controllers/Http/MusicSyncController'
import SearchController from '#controllers/Http/SearchController'
import TracksController from '#controllers/Http/TracksController'

// Home route
router.get('/', HomeController.index)

// Auth routes
router.group(() => {
  router.post('register', AuthController.register)
  router.post('login', AuthController.login)
  router.post('logout', AuthController.logout)
  router.get('me', AuthController.me)
}).prefix('api/auth')

// Album routes
router.group(() => {
  router.get('albums', AlbumsController.index)
  router.get('albums/:id', AlbumsController.show)
  router.post('albums', AlbumsController.store)
  router.put('albums/:id', AlbumsController.update)
  router.delete('albums/:id', AlbumsController.destroy)
}).prefix('api').middleware('auth')

// Artist routes
router.group(() => {
  router.get('artists', ArtistsController.index)
  router.get('artists/:id', ArtistsController.show)
  router.post('artists', ArtistsController.store)
  router.put('artists/:id', ArtistsController.update)
  router.delete('artists/:id', ArtistsController.destroy)
}).prefix('api').middleware('auth')

// Community routes
router.group(() => {
  router.get('communities', CommunitiesController.index)
  router.get('communities/:id', CommunitiesController.show)
  router.post('communities', CommunitiesController.store)
  router.post('communities/:id/join', CommunitiesController.join)
  router.post('communities/:id/leave', CommunitiesController.leave)
}).prefix('api').middleware('auth')

// Concert routes
router.group(() => {
  router.get('concerts', ConcertsController.index)
  router.get('concerts/:id', ConcertsController.show)
  router.post('concerts', ConcertsController.store)
  router.put('concerts/:id', ConcertsController.update)
  router.delete('concerts/:id', ConcertsController.destroy)
}).prefix('api').middleware('auth')

// MusicSync routes
router.group(() => {
  router.get('musicsync', MusicSyncController.index)
  router.post('musicsync/sync', MusicSyncController.sync)
}).prefix('api').middleware('auth')

// Search routes
router.group(() => {
  router.get('search', SearchController.index)
}).prefix('api').middleware('auth')

// Track routes
router.group(() => {
  router.get('tracks', TracksController.index)
  router.get('tracks/:id', TracksController.show)
  router.post('tracks', TracksController.store)
  router.put('tracks/:id', TracksController.update)
  router.delete('tracks/:id', TracksController.destroy)
}).prefix('api').middleware('auth')
