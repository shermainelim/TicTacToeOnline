export interface Player {
    connected: boolean;
    id: string;
    name: string;
}

export type PlayerId = undefined | string;
export type LobbyId = string;
export type FieldTypes = null[] | string[];
export type Winner = null | 'x' | 'o';
export type WinnerColumns = [] | number[];

export interface GameState {
    lobbyId: undefined | string;
    playerId: PlayerId;
    turn: PlayerId;
    fieldTypes: any[];
    players: any[];
    gameLoaded: boolean;
    resetable: boolean;
}
