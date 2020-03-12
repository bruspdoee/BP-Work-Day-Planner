$(document).ready(function() {
  
    // test flag
    const test = false;
  
    // get times from moment
    const now = moment().format('MMMM Do YYYY');
  
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    // set times for tesitng after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    let dateHeading = $("#navbar-subtitle");
    dateHeading.text(now);
    
    // change description here - none
    const saveIcon = "./images/save-regular.svg"; 
  
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // this should only occur on first time the app is loaded in the browser
      // helpfully remind user that lunch is important
      planTextArr = new Array(9);
    }
  
    // set variable referencing planner element
    let plannerDiv = $("#plannerContainer");
    // clear existing elements
    plannerDiv.empty();
  
  
    // build calendar by row for fix set of hours (9am-5pm)
    for (let hour = 9; hour <= 17; hour++) {
      // index for array use offset from hour
      let index = hour - 9;
      
      // build row components
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // Start building Time box portion of row
      let TimeDiv = $('<div>');
      TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      const $timeBoxSpn = $('<span>');
      // can use this to get value
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours for display
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // populate timeBox with time
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      // insert into col inset into timebox
      $rowDiv.append(TimeDiv);
      TimeDiv.append($timeBoxSpn);
  
      // build row components
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);

      let $SaveDiv = $('<div>');
      $SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      $rowDiv.append($SaveDiv);
      $SaveDiv.append($saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
  
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } else {
        $hourRow.css("background-color","red")
      }
    };
  
    // saves to local storage
    // conclick function to listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      let $index = $(this).attr('save-id');
  
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
  
      planTextArr[$index] = $value;

      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
  
      // neeed to check for save button
      let i = $(this).attr('hour-index');

    });
  });