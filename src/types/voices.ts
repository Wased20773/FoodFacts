export type VoiceName =
    | 'Microsoft David - English (United States)'
    | 'Microsoft Mark - English (United States)'
    | 'Microsoft Zira - English (United States)'
    | 'Google Deutsch'
    | 'Google US English'
    | 'Google UK English Female'
    | 'Google UK English Male'
    | 'Google español'
    | 'Google español de Estados Unidos'
    | 'Google français'
    | 'Google हिन्दी'
    | 'Google Bahasa Indonesia'
    | 'Google italiano'
    | 'Google 日本語'
    | 'Google 한국의'
    | 'Google Nederlands'
    | 'Google polski'
    | 'Google português do Brasil'
    | 'Google русский'
    | 'Google 普通话（中国大陆）'
    | 'Google 粤語（香港）'
    | 'Google 國語（臺灣）';

export type VoiceLanguage =
    | 'en-US'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-US'
    | 'fr-FR'
    | 'hi-IN'
    | 'id-ID'
    | 'it-IT'
    | 'ja-JP'
    | 'ko-KR'
    | 'nl-NL'
    | 'pl-PL'
    | 'pt-BR'
    | 'ru-RU'
    | 'zh-CN'
    | 'zh-HK'
    | 'zh-TW';

export type Voice = {
    name: VoiceName;
    language: VoiceLanguage;
};