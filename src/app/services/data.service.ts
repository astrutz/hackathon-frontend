import { Injectable } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public players: Player[] = [
    {
      games: [
        {
          id: '',
          players: ['1', '3'],
          score1: 4,
          score2: 1,
          timestamp: 0,
        },
        {
          id: '',
          players: ['1', '3'],
          score1: 0,
          score2: 1,
          timestamp: 0,
        },
      ],
      id: '1',
      lost: 0,
      won: 1,
      name: 'Peter Wackel',
      alias: 'Alex',
      scores: {
        billo: 12,
        elo: 12,
        glicko: 12,
      },
    },
    {
      games: [],
      id: '2',
      lost: 0,
      won: 1,
      name: 'Mallekalle',
      alias: 'Alex',
      scores: {
        billo: 1,
        elo: 1,
        glicko: 1,
      },
    },
    {
      games: [],
      id: '3',
      lost: 0,
      won: 1,
      name: 'Mia Julia',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
    {
      games: [],
      id: '4',
      lost: 0,
      won: 1,
      name: 'Almklausi',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
    {
      games: [],
      id: '5',
      lost: 0,
      won: 1,
      name: 'Mickie Krause',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
    {
      games: [],
      id: '6',
      lost: 0,
      won: 1,
      name: 'Ikke Hüftgold',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
    {
      games: [],
      id: '7',
      lost: 0,
      won: 1,
      name: 'Isi Glück',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
  ];

  public games: Game[] = [
    {
      id: '22',
      players: ['1', '2'],
      score1: 2,
      score2: 4,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3', '1', '5'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
    {
      id: '22',
      players: ['4', '3'],
      score1: 7,
      score2: 1,
      timestamp: 1729891282367,
    },
  ];

  public getPlayerById(id: string): Player | null {
    return this.players.find((player) => player.id === id) ?? null;
  }
}
