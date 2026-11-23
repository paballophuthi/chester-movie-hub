
/* ==========================================================
   movies.js - CHESTER MOVIE HUB
   Movie data + Fetch API with fallback
   ========================================================== */

// FALLBACK MOVIE CATALOGUE
const FALLBACK_MOVIES = [

  {
    id: 1,
    title: "Big Buck Bunny",
    genre: "Comedy",
    year: 2008,
    duration: "10 min",
    description: "A giant rabbit takes comic revenge on three bullying rodents.",
    fullDescription: "A gentle giant rabbit wakes to a sunny morning in the forest until three mischievous rodents start tormenting the butterflies he loves.",
    poster: "images/posters/big-buck-bunny-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    source: "Blender open movie"
  },

  {
    id: 2,
    title: "Sintel",
    genre: "Adventure",
    year: 2010,
    duration: "15 min",
    description: "A lonely young woman searches the world for her lost dragon.",
    fullDescription: "Sintel travels through snowy mountains and deserts to find the baby dragon she once befriended.",
    poster: "images/posters/sintel-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
    source: "Blender open movie"
  },

  {
    id: 3,
    title: "Tears of Steel",
    genre: "Science Fiction",
    year: 2012,
    duration: "12 min",
    description: "Warriors and scientists try to save the world from killer robots.",
    fullDescription: "In a future Amsterdam, scientists and soldiers attempt to stop a robot invasion.",
    poster: "images/posters/tears-of-steel-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=R6MlUcmOul8",
    source: "Blender open movie"
  },

  {
    id: 4,
    title: "Elephants Dream",
    genre: "Science Fiction",
    year: 2006,
    duration: "11 min",
    description: "Two strangers explore a surreal, machine-like world.",
    fullDescription: "Emo and Proog wander through a strange mechanical world.",
    poster: "images/posters/elephants-dream-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=TLkA0RELQ1g",
    source: "Blender open movie"
  },

  {
    id: 5,
    title: "Cosmos Laundromat",
    genre: "Drama",
    year: 2015,
    duration: "12 min",
    description: "A man meets a salesman with many offers.",
    fullDescription: "On a lonely island, Franck meets a strange salesman who offers him a chance to live other lives.",
    poster: "images/posters/cosmos-laundromat-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=Y-rmzh0PI3c",
    source: "Blender open movie"
  },

  {
    id: 6,
    title: "Spring",
    genre: "Drama",
    year: 2019,
    duration: "8 min",
    description: "A shepherd girl and her dog face ancient spirits.",
    fullDescription: "A young shepherd girl and her dog must face the spirits of the land.",
    poster: "images/posters/spring-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
    source: "Blender open movie"
  },

  {
    id: 7,
    title: "Crimson Protocol",
    genre: "Action",
    year: 2024,
    duration: "118 min",
    description: "A rogue agent has 48 hours to stop a global blackout.",
    fullDescription: "A former agent must stop a hidden network from shutting down power grids.",
    poster: "images/posters/crimson-protocol-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 8,
    title: "Last Lap to Maseru",
    genre: "Action",
    year: 2025,
    duration: "104 min",
    description: "A racing driver crosses the mountains to save her team.",
    fullDescription: "A young racing driver has until sunrise to reach the finish line in Maseru.",
    poster: "images/posters/last-lap-to-maseru-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=R6MlUcmOul8",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 9,
    title: "Mix-Up at the Market",
    genre: "Comedy",
    year: 2023,
    duration: "96 min",
    description: "Two market traders swap orders and cause chaos.",
    fullDescription: "A simple Saturday turns into a town-wide comedy of errors.",
    poster: "images/posters/mix-up-at-the-market-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 10,
    title: "Rivers Remember",
    genre: "Drama",
    year: 2022,
    duration: "127 min",
    description: "Three generations return to the village they left.",
    fullDescription: "A family returns to their village where old secrets bring them together.",
    poster: "images/posters/rivers-remember-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=Y-rmzh0PI3c",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 11,
    title: "The Hollow Hour",
    genre: "Horror",
    year: 2025,
    duration: "101 min",
    description: "An old school bell rings every night at 3 a.m.",
    fullDescription: "A night guard at an abandoned school discovers something strange.",
    poster: "images/posters/the-hollow-hour-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=TLkA0RELQ1g",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 12,
    title: "Skyward Kingdom",
    genre: "Animation",
    year: 2026,
    duration: "92 min",
    description: "A cloud-keeper discovers a kingdom above the storm.",
    fullDescription: "Pira climbs to a kingdom above the clouds to save her village.",
    poster: "images/posters/skyward-kingdom-photo.jpg",
    trailer: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
    source: "CHESTER MOVIE HUB sample"
  },

  {
    id: 13,
    title: "Proud Mary",
    genre: "Action",
    year: 2018,
    duration: "89 min",
    description: "A professional assassin tries to protect a young boy.",
    fullDescription: "Proud Mary is an action thriller about a professional assassin whose life changes after she encounters a young boy.",
    poster: "images/posters/proud-mary.jpg",
    trailer: "",
    source: "Local video file"
  },

  {
    id: 14,
    title: "Red Notice",
    genre: "Action",
    year: 2021,
    duration: "118 min",
    description: "An FBI agent teams up with two rival art thieves.",
    fullDescription: "An FBI agent becomes involved in an international pursuit involving two art thieves, unexpected alliances and dangerous adventures.",
    poster: "images/posters/red-notice.jpg",
    trailer: "videos/red-notice.mp4",
    source: "Local video file"
  },

  {
    id: 15, title: "Mr Bean", genre: "Comedy", year: 1997, duration: "Trailer",
    description: "A comedy trailer featuring Mr Bean.",
    fullDescription: "Watch the supplied Mr Bean trailer directly on CHESTER MOVIE HUB.",
    poster: "images/posters/mr-bean-poster.jpg", trailer: "videos/mr-bean.mp4",
    source: "Video supplied with the website project"
  },
  {
    id: 16, title: "Wrong Turn 8", genre: "Horror", year: 2026, duration: "Trailer",
    description: "A horror trailer set against a dark forest atmosphere.",
    fullDescription: "Watch the supplied Wrong Turn 8 video trailer directly on CHESTER MOVIE HUB.",
    poster: "images/posters/wrong-turn-8-poster.jpg", trailer: "videos/wrong-turn-8.mp4",
    source: "Video supplied with the website project"
  },
  {
    id: 17, title: "Umlazi Gangster 5", genre: "Action", year: 2026, duration: "Trailer",
    description: "A South African action-drama trailer.",
    fullDescription: "Watch the supplied Umlazi Gangster 5 trailer directly on CHESTER MOVIE HUB.",
    poster: "images/posters/umlazi-gangster-5-poster.jpg", trailer: "videos/umlazi-gangster-5.mp4",
    source: "Video supplied with the website project"
  },
  {
    id: 18, title: "Give Me Some Sugah", genre: "Drama", year: 2026, duration: "Trailer",
    description: "A music-themed trailer with a vibrant performance image.",
    fullDescription: "Watch the supplied Give Me Some Sugah video trailer directly on CHESTER MOVIE HUB.",
    poster: "images/posters/give-me-some-sugah-poster.jpg", trailer: "videos/give-me-some-sugah.mp4",
    source: "Video supplied with the website project"
  },
];
