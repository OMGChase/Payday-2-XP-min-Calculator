//Declaring all DOM elements here
let pHeistTitle, heistSelect, pHeistTime, heistTime, pHeistPlayers, heistPlayers, pHeistXP, heistXP, pBestHeist, bRefresh;
let totalTime, totalXp;
let prevXp, currXp, bestXp;
let finalText;

//Main 'database' for heists completed
let jsonData;

function preload() {

  jsonData = loadJSON('assets/heistData.json', jsonLoaded);

}

function setup() {

  noCanvas();
  setupDOM();
  console.log('Program Start')

}

//Json manipulation functions:
function fAppendData() { //Adding data to the json file

  totalTime = 0;
  totalXp = 0;

  for (i = 0; i < jsonData.data.length; i++) //Loop through entire array

    if (heistSelect.value() == jsonData.data[i].heist) { //Look for the input heist in the json data.

      jsonData.data[i].entries.push({ //Add entries with current entered values

        "time": heistTime.value(),
        "players": heistPlayers.value(),
        "xp": heistXP.value()

      });

      for (j = 0; j < jsonData.data[i].entries.length; j++) { //Calculate averages for last entered heist

        totalTime = totalTime + int(jsonData.data[i].entries[j].time); //Get total playtime
        totalXp = totalXp + int(jsonData.data[i].entries[j].xp); //Get total Xp

      }

      jsonData.data[i].avgTime = totalTime / (jsonData.data[i].entries.length); //Calculate average time and add to json
      jsonData.data[i].avgXp = totalXp / (jsonData.data[i].entries.length); //Calculate average xp and add to json

    }

  fRefresh();

}

function fRefresh() { //Refresh all items that have data

  for (i = 0; i < jsonData.data.length; i++) { //Loop whole array

    totalTime = 0; //Reset these values after each 'heist' entry
    totalXp = 0; //Reset these values after each 'heist' entry

    for (j = 0; j < jsonData.data[i].entries.length; j++) { //Loop through each heist

      if (jsonData.data[i].entries.length > 0) { //Check if there is data to work with

        totalTime = totalTime + convertToSeconds(jsonData.data[i].entries[j].time); //Get total playtime
        totalXp = totalXp + int(jsonData.data[i].entries[j].xp); //Get total Xp

      }

      jsonData.data[i].avgTime = str(totalTime / (jsonData.data[i].entries.length)); //Calculate average time and add to json
      jsonData.data[i].avgXp = str(totalXp / (jsonData.data[i].entries.length)); //Calculate average xp and add to json
      jsonData.data[i].avgXpMin = round((jsonData.data[i].avgXp / jsonData.data[i].avgTime) * 60, 2); //Calculate avgXpMin and add to json

    }
  }

  console.log('Refreshed JSON data');
  fCurrentBest();

}

function fCurrentBest() { //Update the pBestHeist element with the current best heist with the xp;

  prevXp = 0;
  currXp = 0;
  bestXp = 0;

  for (i = 0; i < jsonData.data.length; i++) { //Loop through whole array

    currXp = jsonData.data[i].avgXpMin;

    if (currXp > bestXp && currXp != "") {

      //Give the function that makes the reuslt text look nice (fFormartResult) the best heist name and it's corresponding xp/min
      pBestHeist.html(fFormatResult(jsonData.data[i].heist, jsonData.data[i].avgXpMin));
      bestXp = currXp;

    }

    prevXp = currXp;

  }

  console.log('Best heist has been re-calculated');

}

function fExportData() { //Saving the json file as heistData.json. In future look at local saving/overwriting the heistData.json asset???

  saveJSON(jsonData, 'heistData.json', false);

}

//Ease of use functions:
function convertToSeconds(mmss) { //Convert the mm:ss format to seconds

  var timeSplit = mmss.split(':');
  (timeSplit[0]) = int(timeSplit[0]) * 60;
  return (int(timeSplit[0]) + int(timeSplit[1]));

}

function fFormatResult(inputHeist, inputXp) { //Function to reduce the code length and format the result  

  var result;

  result = '<h3>' + 'Current Best Heist' + '</h3>';
  result = result + '<h1>' + inputHeist + '</h1>';
  result = result + '<h3>' + 'with and average of:' + '</h3>';
  result = result + '<h1>' + inputXp + ' xp/m. </h1>';

  return (result);

}

//Callback functions:
function jsonLoaded() {

  console.log('JSON file loaded successfully!');

}

//DOM functions
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

  //Drop Down Selections - In a loop to reduce code length
  for (i = 0; i < jsonData.data.length; i++) {

    heistSelect.option(jsonData.data[i].heist); //Add heist items to dropdown list.

  }

  //Selectors
  heistSelect.addClass('selectors');

  //Headers
  pHeistTitle.addClass('headerLabels');
  pHeistTime.addClass('headerLabels');
  pHeistPlayers.addClass('headerLabels');
  pHeistXP.addClass('headerLabels');
  pBestHeist.addClass('finalText');

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

  fRefresh();

}