import AlbumInfos from "./album-infos.js"
import { Track, CreditEntry } from "@/components/forms/track-upload"

let RANDOM_NAMES = [
  "Dexter",
  "Lucky",
  "Molly",
  "BatMan",
  "Shakira",
  "Simon",
  "Buddy",
  "Leo",
  "Tigger",
  "Fiona",
  "Milo",
  "Sugar",
  "Samantha",
  "Cupcake",
  "Princess",
  "Mimi",
  "Bailey",
  "Precious",
  "Sammy",
  "Loki",
  "Toby",
  "Sasha",
  "Midnight",
  "Cher",
  "Luna",
  "Max",
  "Jasper",
  "Shadow",
  "Murphy",
  "Panda",
  "Tiger",
  "Fred",
  "Gracie",
  "Oscar",
  "Sassy",
  "Izzy",
  "Pepper",
  "Jasmine",
  "Spike",
  "Lady Gaga",
  "Zeus",
  "Sweetie",
  "Coco Chanel",
  "Houdini",
  "Chester",
  "Nala",
  "Lilly",
  "Romeo",
  "Phoebe",
  "Scooter",
  "Emma",
  "Sadie",
  "Bella",
  "Cali",
  "Felix",
  "Kiki",
  "Marley",
  "Minnie",
  "Coco",
  "Lucy",
  "Harley",
  "Sox",
  "Rocky",
  "Salem",
  "Oprah",
  "Peanut",
  "Boots",
  "Beyonce",
  "Rusty",
  "Jake",
  "Smokey",
  "Socks",
  "Chloe",
  "Maddie",
  "Misty",
  "Lola",
  "Snickers",
  "Kitty",
  "Muffin",
  "Garfield",
  "Oliver",
  "Charlie",
  "Madonna",
  "Angel",
  "Maggie",
  "Boomer",
  "Simba",
  "Missy",
  "Casper",
  "George",
  "Zoe",
  "Fluffy",
  "Blackie",
  "Ginger",
  "Callie",
  "Noodle",
  "Tucker",
  "Elvis",
  "Patches",
  "Pumpkin",
  "Jack",
  "Gizmo",
  "Daisy",
  "Lily",
  "Sophie",
  "Dusty",
  "Belle",
  "Oreo",
  "Ziggy",
  "Boo",
  "Twiggy",
  "Baby",
  "Bandit",
  "Mittens",
  "Sebastian",
  "Frankie"
]

export default class Album {
  
  constructor() {
    this.infos = new AlbumInfos()
    this.tracks = []
  }

  addTrack() {
    let track = new Track()
    this.tracks.push(track)
    return track
  }

  removeTrack(track) {
    let index = this.tracks.indexOf(track)
    if (index == -1) return null
    this.tracks.splice(index, 1)
    return track
  }

  static get randomName() {
    return RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
  }
  static createRandomValidAlbum() {
    let album = new Album()
    album.infos.name = `${this.randomName} ${this.randomName}`
    album.infos.streamingLink = `stream.link/${album.infos.name.split(" ").join('-')}`
    for (let i = 0; i < 5; i++) {
      let track = new Track()
      track.name = `#${i+1} ${this.randomName} ${this.randomName} ${this.randomName}`
      track.lyrics = track.name.split(" ").join("\n")
      track.hasLyrics = Math.random() < 0.5
      track.genre = this.randomName
      album.tracks.push(track)

      for (let j = 0; j < (Math.floor(Math.random() * 3) + 3); j++) {
        let ce = new CreditEntry()
        ce.artistName = `${this.randomName}`
        ce.description = `${this.randomName}, ${this.randomName}`
        track.credits.push(ce)
      }
    }
    return album
  }
}
