// no detecta la variable en el otro archivo

function MatchFilter(data, Minduration, leaver, ranked) {
  let newArr = [];
  
  if (ranked == `all`){
    for (x of data) {
      if (
        x.duration > Minduration &&
        x.leaver_status == leaver
        )
      {
        newArr.push(x)
      }
    }
  }

  else {
    for (x of data) {
      if (
        x.duration > Minduration &&
        x.leaver_status == leaver &&
        x.lobby_type == ranked
        )
      {
        newArr.push(x)
      }
    }
  }
  return newArr
}

function winORlose(data){
  
  if (data.player_slot < 128 && data.radiant_win == 1){
    return true
  }
  else if (data.player_slot >= 128 && data.radiant_win == 0){
    return true
  }
  else {
    return false
  }
}

function WinAndLose(data){
    let sumLoses = 0
    let sumWin = 0
    
    for (x of data){
      winORlose(x) ? sumWin++ : sumLoses++
    }

    let result = [sumLoses, sumWin]
    return result
}

function UserHeroList(data, heros){

 

  let simpleArr = []

  for (x of data){
    simpleArr.push(x.hero_id)
  }

  const counts = [];

  let totalHeroInfo = []

  simpleArr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

  for (let i = 0; i < counts.length; i++) {
    for (y of heros){
      if (y.id == i){
        totalHeroInfo.push({
          "id": i,
          "count": counts[i] ? counts[i]: 0,
          "name": y.localized_name,
          "roles": y.roles,
          "img": `${baseDota}${y.img}`,
          "winCount": "",
          "winrate": "",
          "kills": "",
          "deaths": "",
          "assists": "",
          "kda": "",
          "doom": ""

        })
      }
    }
  }
 

  for (x of totalHeroInfo){
    
    let wins = 0
    let kills = 0
    let deaths = 0
    let assists = 0
    
    for (y of data){
      if (y.hero_id == x.id) {
        if (winORlose(y)){
          wins ++
        }
        
        kills += y.kills
        deaths += y.deaths
        assists += y.assists
      }
    }
    x.winCount = wins
    x.winrate = wins / x.count
    x.kills = kills
    x.deaths = deaths
    x.assists = assists
    x.kda = kda(kills, deaths, assists)
    x.doom = x.kda / x.winrate

  }


  return totalHeroInfo
}
  
function total(data, kda, mode) {

  let win = WinAndLose(data)[1]
  let lose = WinAndLose(data)[0]
 
  tot_user_match.innerHTML = `Total Matchs:  ` + data.length;
  tot_user_win.innerHTML = `Total Wins: ` + win;
  tot_user_lose.innerHTML = `Total Loses: ${lose} ` ;
  tot_user_wr.innerHTML =
    `Total Winrate: ` +
    ((win / (win + lose)) * 100).toFixed(2) + `%`
  
    kda_ratio.innerHTML = `KDA ratio Average*: ${kda}`
}


// ============= KDA RATIO ==========
function kda(k, d, a) {
  return (k + a) / (1 + d);
}

function kdaRatio(history, F_date, ranked) {
  let kdaH = [];

  for (x of history) {
    kdaH.push({
      id: x.match_id,
      kda: kda(x.kills, x.assists, x.deaths),
      hero: x.hero_id,
    });
  }
  return JSON.stringify(kdaH);
}

function kdaRatioAvg(kda_tot) {
  let sum = Number(0);

  for (x of kda_tot) {
    sum = sum + Number(x.kda);
  }

  let sum2 = (sum / kda_tot.length).toFixed(4);
  return Number(sum2);
}


/* function SpliteArr(chunk, arr) {
  let result = [];
  while (arr.length > 0) {
    let tempArray;
    tempArray = arr.splice(0, chunk);
    result.push(tempArray);
  }
  return result;
}

function movingAvg(data) {
  let avg_moving = [];
  for (x of data) {
    avg_moving.push(kdaRatioAvg(x));
  }
  return avg_moving;
} */

document.addEventListener("DOMContentLoaded", async function (e) {
  
  let nameUsr = (await getJSONData(`${baseURL}/players/${user}`)).data;
  let newHeroList = (await getJSONData(`${heroList}`)).data
  let rawData = (await getJSONData(matchHistory)).data;
                                        //secs, quit?, type (7 = ranked, 0 = normi)
  let dataFiltered = MatchFilter(rawData,600, 0, `all`);
  

  // Get KDA RATIO 
  let kdaR = kdaRatio(dataFiltered);
  let kdaRAvg = kdaRatioAvg(JSON.parse(kdaR));

  UserHeroList(rawData, newHeroList)

  total(dataFiltered, kdaRAvg);
  UserNme(nameUsr);

  filter_btm.onclick = function(){
    document.getElementById("mainDIV").classList.add("hidden")
    
  }


 
  showTop3(UserHeroList(dataFiltered, newHeroList), `winrate`, 1)

 


});
