import { ISong } from "./songs.interface";

export interface IPlaylist {
    id: string;
    city: string;
    temperature: number;
    category: string;
    songs: ISong[];
    createdAt: Date
}