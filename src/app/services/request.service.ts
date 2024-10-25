import { Injectable } from '@angular/core';
import { Player } from '../data/player.data';
import axios from 'axios';
import { Game } from '../data/game.data';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  async getPlayers(): Promise<Player[]> {
    return (await axios.get('/players')).data;
  }

  async getPlayer(id: string): Promise<Player> {
    return (await axios.get(`/players/${id}`)).data;
  }

  async postPlayer(player: Player): Promise<Player> {
    return (await axios.post('/players', player)).data;
  }

  async putPlayer(id: string, player: Player): Promise<Player> {
    return (await axios.put(`/players/${id}`, player)).data;
  }

  async deletePlayer(id: string): Promise<void> {
    await axios.delete(`/players/${id}`);
  }

  async getGames(): Promise<Game[]> {
    return (await axios.get('/games')).data;
  }

  async getGame(id: string): Promise<Game> {
    return (await axios.get(`/games/${id}`)).data;
  }

  async postGame(game: Game): Promise<Game> {
    return (await axios.post('/games', game)).data;
  }

  async putGame(id: string, game: Game): Promise<Game> {
    return (await axios.put(`/games/${id}`, game)).data;
  }

  async deleteGame(id: string): Promise<void> {
    await axios.delete(`/games/${id}`);
  }
}
