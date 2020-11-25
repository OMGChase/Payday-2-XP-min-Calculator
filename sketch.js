let heistSelect, pHeistTitle;
let heistTime, pHeistTime;
let heistPlayers, pHeistPlayers;
let heistXP, pHeistXP;
let submitData, pSubmit, dataLine;
let preHighXpMin, currXpMin, timeInSec, bestHeist, pBestHeist;

//testing new features
let jsonData = {};
let jsonLength;
let dataHeists = [];
let dataTotal = [];
let timeStr = [];

function preload() {

  jsonData = loadJSON('heistData.json');

}

function setup() {

  preHighXpMin = 0;
  noCanvas();
  //Testing new features
  jsonLength = jsonData.heist_data.length;


  //Setup all the DOM stuff
  pHeistTitle = createP('Heist:');
  pHeistTitle.addClass('headerLabels');

  heistSelect = createSelect();
  heistSelect.addClass('selectors');

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

  pHeistTime = createP('Time:');
  pHeistTime.addClass('headerLabels');

  heistTime = createInput('').attribute('placeholder', 'mm:ss');
  heistTime.addClass('inputs');

  pHeistPlayers = createP('Players:');
  pHeistPlayers.addClass('headerLabels');

  heistPlayers = createInput('').attribute('placeholder', '1-4');
  heistPlayers.addClass('inputs');

  pHeistXP = createP('XP Gained:');
  pHeistXP.addClass('headerLabels');

  heistXP = createInput('').attribute('placeholder', '0');
  heistXP.addClass('inputs');

  submitData = createButton('Submit');
  submitData.addClass('buttons');
  submitData.mousePressed(fAppendData);

  exportData = createButton('Export JSON');
  exportData.addClass('buttons');
  exportData.mousePressed(fExportData);
  
  pBestHeist = createP('Waiting for Data');
  pBestHeist.addClass('headerLabels');


  for (let i = 0; i < jsonLength; i++) {


    dataHeists.push(jsonData.heist_data[i]);

  }
  
  dataTotal = jsonData;
  
    fCalcXPMin();
  
}

function fAppendData() {

  dataHeists[dataHeists.length] = {
    heist: heistSelect.value(),
    time: heistTime.value(),
    players: heistPlayers.value(),
    xp: heistXP.value()
  };

  dataTotal.heist_data = dataHeists;
  
  fCalcXPMin();
  
}

function fExportData() {

  saveJSON(dataTotal, 'heistData.json');

}

function mousePressed(){
  
//debug stuff can go here.
  
}

function fCalcXPMin(){
  
  for (i = 0; i < dataHeists.length; i ++){
    
    timeStr = dataHeists[i].time.split(':');
    timeInSec = ((timeStr[0] * 60) + timeStr[1]);
    currXpMin = (dataHeists[i].xp / timeInSec) * 60;
    
    
    if (currXpMin > preHighXpMin){
      
      pBestHeist.html('Current Best: ' + dataHeists[i].heist + ' at ' + round(currXpMin, 2) + ' xp/min, with ' + dataHeists[i].players + ' player(s).');
      preHighXpMin = currXpMin;
      
    }else{
      

      
    }
    
    
  }
  
}
