let heistSelect, pHeistTitle;

let heistTime, pHeistTime;

let heistPlayers, pHeistPlayers;

let heistXP, pHeistXP;

let submitData, pSubmit, dataLine;

let dataSet;

let exportData, saveString;

function preload() {

  dataSet = loadStrings('data.txt')

}

function setup() {

  noCanvas();

  //Setup all the DOM stuff, probably should have done this all in the style.css, but oh well..

  pHeistTitle = createP('Heist:');
  pHeistTitle.style('width', '100%');
  pHeistTitle.style('text-align', 'center');
  pHeistTitle.style('font-family', 'arial black');
  pHeistTitle.style('margin-bottom', '5px');

  heistSelect = createSelect();
  heistSelect.style('margin-left', 'auto');
  heistSelect.style('margin-right', 'auto');
  heistSelect.style('display', 'block');
  heistSelect.style('font-family', 'arial');
  heistSelect.style('text-align', 'center');


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
  pHeistTime.style('width', '100%');
  pHeistTime.style('text-align', 'center');
  pHeistTime.style('font-family', 'arial black');
  pHeistTime.style('margin-bottom', '5px');

  heistTime = createInput('mm:ss');
  heistTime.style('margin-left', 'auto');
  heistTime.style('margin-right', 'auto');
  heistTime.style('display', 'block');
  heistTime.style('font-family', 'arial');
  heistTime.style('text-align', 'center');


  pHeistPlayers = createP('Players:');
  pHeistPlayers.style('width', '100%');
  pHeistPlayers.style('text-align', 'center');
  pHeistPlayers.style('font-family', 'arial black');
  pHeistPlayers.style('margin-bottom', '5px');

  heistPlayers = createInput('0-4');
  heistPlayers.style('margin-left', 'auto');
  heistPlayers.style('margin-right', 'auto');
  heistPlayers.style('display', 'block');
  heistPlayers.style('font-family', 'arial');
  heistPlayers.style('text-align', 'center');

  pHeistXP = createP('XP Gained:');
  pHeistXP.style('width', '100%');
  pHeistXP.style('text-align', 'center');
  pHeistXP.style('font-family', 'arial black');
  pHeistXP.style('margin-bottom', '5px');

  heistXP = createInput('0');
  heistXP.style('margin-left', 'auto');
  heistXP.style('margin-right', 'auto');
  heistXP.style('display', 'block');
  heistXP.style('font-family', 'arial');
  heistXP.style('text-align', 'center');

  submitData = createButton('Submit');
  submitData.style('margin-top', '10px');
  submitData.style('margin-left', 'auto');
  submitData.style('margin-right', 'auto');
  submitData.style('display', 'block');
  submitData.mousePressed(fCalcXP);

  exportData = createButton('Export Data List');
  exportData.style('margin-top', '10px');
  exportData.style('margin-left', 'auto');
  exportData.style('margin-right', 'auto');
  exportData.style('display', 'block');
  exportData.mousePressed(fExportData);

}

function fCalcXP() {


  dataLine = heistSelect.value() + '|' + heistTime.value() + '|' + heistPlayers.value() + '|' + heistXP.value() + '|\n';

  console.log('Data Structure:')
  console.log('Heist|Time|Players|XP|')
  console.log(dataLine);

  dataSet = dataSet + dataLine;

  console.log(dataSet);

}

function fExportData(){
  
  saveString = dataSet.split('\n');
    saveStrings(saveString, 'dataSet', 'txt');
  
}
