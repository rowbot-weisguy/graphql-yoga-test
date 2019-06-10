import request from 'request-promise';

const STEAM_API_KEY = '340EDA01A4C6CF50B4E44ED5277B830D';

const defaultOptions = {
  qs: {
    format: 'json',
    key: STEAM_API_KEY,
  },
  json: true,
};

export const getRecentMatches = async (number = 25) => {
  const options = {
    ...defaultOptions,
    qs: {
      ...defaultOptions.qs,
      matches_requested: number,
    },
    uri: 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/',
  };
  const response = await request(options);
  const matches = response.result.matches
    .map(match => ({ ...match, id: match.match_id }));
  return matches;
};

export const getAllHeroes = async () => {
  const options = {
    ...defaultOptions,
    uri: 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/',
  };
  const response = await request(options);
  const heroes = response.result.heroes;
  return heroes;
};
