var elements_toRecord = [];

window.onload = function() {pageStart();};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  }


function getVal(){
  var vals = [];
  var val, valN;
  text = '{\n';

  // records values in elemrnts and creats text
  for (i in elements_toRecord) {

    elem = elements_toRecord[i]
    // records values in elemrnts
    vals.push(document.getElementById(elem).value);
    // makes text
    val = document.getElementById(elem).value;
    //val = String(val);
    valN = parseFloat(val);

    if (val.includes(',')) {
      //if value is a number
      val = '['+ val +']';
    } else if (!isNaN(valN)) {
      // if value is comaseperated values
      // pass
    } else {
      // if value is a string
      val = '"'+ val +'"';
    }
    //adds values to text
    if (val != "") {
    text = text + '"'+elem+'"' + ': ' + val + ',\n';
  }
  }
  text = text.substring(0, text.length - 2);
  text = text + '\n}'

  fileName = prompt("Chose a name for the file.");
  // var fileName = document.getElementById('FName').value;
   if (fileName) {
    fileName += ".json";
    download(fileName, text);
  }else{
    download("file.json", text);
  }
}

//reads json configuration file
function handleFileSelect() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

    } else {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }

    input = document.getElementById('fileInput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
   }
   else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
   }
   else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
   }
   else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = updatePage;  // I think this runs the updatePage() function.
      fr.readAsText(file);
   }
}


function pageStart(){
  document.getElementById("fileInput").addEventListener('change', handleFileSelect);
}


function updatePage() {
  //reads json configuration file
  var Ukey = "/u/";
  var Dkey = "D_";
  var key_list = [];
  var Jfile = JSON.parse(fr.result);

  //puts Json keys into a list
  for (var key in Jfile) {
    key_list.push(key);
  }

  for (var key in key_list) {
    var item = key_list[key];
    var val = Jfile[item];
    var bol = false;

    item = item.toString();
    console.log("Now: " + item.slice(0, 2));

    if (item.slice(0, 2) == Dkey) {
      bol = true;
      item = item.slice(2, item.length);
    }
    console.log("bol is: "+ bol);

    console.log("item: "+item+"__val: "+val);

    if (val != Ukey) {

      var br = document.createElement("br");
      var quest = document.createElement("INPUT");
      var form = document.getElementById("theForm");
      var label = document.createElement("LABEL")
      var description = document.createElement("span");

      if (bol) {
        // sets the discription
        description.setAttribute('class', 'description');
        description.setAttribute('id', item + 'Description');

        document.getElementById(item).after(description);
        //form.appendChild(description);
        document.getElementById(item + 'Description').innerHTML = val;

        elements_toRecord.push(item);
        bol = false;
      }else{
        quest.setAttribute('id', item);
        quest.setAttribute('value', val);
        label.setAttribute('for', item);
        label.setAttribute('id', item + 'Label');

        form.appendChild(label);
        document.getElementById(item + 'Label').innerHTML = item + ': ';
        form.appendChild(quest);
        form.appendChild(br);

        elements_toRecord.push(item);
      }

    }
 }
}


// this reads variables from the url.
// function getUrlParams(url) {
//   var params = {};
//   var parser = document.createElement('a');
//   parser.href = url;
//   var query = parser.search.substring(1);
//   var vars = query.split('&');
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split('=');
//     params[pair[0]] = decodeURIComponent(pair[1]);
//   }
//   return params;
// };
