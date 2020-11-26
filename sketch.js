//Declaring all DOM elements here
let pHeistTitle, heistSelect, pHeistTime, heistTime, pHeistPlayers, heistPlayers, pHeistXP, heistXP, pBestHeist, bRefresh;
let totalTime, totalXp;
let prevXp, currXp;

//Main 'database' for heists completed
let jsonData;

function preload() {

  jsonData = loadJSON('heistData.json');

}

function setup() {

  noCanvas();
  setupDOM();
  fRefresh();
  
}

function fAppendData() { //Adding data to the json file

  totalTime = 0;
  totalXp = 0;

  for (i = 0; i < jsonData.data.length; i++)

    if (heistSelect.value() == jsonData.data[i].heist) { //Match selected heist to counterpart in json file

      jsonData.data[i].entries.push({ //Add entries with current entered values
        "time": heistTime.value(),
        "players": heistPlayers.value(),
        "xp": heistXP.value()
      });


      for (j = 0; j < jsonData.data[i].entries.length; j++) { //Calculate averages for last entered heist


        totalTime = totalTime + jsonData.data[i].entries[j].time; //Get total playtime
        totalXp = totalXp + int(jsonData.data[i].entries[j].xp); //Get total Xp

      }

      jsonData.data[i].avgTime = totalTime / (jsonData.data[i].entries.length); //Calculate average time and add to json
      jsonData.data[i].avgXp = totalXp / (jsonData.data[i].entries.length); //Calculate average xp and add to json

    }

  fRefresh();
  
}

function fExportData() { //Saving the json file as heistData.json. In future look at local saving/overwriting the heistData.json asset???

  saveJSON(jsonData, 'heistData.json', false);

}

function mousePressed() {


}



function setupDOM() {

  //Setup all the DOM stuff
  pHeistTitle = createP('Heist:');
  heistSelect = createSelect();
  pHeistTime = createP('Time:');
  heistTime = createInput('').attribute('placeholder', 'mm:ss');
  pHeistPlayers = createP('Players:');
  heistPlayers = createInput('').attribute('placeholder', '1-4');
  pHeistXP = createP('XP Gained:');
  heistXP = createInput('').attribute('placeholder', '0');
  submitData = createButton('Submit');
  exportData = createButton('Export JSON');
  pBestHeist = createP('Waiting for Data');
  bRefresh = createButton('Refresh Averages');

  //Drop Down Selection. There has to be a better way using the json data and a loop??
  heistSelect.option('Aftershock');
  heistSelect.option('Alaskan Deal');
  heistSelect.option('Art Gallery');
  heistSelect.option('Bank Heist: Cash');
  heistSelect.option('Bank Heist: Deposit');
  heistSelect.option('Bank Heist: Gold');
  heistSelect.option('Beneath the Mountain');
  heistSelect.option('Big Oil');
  heistSelect.option('Boiling Point');
  heistSelect.option("Breakin' Feds");
  heistSelect.option('Brooklyn 10-10');
  heistSelect.option('Brooklyn Bank');
  heistSelect.option('Car Shop');
  heistSelect.option('Cook Off');
  heistSelect.option('Counterfeit');
  heistSelect.option('Cursed Kill Room');
  heistSelect.option('Diamond Heist');
  heistSelect.option('Diamond Store');
  heistSelect.option('Election Day');
  heistSelect.option('Firetarter');
  heistSelect.option('First World Bank');
  heistSelect.option('Four Stores');
  heistSelect.option('Framing Frame');
  heistSelect.option('GO Bank');
  heistSelect.option('Goat Simulator');
  heistSelect.option('Golden Grin Casino');
  heistSelect.option('Green Bridge');
  heistSelect.option('Heat Street');
  heistSelect.option("Hell's Island");
  heistSelect.option("Henry's Rock");
  heistSelect.option('Hotline Miami');
  heistSelect.option('Hoxton Breakout');
  heistSelect.option('Hoxton Revenge');
  heistSelect.option('Jewelry Store');
  heistSelect.option('Lab Rats');
  heistSelect.option('Mallcrasher');
  heistSelect.option('Meltdown');
  heistSelect.option('Murky Station');
  heistSelect.option('Nightclub');
  heistSelect.option('No Mercy');
  heistSelect.option('Panic Room');
  heistSelect.option('Prison Nightmare');
  heistSelect.option('Rats');
  heistSelect.option('Reservoir Dogs Heist');
  heistSelect.option('Safehouse Nightmare');
  heistSelect.option('Safehouse Raid');
  heistSelect.option("Santa's Workshop");
  heistSelect.option('Scarface Mansion');
  heistSelect.option('Shacklethorne Auction');
  heistSelect.option('Shadow Raid');
  heistSelect.option('Slaughterhouse');
  heistSelect.option('Stealing Xmas');
  heistSelect.option('The Alesso Heist');
  heistSelect.option('The Big Bank');
  heistSelect.option('The Biker Heist');
  heistSelect.option('The Bomb: Dockyard');
  heistSelect.option('The Bomb: Forest');
  heistSelect.option('The Diamond');
  heistSelect.option('The White House');
  heistSelect.option('The Yacht Heist');
  heistSelect.option('Transport');
  heistSelect.option('Transport: Train');
  heistSelect.option('Ukranian Job');
  heistSelect.option('Undercover');
  heistSelect.option('Watchdogs');
  heistSelect.option('White Xmas');

  //Selectors
  heistSelect.addClass('selectors');

  //Headers
  pHeistTitle.addClass('headerLabels');
  pHeistTime.addClass('headerLabels');
  pHeistPlayers.addClass('headerLabels');
  pHeistXP.addClass('headerLabels');
  pBestHeist.addClass('headerLabels');

  //Input Boxes
  heistTime.addClass('inputs');
  heistPlayers.addClass('inputs');
  heistXP.addClass('inputs');

  //Buttons
  submitData.addClass('buttons');
  submitData.mousePressed(fAppendData);

  exportData.addClass('buttons');
  exportData.mousePressed(fExportData);

  bRefresh.addClass('buttons');
  bRefresh.mousePressed(fRefresh);

}

