// dataAPI

const renk = "98913248";
const me = "64921863";
const barrio = "80326514";
const neon = "53912164";
const colo = "163395256";
const loco = "71567093";
const dendi = '70388657'

let user = loco;

const baseURL = "https://api.opendota.com/api";
const baseDota = "https://cdn.cloudflare.steamstatic.com";
const heroList = "https://api.opendota.com/api/heroStats";
const matchHistory = `https://api.opendota.com/api/players/${user}/matches`;


let getJSONData = function (url) {
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};