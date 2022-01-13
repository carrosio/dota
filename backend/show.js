function UserNme(data) {
    user_name_main.innerHTML = data.profile.personaname;
  }

  function showTop3(data, order, azZa){
    
    let dataFilteredByQty = []

    let h0_data, h1_data, h2_data 

    for (x of data){
      if (x.count > 25){
        dataFilteredByQty.push(x)
      }
    }

    // order
    let sortedData = dataFilteredByQty.sort(function (a, b){
      
      let or = 1
      
      if (order == `count`){
        if (a.count > b.count) {
          return -1 * or
        }
        if (a.count < b.count )  {
          return 1 * or
        }
        return 0
      }
      if (order == `winrate`){
        if (a.winrate > b.winrate) {
          return -1 * or
        }
        if (a.winrate < b.winrate )  {
          return 1 * or
        }
        return 0
      }
      if (order == `kda`){
  
        if (a.kda > b.kda) {
          return -1 * or
        }
        if (a.kda < b.kda )  {
          return 1 * or
        }
        return 0
      }
      if (order == `doom`){
  
        if (a.doom > b.doom) {
          return -1 * or
        }
        if (a.doom < b.doom )  {
          return 1 * or
        }
        return 0
      }
      
    })

    function txtInfo(){
      if (order == `count`){

      }
    }  
    
   


    
    kda_0.innerHTML = 'KDA: ' + (sortedData[2].kda).toFixed(2)
    kda_1.innerHTML = 'KDA: ' + (sortedData[0].kda).toFixed(2)
    kda_2.innerHTML = 'KDA: ' + (sortedData[1].kda).toFixed(2)


    h0_Wr.innerHTML = ` ${(Number(sortedData[2].winrate)*100).toFixed(2)}% `
    h1_Wr.innerHTML = ` ${(Number(sortedData[0].winrate)*100).toFixed(2)}%`
    h2_Wr.innerHTML = ` ${(Number(sortedData[1].winrate)*100).toFixed(2)}%`

    
    

    h0_name.innerHTML = sortedData[2].name
    h1_name.innerHTML = sortedData[0].name
    h2_name.innerHTML = sortedData[1].name  
  
    h0_pic.style.backgroundImage = `url("${sortedData[2].img}")`;
    h1_pic.style.backgroundImage = `url("${sortedData[0].img}")`;
    h2_pic.style.backgroundImage = `url("${sortedData[1].img}")`;
  }
  