function fRefresh() {//Refresh all items that have data
  
  for (i = 0; i < jsonData.data.length; i++) {

    totalTime = 0;  //Reset these values after each 'heist' entry
    totalXp = 0;    //Reset these values after each 'heist' entry

    for (j = 0; j < jsonData.data[i].entries.length; j++) { //Go through each heist

      if (jsonData.data[i].entries.length > 0) {  //Check if there is data to work with
        totalTime = totalTime + convertToSeconds(jsonData.data[i].entries[j].time); //Get total playtime
        totalXp = totalXp + int(jsonData.data[i].entries[j].xp); //Get total Xp

      }

      jsonData.data[i].avgTime = totalTime / (jsonData.data[i].entries.length); //Calculate average time and add to json
      jsonData.data[i].avgXp = totalXp / (jsonData.data[i].entries.length); //Calculate average xp and add to json

    }
  }

  fCurrentBest();
  
}

function fCurrentBest(){
  
  prevXp = 0;
  currXp = 0;
  
  for (i = 0; i < jsonData.data.length; i ++){

    currXp = jsonData.data[i].avgXp;
    
    if (currXp > prevXp){
      
      //____________-NOTE-____________       
      //Need to check here if it's reading the updated average xp instead or just showing the highest the avergae has been
      
      pBestHeist.html('Current Best Heist is ' + jsonData.data[i].heist + ' with an average of ' + int(jsonData.data[i].avgXp)/60 + ' xp/min.');

    }    
    
    prevXp = currXp;
    
  }

}

function convertToSeconds(mmss) { //Convert the mm:ss format to seconds

  var timeSplit = mmss.split(':');
  timeSplit[0] = timeSplit[0] * 60;
  return (int(timeSplit[0]) + int(timeSplit[1]));

}
