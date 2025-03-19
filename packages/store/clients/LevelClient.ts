import axios from 'axios';
import {ILevel} from '../data-structures';

const url: string = 'https://sudoku.garik.am/levels';
// const url: string = 'http://localhost:5000/Levels';

export class LevelClient {
  static async getAll(): Promise<ILevel[]> {
    const response = await axios.get<ILevel[]>(url);

    return response.data;
  }

  static async get(id: string): Promise<ILevel> {
    const response = await axios.get<ILevel>(`${url}/${id}`);

    return response.data;
  }
}
