import { Injectable } from '@angular/core';
import { Player } from '../data/player.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public players: Player[] = [
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Alex',
      alias: 'Alex',
      scores: {
        billo: 12,
        elo: 12,
        glicko: 12,
      },
    },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Markus',
      alias: 'Alex',
      scores: {
        billo: 1,
        elo: 1,
        glicko: 1,
      },
    },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Thomas',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
      },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Thomas',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
      },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Thomas',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
      },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Thomas',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
      },
    {
      games: [],
      id: '222',
      lost: 0,
      won: 1,
      name: 'Thomas',
      alias: 'Alex',
      scores: {
        billo: 25,
        elo: 25,
        glicko: 25,
      },
    },
  ];
}
