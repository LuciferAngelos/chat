//variable for main root because of GHP deploy. 
//Probably needs to be switched to '/'
export const mainRoot = '/chat'

export const getWayWebSocket = "wss://getway.dev.viexpo.ru/service/getway";


export const CONST_X_VIEXPO_INTERNAL_TOKEN = 'x-viexpo-internal-token-test'
export const CONST_X_VIEXPO_SESSION_TOKEN_BODY = 'x-viexpo-session-token'

export const ToGetway_FromUnknown_AuthSocket = 0;
export const FromGetway_AuthSocket_Response = 1;
export const ToGetway_FromInternal_GetUser = 2;
export const ToGetway_FromInternal_GetUserFromSession = 3;
export const FromGetway_ToInternal_GetUserResponse = 4;
export const ToGetway_FromPlayer_GetMovementServer = 5;
export const FromGetway_FromPlayer_GetMovementServerResponse = 6;
export const ToGetway_FromPlayer_GetSoundServer = 7;
export const FromGetway_FromPlayer_GetSoundServerResponse = 8;


export const ToMovement_ToPlayerScene_PlayerTick = 9991;
export const FromMovement_FromPlayerScene_PlayerJoin = 9992;
export const FromMovement_FromPlayerScene_PlayerLeave = 9993;
export const FromMovement_FromPlayerScene_PlayerList = 9994;
export const FromMovement_FromPlayerScene_PlayerPosition = 9995;
export const FromSound_FromPlayerScene_PlayerVoice = 9996;

export const timeInterval = 1000;

