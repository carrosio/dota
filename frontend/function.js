// dash hero wr / name

let h0_Wr, h1_Wr, h2_Wr, h0_name, h1_name, h2_name;

h0_Wr = document.getElementById("h0_Wr");
h1_Wr = document.getElementById("h1_Wr");
h2_Wr = document.getElementById("h2_Wr");

h0_name = document.getElementById("h0_name");
h1_name = document.getElementById("h1_name");
h2_name = document.getElementById("h2_name");

// dash user stats general

let user_name_main, tot_user_win, tot_user_lose, tot_user_wr, tot_user_match;

user_name_main = document.getElementById("user_name_main");
tot_user_win = document.getElementById("tot_user_win");
tot_user_lose = document.getElementById("tot_user_lose");
tot_user_wr = document.getElementById("tot_user_wr");
tot_user_match = document.getElementById("tot_user_match");
users_play = document.getElementById("players")


function WinAndLose(data){
    let sumLoses = 0
    let sumWin = 0
    for (x of data){
      if (x.player_slot < 128 && x.radiant_win == 1){
        sumWin ++
      }
      else if (x.player_slot >= 128 && x.radiant_win == 0){
        sumWin ++
      }
      else {
        sumLoses ++
      }
    }
    let result = [sumLoses, sumWin]
    return result
}

function MatchFilter(data, Minduration, leaver, ranked) {
  let newArr = [];
  
  for (x of data) {
    if (
      x.duration > 600 &&
      x.leaver_status == 0 &&
      x.lobby_type == 7
      )
    {
      newArr.push(x)
    }
  }
  return newArr
}


function UserNme(data) {
  user_name_main.innerHTML = data.profile.personaname;
}



function heroStats(data){


}

function total(data, kda, mode) {

  let win = WinAndLose(data)[1]
  let lose = WinAndLose(data)[0]
 
  tot_user_match.innerHTML = `Total Matchs: ` + data.length;
  tot_user_win.innerHTML = `Total Wins: ` + win;
  tot_user_lose.innerHTML = `Total Loses: ` + lose;
  tot_user_wr.innerHTML =
    `Total Winrate: ` +
    ((win / (win + lose)) * 100).toFixed(2) +
    ` % KDA avg: ${kda}`;
}


function kdaRatio(history, F_date, ranked) {
  let kdaH = [];

  function kda(k, d, a) {
    return (k + a) / (1 + d);
  }

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

function SpliteArr(chunk, arr) {
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
}

document.addEventListener("DOMContentLoaded", async function (e) {
  let nameUsr = (await getJSONData(`${baseURL}/players/${user}`)).data;
  
  let rawData = (await getJSONData(matchHistory)).data;
  let dataFiltered = MatchFilter(rawData);
  console.log(dataFiltered[0])


  // Get KDA RATIO 
  let kdaR = kdaRatio(dataFiltered);
  let kdaRAvg = kdaRatioAvg(JSON.parse(kdaR));

  console.log(SpliteArr(100,JSON.parse(kdaR)))

  total(dataFiltered, kdaRAvg);
  UserNme(nameUsr);
 


});
