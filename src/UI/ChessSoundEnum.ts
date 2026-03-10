export enum ChessSoundEnum {
    Move = "MOVE",
    Capture = "CAPTURE",
    Check = "CHECK"
}

export const SoundUrlsMap: Record<ChessSoundEnum, string> = {
    [ChessSoundEnum.Move]: "http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3",
    [ChessSoundEnum.Capture]: "http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3",
    [ChessSoundEnum.Check]: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3"
};

