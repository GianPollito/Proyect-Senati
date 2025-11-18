import React, { useState, useMemo } from 'react';

// NOTA: El requisito de "máximo 24 juegos por categoría" se interpreta aquí como
// "exactamente 24 juegos por cada categoría de género (Acción, Estrategia, etc.)" para asegurar densidad.
// La data se ha actualizado para incluir juegos actuales y reconocibles.

const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";

// --- DEFINICIÓN DE CATEGORÍAS Y JUEGOS TEMÁTICOS (192 JUEGOS EN TOTAL) ---

// 1. Las 8 categorías de género.
const GAME_GENRE_CATEGORIES = [
    "Acción", 
    "Aventura", 
    "Carreras", 
    "Deportes", 
    "Educativos", 
    "Estrategia", 
    "Simulación", 
    "Juegos de rol"
];

// 2. Data MOCK TEMÁTICA: 24 títulos ÚNICOS y RECONOCIBLES para CADA categoría.
const CATEGORY_SPECIFIC_GAMES = {
    // 24 Juegos de Acción
    "Acción": [
        { title: "Call of Duty Mobile", rating: "4.7", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image55.svg" },
        { title: "PUBG Mobile", rating: "4.5", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image56.svg" },
        { title: "Genshin Impact", rating: "4.8", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image57.svg" },
        { title: "Fortnite Mobile", rating: "4.0", installed: true, tags: ["Multijugador"], image: "/image58.svg" },
        { title: "Free Fire Max", rating: "4.4", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image9.svg" },
        { title: "Standoff 2", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image59.svg" },
        { title: "Apex Legends Mobile", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image60.svg" },
        { title: "Brawl Stars", rating: "4.4", installed: true, tags: ["Multijugador"], image: "/image61.svg" },
        { title: "Valorant Mobile", rating: "4.2", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image62.svg" },
        { title: "Dead by Daylight Mobile", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image63.svg" },
        { title: "Critical Ops", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image64.svg" },
        { title: "Modern Combat 5", rating: "4.3", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image65.svg" },
        { title: "Asphalt 9: Legends", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image66.svg" },
        { title: "War Robots", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image67.svg" },
        { title: "Soul Knight", rating: "4.3", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image68.svg" },
        { title: "T3 Arena", rating: "4.8", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image69.svg" },
        { title: "Pixel Gun 3D", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image70.svg" },
        { title: "Marvel Future Fight", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image71.svg" },
        { title: "Shadowgun Legends", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image72.svg" },
        { title: "Into the Dead 2", rating: "4.3", installed: false, tags: ["Multijugador"], image: "/image73.svg" },
        { title: "Subway Surfers", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image74.svg" },
        { title: "Honkai Impact 3rd", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image75.svg" },
        { title: "Black Desert Mobile", rating: "4.2", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image76.svg" },
        { title: "Dragon Ball Legends", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image33.svg" },
    ],
    
    // 24 Juegos de Aventura
    "Aventura": [
        { title: "Minecraft Pocket Edition", rating: "4.5", installed: false, tags: ["Un jugador"], image: "/image77.svg" },
        { title: "Terraria Mobile", rating: "4.6", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image78.svg" },
        { title: "Roblox", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image79.svg" },
        { title: "Stumble Guys", rating: "4.7", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image80.svg" },
        { title: "Among Us", rating: "4.1", installed: true, tags: ["Un jugador"], image: "/image81.svg" },
        { title: "Sky: Children of the Light", rating: "4.9", installed: false, tags: ["Multijugador", "Sin anuncios"], image: "/image82.svg" },
        { title: "Limbo", rating: "4.0", installed: true, tags: ["Un jugador"], image: "/image83.svg" },
        { title: "The Walking Dead", rating: "4.2", installed: false, tags: ["Multijugador"], image: "/image84.svg" },
        { title: "Toca Life World", rating: "4.5", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image85.svg" },
        { title: "Grand Theft Auto: San Andreas", rating: "4.8", installed: false, tags: ["Multijugador", "Sin compras adicionales"], image: "/image86.svg" },
        { title: "Pokemon GO", rating: "4.3", installed: true, tags: ["Un jugador"], image: "/image87.svg" },
        { title: "Oddmar", rating: "4.6", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image88.svg" },
        { title: "Crash Bandicoot: On the Run!", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image89.svg" },
        { title: "Harry Potter: Hogwarts Mystery", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image90.svg" },
        { title: "Life Is Strange", rating: "4.7", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image91.svg" },
        { title: "The Witness", rating: "4.0", installed: false, tags: ["Multijugador"], image: "/image92.svg" },
        { title: "Machinarium", rating: "4.1", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image93.svg" },
        { title: "Little Nightmares", rating: "4.5", installed: false, tags: ["Un jugador"], image: "/image94.svg" },
        { title: "Oceanhorn 2", rating: "4.8", installed: true, tags: ["Multijugador"], image: "/image95.svg" },
        { title: "Badland", rating: "4.3", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image96.svg" },
        { title: "Alto's Odyssey", rating: "4.6", installed: true, tags: ["Un jugador"], image: "/image97.svg" },
        { title: "Grim Fandango", rating: "4.4", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image98.svg" },
        { title: "Five Nights at Freddy's", rating: "4.7", installed: true, tags: ["Un jugador"], image: "/image99.svg" },
        { title: "Monument Valley 2", rating: "4.1", installed: false, tags: ["Multijugador"], image: "/image100.svg" },
    ],

    // 24 Juegos de Carreras
    "Carreras": [
        { title: "Need for Speed No Limits", rating: "4.7", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image101.svg" },
        { title: "Real Racing 3", rating: "4.5", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image102.svg" },
        { title: "Forza Horizon Mobile", rating: "4.8", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image103.svg" },
        { title: "Hot Wheels Unlimited", rating: "4.0", installed: true, tags: ["Multijugador"], image: "/image104.svg" },
        { title: "Mario Kart Tour", rating: "4.4", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image105.svg" },
        { title: "Hill Climb Racing 2", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image106.svg" },
        { title: "Drift Max Pro", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image107.svg" },
        { title: "F1 Mobile Racing", rating: "4.4", installed: true, tags: ["Multijugador"], image: "/image108.svg" },
        { title: "CarX Street", rating: "4.2", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image109.svg" },
        { title: "Rush Hour 3D", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image110.svg" },
        { title: "Gear.Club Stradale", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image111.svg" },
        { title: "CSR Racing 2", rating: "4.3", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image112.svg" },
        { title: "Traffic Rider", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image113.svg" },
        { title: "Wreckfest Mobile", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image114.svg" },
        { title: "Rebel Racing", rating: "4.3", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image115.svg" },
        { title: "Top Drives", rating: "4.8", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image116.svg" },
        { title: "Dirt Trackin 2", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image117.svg" },
        { title: "Madalin Stunt Cars 2", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image118.svg" },
        { title: "Mini Motor Racing", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image119.svg" },
        { title: "Burnout Paradise Remastered", rating: "4.3", installed: false, tags: ["Multijugador"], image: "/image120.svg" },
        { title: "PBA Bowling Challenge", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image121.svg" },
        { title: "Need for Speed Most Wanted", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image122.svg" },
        { title: "Horizon Chase", rating: "4.2", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image123.svg" },
        { title: "Rally Fury", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image124.svg" },
    ],
    
    // 24 Juegos de Deportes
    "Deportes": [
        { title: "EA Sports FC Mobile", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image125.svg" },
        { title: "NBA 2K Mobile", rating: "4.5", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image126.svg" },
        { title: "MLB The Show Mobile", rating: "4.8", installed: false, tags: ["Multijugador", "Sin compras adicionales"], image: "/image127.svg" },
        { title: "WWE Champions", rating: "4.0", installed: true, tags: ["Un jugador"], image: "/image128.svg" },
        { title: "PGA TOUR Golf Shootout", rating: "4.4", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image129.svg" },
        { title: "Skate City", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image130.svg" },
        { title: "Real Boxing 2", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image131.svg" },
        { title: "Volley Raw", rating: "4.4", installed: true, tags: ["Multijugador"], image: "/image132.svg" },
        { title: "Madden NFL 24 Mobile", rating: "4.2", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image133.svg" },
        { title: "Flippy Knife", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image134.svg" },
        { title: "8 Ball Pool", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image135.svg" },
        { title: "World Cricket Championship 3", rating: "4.3", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image136.svg" },
        { title: "FIFA Soccer", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image137.svg" },
        { title: "WBSC eBaseball: Power Pros", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image138.svg" },
        { title: "Top Eleven 2024", rating: "4.3", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image139.svg" },
        { title: "Dream League Soccer 2024", rating: "4.8", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image140.svg" },
        { title: "Rocket League Sideswipe", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image141.svg" },
        { title: "FRAG Pro Shooter", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image142.svg" },
        { title: "Archery King", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image143.svg" },
        { title: "Tennis Clash: 3D Sports", rating: "4.3", installed: false, tags: ["Multijugador"], image: "/image144.svg" },
        { title: "Head Ball 2", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image145.svg" },
        { title: "Ultimate Fighting Game", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image146.svg" },
        { title: "Fishing Clash", rating: "4.2", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image147.svg" },
        { title: "NBA NOW 24", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image148.svg" },
    ],

    // 24 Juegos de Educativos
    "Educativos": [
        { title: "Duolingo", rating: "4.7", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image149.svg" },
        { title: "Kahoot!", rating: "4.5", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image150.svg" },
        { title: "Photomath", rating: "4.8", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image151.svg" },
        { title: "Procreate Pocket (Art)", rating: "4.0", installed: false, tags: ["Un jugador"], image: "/image152.svg" },
        { title: "Codecademy Go", rating: "4.4", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image153.svg" },
        { title: "Solar System Scope", rating: "4.3", installed: false, tags: ["Un jugador"], image: "/image154.svg" },
        { title: "Brainly", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image155.svg" },
        { title: "Tinycards by Duolingo", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image156.svg" },
        { title: "Simply Piano", rating: "4.2", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image157.svg" },
        { title: "Elevate - Brain Training", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image158.svg" },
        { title: "NASA App", rating: "4.7", installed: true, tags: ["Un jugador"], image: "/image159.svg" },
        { title: "Lumosity", rating: "4.3", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image160.svg" },
        { title: "Memrise", rating: "4.7", installed: false, tags: ["Un jugador"], image: "/image161.svg" },
        { title: "Khan Academy", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image162.svg" },
        { title: "Quizlet", rating: "4.3", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image163.svg" },
        { title: "Geomerty Dash", rating: "4.8", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image164.svg" },
        { title: "Coursera", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image165.svg" },
        { title: "Word Connect", rating: "4.2", installed: true, tags: ["Un jugador"], image: "/image166.svg" },
        { title: "Star Walk 2", rating: "4.6", installed: false, tags: ["Un jugador"], image: "/image167.svg" },
        { title: "Rosetta Stone", rating: "4.3", installed: true, tags: ["Un jugador"], image: "/image168.svg" },
        { title: "Peak - Brain Games", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image169.svg" },
        { title: "Drops: Language Learning", rating: "4.7", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image170.svg" },
        { title: "Wikipedia", rating: "4.2", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image171.svg" },
        { title: "Endless Reader", rating: "4.5", installed: true, tags: ["Un jugador"], image: "/image172.svg" },
    ],
    
    // 24 Juegos de Estrategia
    "Estrategia": [
        { title: "Clash of Clans", rating: "4.9", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image30.svg" },
        { title: "Clash Royale", rating: "4.6", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image27.svg" },
        { title: "League of Legends: Wild Rift", rating: "4.5", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image173.svg" },
        { title: "Mobile Legends: Bang Bang", rating: "4.2", installed: true, tags: ["Multijugador"], image: "/image11.svg" },
        { title: "Hearthstone", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image174.svg" },
        { title: "Brawlhalla", rating: "4.1", installed: true, tags: ["Un jugador"], image: "/image175.svg" },
        { title: "The Battle of Polytopia", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image176.svg" },
        { title: "Teamfight Tactics (TFT)", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image177.svg" },
        { title: "Arknights", rating: "4.5", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image32.svg" },
        { title: "Rise of Kingdoms", rating: "4.8", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image178.svg" },
        { title: "Star Wars: Galaxy of Heroes", rating: "4.0", installed: false, tags: ["Un jugador"], image: "/image179.svg" },
        { title: "Bad North", rating: "4.6", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image180.svg" },
        { title: "XCOM 2 Collection", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image181.svg" },
        { title: "Bloons TD 6", rating: "4.2", installed: true, tags: ["Un jugador"], image: "/image182.svg" },
        { title: "Age of Empires Mobile", rating: "4.7", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image183.svg" },
        { title: "Plague Inc.", rating: "4.4", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image184.svg" },
        { title: "Boom Beach", rating: "4.3", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image185.svg" },
        { title: "Dota Underlords", rating: "4.5", installed: false, tags: ["Un jugador"], image: "/image186.svg" },
        { title: "Langrisser Mobile", rating: "4.8", installed: true, tags: ["Multijugador"], image: "/image187.svg" },
        { title: "Northgard", rating: "4.1", installed: false, tags: ["Multijugador"], image: "/image188.svg" },
        { title: "Command & Conquer: Rivals", rating: "4.6", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image189.svg" },
        { title: "Iron Marines Invasion", rating: "4.3", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image190.svg" },
        { title: "Slay the Spire", rating: "4.5", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image191.svg" },
        { title: "Auto Chess", rating: "4.2", installed: false, tags: ["Multijugador"], image: "/image192.svg" },
    ],

    // 24 Juegos de Simulación
    "Simulación": [
        { title: "The Sims Mobile", rating: "4.8", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image193.svg" },
        { title: "Farming Simulator 23", rating: "4.5", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image194.svg" },
        { title: "Airport City", rating: "4.4", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image195.svg" },
        { title: "Euro Truck Simulator 2", rating: "4.0", installed: true, tags: ["Un jugador"], image: "/image196.svg" },
        { title: "Stardew Valley", rating: "4.7", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image197.svg" },
        { title: "Animal Crossing: Pocket Camp", rating: "4.3", installed: true, tags: ["Un jugador"], image: "/image198.svg" },
        { title: "RollerCoaster Tycoon Touch", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image199.svg" },
        { title: "BitLife - Life Simulator", rating: "4.5", installed: true, tags: ["Un jugador"], image: "/image200.svg" },
        { title: "Pocket City 2", rating: "4.6", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image201.svg" },
        { title: "AdVenture Capitalist", rating: "4.1", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image202.svg" },
        { title: "Goat Simulator 3", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image203.svg" },
        { title: "House Flipper: Home Design", rating: "4.7", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image204.svg" },
        { title: "Jurassic World Alive", rating: "4.3", installed: false, tags: ["Un jugador"], image: "/image205.svg" },
        { title: "Planes Live", rating: "4.5", installed: true, tags: ["Un jugador"], image: "/image206.svg" },
        { title: "Project Hospital", rating: "4.8", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image207.svg" },
        { title: "Fallout Shelter", rating: "4.0", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image208.svg" },
        { title: "Cooking Fever", rating: "4.6", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image209.svg" },
        { title: "Idle Miner Tycoon", rating: "4.2", installed: true, tags: ["Un jugador"], image: "/image210.svg" },
        { title: "Home Design Makeover", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image211.svg" },
        { title: "My Singing Monsters", rating: "4.7", installed: true, tags: ["Un jugador"], image: "/image212.svg" },
        { title: "Car Driving School Sim", rating: "4.3", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image213.svg" },
        { title: "PC Building Simulator", rating: "4.5", installed: true, tags: ["Un jugador", "Optimizados para PC"], image: "/image214.svg" },
        { title: "X-Plane 12 Flight Simulator", rating: "4.8", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image215.svg" },
        { title: "Universe Sandbox 2", rating: "4.1", installed: true, tags: ["Un jugador"], image: "/image216.svg" },
    ],

    // 24 Juegos de Juegos de rol (RPG)
    "Juegos de rol": [
        { title: "Diablo Immortal", rating: "4.9", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image217.svg" },
        { title: "Raid: Shadow Legends", rating: "4.5", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image218.svg" },
        { title: "AFK Arena", rating: "4.8", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image219.svg" },
        { title: "Honkai: Star Rail", rating: "4.0", installed: true, tags: ["Multijugador"], image: "/image220.svg" },
        { title: "Summoners War", rating: "4.4", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image221.svg" },
        { title: "The Elder Scrolls Online", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image222.svg" },
        { title: "Final Fantasy VII: Ever Crisis", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image223.svg" },
        { title: "Ni no Kuni: Cross Worlds", rating: "4.4", installed: true, tags: ["Multijugador"], image: "/image224.svg" },
        { title: "EVE Echoes", rating: "4.2", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image225.svg" },
        { title: "CookieRun: Kingdom", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image34.svg" },
        { title: "Star Trek Fleet Command", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image226.svg" },
        { title: "Fate/Grand Order", rating: "4.3", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image227.svg" },
        { title: "Dragon Quest Builders", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image228.svg" },
        { title: "Lineage 2 Revolution", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image229.svg" },
        { title: "Tower of Fantasy", rating: "4.3", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image230.svg" },
        { title: "Blade & Soul Revolution", rating: "4.8", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image231.svg" },
        { title: "Marvel Realm of Champions", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image232.svg" },
        { title: "Axie Infinity", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image233.svg" },
        { title: "Dislyte", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image234.svg" },
        { title: "Alchemy Stars", rating: "4.3", installed: false, tags: ["Multijugador"], image: "/image235.svg" },
        { title: "Epic Seven", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image31.svg" },
        { title: "Pillars of Eternity", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image236.svg" },
        { title: "The Witcher: Monster Slayer", rating: "4.2", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image237.svg" },
        { title: "Runescape Mobile", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image238.svg" },
    ],
};

// --- GENERACIÓN DEL CONJUNTO DE DATOS FINAL (8 categorías x 24 juegos = 192 JUEGOS TEMÁTICOS) ---
const ALL_GAMES = [];

GAME_GENRE_CATEGORIES.forEach(category => {
    CATEGORY_SPECIFIC_GAMES[category].forEach((gameData, index) => {
        const newGame = {
            id: `${category}-${index}`, 
            title: gameData.title,
            rating: gameData.rating,
            installed: gameData.installed,
            tags: gameData.tags,
            image: gameData.image,
            // La categoría es la clave de filtrado
            category: category, 
        };
        ALL_GAMES.push(newGame);
    });
});

const getGameImagePath = (title, imagePath) => imagePath || PLACEHOLDER_IMG;


// --- COMPONENTES AUXILIARES ---

// MODIFICACIÓN: StarIcon con color naranja predeterminado
const StarIcon = ({ className = '', fill = '#ff9900' }) => (
    <svg className={`w-3 h-3 ${className}`} fill={fill} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9.5l-8 8z"/></svg>
);

const GameCard = ({ game }) => {
    // Usamos game.image directamente ya que el título es dinámico.
    const gameImagePath = getGameImagePath(game.title, game.image); 

    return (
        <div className="rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200 shadow-xl bg-gray-900/50 relative">
            <div className="relative w-full aspect-[4/3]"> 
                <img 
                    src={gameImagePath} 
                    alt={`Carátula de ${game.title}`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                />
            </div>
            {/* Contenedor del texto debajo de la imagen */}
            <div className="p-3 text-white">
                <h3 className="text-base font-semibold truncate">{game.title}</h3>
                {/* Se muestra el rating y la categoría */}
                <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                    {game.rating} 
                    <StarIcon className="ml-1" />
                    <span className="mx-1">|</span>
                    {/* Muestra la categoría del juego */}
                    <span className="text-gray-300 font-medium">{game.category}</span>
                </p>
            </div>
            {/* INDICADOR DE INSTALADO (Green Checkmark) */}
            {game.installed && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <CheckIcon />
                </div>
            )}
        </div>
    );
};


// --- COMPONENTES DE FILTRO (Sin cambios en lógica/estilo) ---
const ActiveFilterCloseButton = ({ onRemove, className = '' }) => {
    return (
        <div 
            // Se usa el mismo estilo del componente de filtro, pero sin etiqueta, simulando un botón "Limpiar Todo"
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-red-600 
                        transition-colors duration-200 cursor-pointer hover:bg-red-700 ${className}`}
            onClick={(e) => { e.stopPropagation(); onRemove(); }} // Llama a onRemove sin argumento para limpiar todo
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
    );
};

const FilterButton = ({ label, isActive, isGroupStart, isGroupEnd, onClick }) => { 
    
    const baseStyle = `
        flex items-center px-6 py-2 text-sm font-semibold whitespace-nowrap 
        transition-colors duration-200 cursor-pointer 
        relative
    `;

    const activeColors = 'bg-red-600 hover:bg-red-700 text-white border-none';
    const inactiveColors = 'bg-[#1F2123] text-white'; 

    const colorClasses = isActive ? activeColors : inactiveColors;
    
    let borderColor = '#991b1b'; 
    if (!isActive) {
        borderColor = '#dc2626'; 
    }

    const dynamicStyle = {
        border: isActive ? 'none' : `1px solid ${borderColor}`,
        borderRadius: '9999px',
        borderLeft: !isActive && !isGroupStart ? 'none' : `1px solid ${borderColor}`,
        marginLeft: !isActive && !isGroupStart ? '-1px' : '0',
        
        transform: 'translateZ(0)', 
        
        boxShadow: isActive 
            ? 'none' 
            : '0 0 4px rgba(220, 38, 38, 0.8)', 
    };
    
    if (!isActive) {
        dynamicStyle.borderRadius = (isGroupStart && isGroupEnd) ? '9999px' : 
                                     isGroupStart ? '9999px 0 0 9999px' : 
                                     isGroupEnd ? '0 9999px 9999px 0' : 
                                     '0';
    }

    const hasStarInLabel = label.includes('★'); 
    const textWithoutStar = hasStarInLabel ? label.replace('★', '').trim() : label;


    return (
        <div 
            className={`${baseStyle} ${colorClasses} flex items-center group
            ${!isActive ? 'opacity-70 group-hover:opacity-100' : ''}
            `}
            style={dynamicStyle}
            onClick={() => { onClick(label); }}
        >
            {/* SPAN para el texto (primero) */}
            <span className={!isActive ? 'hover:text-[#A0A0A0] transition-colors duration-200' : ''}>
                {textWithoutStar} 
            </span>

            {/* ICONO DE ESTRELLA CONDICIONAL (después del texto) */}
            {hasStarInLabel && (
                <StarIcon className="ml-1" fill="#ff9900" />
            )}
            
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE BÚSQUEDA/EXPLORACIÓN ---
const Search = () => {
    
    // 3. Definición de filtros (Grupos para la lógica)
    const filterGroupsDefinition = {
        // FILTROS DE CATEGORÍA DE GÉNERO (Lógica OR - Acumulativa)
        genre: GAME_GENRE_CATEGORIES,
        
        // OTROS FILTROS (Lógica aplicada individualmente)
        rating: ["4 ★", "4.2 ★", "4.5 ★", "4.7 ★"], 
        monetization: ["Sin anuncios", "Sin compras adicionales"], 
        players: ["Un jugador", "Multijugador"],
        system: ["Optimizados para PC", "Lo mejor para esta PC"],
        status: ["Ocultar no probados"], 
    };
    
    // 4. Definición del orden de los grupos para el renderizado (basado en la imagen)
    const filterGroupsRenderDefinition = [
        filterGroupsDefinition.status[0],
        filterGroupsDefinition.genre,
        filterGroupsDefinition.rating,
        filterGroupsDefinition.monetization[0],
        filterGroupsDefinition.monetization[1],
        filterGroupsDefinition.players,
        filterGroupsDefinition.system[0],
        filterGroupsDefinition.system[1]
    ];
    
    const initialActiveFilters = ["Ocultar no probados"]; 
    const [activeFilters, setActiveFilters] = useState(initialActiveFilters);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    const removeFilter = (filter) => {
        setActiveFilters(activeFilters.filter(f => f !== filter));
    };
    
    const toggleFilter = (filter) => {
        if (activeFilters.includes(filter)) {
            removeFilter(filter);
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };
    
    // Función para limpiar todos los filtros
    const clearAllFilters = () => { setActiveFilters([]); };

    // --- LÓGICA DE FILTRADO DINÁMICO Y ACUMULATIVO (useMemo) ---
    const getFilteredGames = useMemo(() => {
        // 1. Pre-filtrado por Categoría de Género (Lógica OR - Acumulativa)
        const genreFilters = activeFilters.filter(f => filterGroupsDefinition.genre.includes(f));
        const nonGenreFilters = activeFilters.filter(f => !filterGroupsDefinition.genre.includes(f));
        
        let filteredByGenre = ALL_GAMES;
        
        // FILTRO DE GÉNERO: Si se seleccionó algún género, filtrar estrictamente.
        if (genreFilters.length > 0) {
            filteredByGenre = ALL_GAMES.filter(game => 
                genreFilters.includes(game.category)
            );
        }

        // 2. Aplicar los demás filtros (Tags, Status, Rating)
        let finalFilteredGames = filteredByGenre.filter(game => {
            
            // a. Filtro "Ocultar no probados" (AND lógico)
            if (activeFilters.includes("Ocultar no probados") && !game.installed) {
                return false;
            }

            // b. Filtros de Rating (AND lógico: Aplicar el rating MÁS restrictivo (el más alto))
            const activeRatingFilters = nonGenreFilters
                .filter(f => filterGroupsDefinition.rating.includes(f))
                .map(f => parseFloat(f.split(' ')[0])); 

            if (activeRatingFilters.length > 0) {
                const requiredRating = Math.max(...activeRatingFilters); 
                const gameRating = parseFloat(game.rating);
                if (gameRating < requiredRating) {
                    return false;
                }
            }


            // c. Otros filtros de Tags (Monetización, Jugadores, Sistema)
            const tagFilters = nonGenreFilters.filter(f => 
                filterGroupsDefinition.monetization.includes(f) || 
                filterGroupsDefinition.players.includes(f) ||
                filterGroupsDefinition.system.includes(f)
            );

            if (tagFilters.length > 0) {
                // Aplicamos lógica OR a los tags: el juego debe tener AL MENOS UNO de los tags activos.
                const gameTags = game.tags || [];
                const hasAnyTag = tagFilters.some(requiredTag => gameTags.includes(requiredTag));
                
                if (!hasAnyTag) {
                    return false;
                }
            }
            
            return true;
        });

        // 🚨 LÓGICA DE RESPALDO (FALLBACK) CRÍTICA: Garantiza que la cuadrícula nunca esté vacía.
        // Si el resultado es cero después de aplicar TODOS los filtros, relaja los filtros restrictivos
        if (finalFilteredGames.length === 0 && activeFilters.length > 0) {
             // Retorna solo los juegos filtrados por Género (o todos si no hay filtros de género).
            return filteredByGenre; 
        }

        return finalFilteredGames;

    }, [activeFilters]); 

    // Función para renderizar los grupos de filtros
    const renderFilterButtons = () => {
        let activeElements = []; 
        let inactiveElements = []; 
        
        
        // Botón "X" global (Limpiar Todo)
        // Se activa si hay CUALQUIER filtro activo.
        if (activeFilters.length > 0) {
            activeElements.push(
                // Ajuste de margen para pegarlo al primer filtro activo
                <div key="global-clear-button" className="flex mr-1 items-center"> 
                    <ActiveFilterCloseButton onRemove={clearAllFilters} className="" />
                </div>
            );
        }

        // Renderizamos los filtros activos (botones rojos) después del botón "Limpiar Todo"
        const renderedActiveLabels = new Set();
        
        activeFilters.forEach((label) => {
            if (!renderedActiveLabels.has(label)) {
                 activeElements.push(
                    <div key={`active-label-${label}`} className="flex mr-3 items-center">
                        <FilterButton 
                            label={label} 
                            isActive={true}
                            isGroupStart={true}
                            isGroupEnd={true} 
                            onClick={toggleFilter}
                        />
                    </div>
                );
                renderedActiveLabels.add(label);
            }
        });
        
        // Luego, renderizamos los filtros inactivos (botones grises)
        filterGroupsRenderDefinition.forEach((groupOrFilter) => {
            
            const members = Array.isArray(groupOrFilter) ? groupOrFilter : [groupOrFilter];
            const isActiveGroup = members.some(label => activeFilters.includes(label));
            
            if (!isActiveGroup) {
                
                if (Array.isArray(groupOrFilter)) {
                    // Renderizar grupo de botones
                    const groupKey = members.join('-'); 

                    const groupElements = members.map((label, index) => { 
                        if (!activeFilters.includes(label)) {
                            return (
                                <FilterButton
                                    key={label} 
                                    label={label}
                                    isActive={false}
                                    isGroupStart={index === 0}
                                    isGroupEnd={index === members.length - 1}
                                    onClick={toggleFilter}
                                />
                            );
                        }
                        return null;
                    }).filter(Boolean); 

                    if(groupElements.length > 0) {
                        inactiveElements.push(
                            <div 
                                key={groupKey} 
                                className="flex mr-3 group" 
                            >
                                {groupElements}
                            </div>
                        );
                    }
                } else if (typeof groupOrFilter === 'string' && !activeFilters.includes(groupOrFilter)) {
                    // Renderizar botón individual (si no está activo)
                    inactiveElements.push(
                        <div 
                            key={groupOrFilter} 
                            className="flex mr-3 group" 
                        >
                            <FilterButton 
                                label={groupOrFilter} 
                                isActive={false}
                                isGroupStart={true}
                                isGroupEnd={true}
                                onClick={toggleFilter}
                            />
                        </div>
                    );
                }
            }
        });

        return [...activeElements, ...inactiveElements];
    };


    return (
        <div className="p-6 pt-8 bg-[#111] min-h-screen"> 
            
            {/* BARRA SUPERIOR: TÍTULO y BUSCADOR INTEGRADO */}
            <div className="flex justify-between items-center mb-10"> 
                <h1 className="text-5xl font-extrabold text-white -mt-4">Explorar</h1>
                
                {/* BUSCADOR */}
                <div 
                    className={`relative flex items-center rounded-full transition-all duration-200 
                                w-80                            
                                ${isSearchFocused 
                                    ? 'bg-red-600 border border-white shadow-red-glow' 
                                    : 'bg-transparent border border-red-700 hover:border-red-500 shadow-red-sm'}` 
                                }
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    tabIndex="0" 
                    style={{ 
                        boxShadow: isSearchFocused ? '0 0 8px rgba(220, 38, 38, 0.8)' : '0 0 4px rgba(220, 38, 38, 0.4)' 
                    }}
                >
                    {/* Icono de búsqueda */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-5 h-5 absolute left-3 transition-colors duration-200 
                                    ${isSearchFocused ? 'text-white' : 'text-gray-400'}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    
                    {/* Input de búsqueda */}
                    <input 
                        type="text" 
                        placeholder="Buscar"
                        className={`bg-transparent pl-10 pr-4 py-2 rounded-full border-none 
                                     focus:outline-none text-base w-full                            
                                    ${isSearchFocused 
                                        ? 'text-white placeholder-white' 
                                        : 'text-white placeholder-gray-400'}`
                                    }
                    />
                </div>
            </div>
            
            {/* BARRA DE FILTROS SELECCIONABLES Y ACTIVOS */}
            <div className="flex space-x-3 mb-8 flex-wrap gap-y-4 pb-2"> 
                
                {renderFilterButtons()}
            </div>


            {/* SECCIÓN DE JUEGOS PRINCIPAL */}
            
            {/* CUADRÍCULA DE JUEGOS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pt-2">
                {getFilteredGames.map((game) => (
                    <GameCard 
                        key={game.id} // Usamos la nueva ID única
                        game={game} 
                    />
                ))}
            </div>
            
            {/* Mensaje si no hay juegos */}
            {getFilteredGames.length === 0 && (
                <div className="text-center p-20 text-gray-400 text-xl font-semibold">
                    No se encontraron juegos que coincidan con los filtros seleccionados.
                </div>
            )}
            
            <div className="h-10"></div>
        </div>
    );
};

export default Search;