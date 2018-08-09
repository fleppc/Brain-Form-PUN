var Ukey = "/u/";
var elements_list = ["TaskName", "OnsetOfStimulis", "StimulusDuration", "Manufacturer", "ManufacturersModelName", "EchoTrainLength", "AcquisitionNumber", "MagneticFieldStrength", "FlipAngle", "EchoTime", "RepetitionTime", "PhaseEncodingLines", "BandwidthPerPixelPhaseEncode", "EffectiveEchoSpacing", "TotalReadoutTime", "AccelFactPE", "TrueEchoSpacing", "PhaseEncodingDirection", "AcquisitionTime",
   "SliceTiming", "ImageOrientation", "SliceThickness", "and the other one"];
var description_list = {"OnsetOfStimulis": "in seconds", "StimulusDuration": "in seconds", "AcquisitionTime": "year, month, day, hour (24h), minute, second", "SliceTiming": "defined, in seconds, as the time of each slice acquisition in relation to the beginning of volume acquisition", "ImageOrientation": "axial, sagittal, or coronal" };

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

// Creates elements in elements_list
function pageStart() {
  document.getElementById("fileInput").addEventListener('change', handleFileSelect);

  for (var key in elements_list) {
    var item = elements_list[key];

    var br = document.createElement("br");
    var quest = document.createElement("INPUT");
    var form = document.getElementById("theForm");
    var label = document.createElement("LABEL");
    var checkbox = document.createElement("INPUT");

    quest.setAttribute('id', item);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', item+"Checkbox");
    checkbox.setAttribute('onclick', 'check_box("'+item+'");');
    checkbox.setAttribute('checked', true);
    label.setAttribute('for', item);
    label.setAttribute('id', item + 'Label')

    form.appendChild(checkbox);
    form.appendChild(label);
    document.getElementById(item + 'Label').innerHTML = item + ': ';
    form.appendChild(quest);
    form.appendChild(br);
 }
 var div = document.getElementById("QBlock");
 var button = document.createElement("BUTTON");
 var quest = document.createElement("INPUT");

 // quest.setAttribute('id', "FName");
 // quest.setAttribute('placeholder', "File Name");
 button.setAttribute('onClick', "getVal();");
 button.setAttribute('id', "getFileBTN");
 // form.appendChild(quest);
 div.appendChild(button);
 document.getElementById("getFileBTN").innerHTML = "Create File";

}


function getVal(){
  var fname = prompt("What should the file name be?");

  if (fname != null) {
    var vals = [];
    var val, valN;
    text = '{\n';

    // records values in elemrnts and creats text
    for (i in elements_list) {
      elem = elements_list[i]
      // records values in elemrnts
      vals.push(document.getElementById(elem).value);
      // makes text
      val = document.getElementById(elem).value;

      if (val == Ukey) {
        //if val in set to unnecessary
        val = '"'+ Ukey +'"';
      }else{
        valN = parseFloat(val);

        if (val.includes(',')) {
          // if value is comaseperated values
          val = '['+ val +']';
        } else if (!isNaN(valN)) {
          //if value is a number
          // pass
        } else {
          // if value is a string
          val = '"'+ val +'"';
        }
      }
        //set description if there is no id
        // if ("" == val) {
        //   try{
        //     val = "dis:"+ description_list[elem];
        //     console.log(val);
        //   }catch(err){
        //     val = '"'+'"';
        //   }
        //   }
        console.log("val:" + val);
        console.log(description_list[elem]);
        //adds values to text
        text = text + '"'+elem+'"' + ': ' + val + ',\n';
      }

    for (key in description_list) {
      var des = description_list[key];
      key = "D_" + key;
      text = text + '"'+key+'"' + ': ' + '"'+ des +'"' + ',\n';
    }

    text = text.substring(0, text.length - 2);
    text = text + '\n}';

    // var fname = document.getElementById("FName").value;
    if (fname) {
     fname += ".json";
     download(fname, text);
    }else{
     download("file.json", text);
    }
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
      fr.onload = updatePage;
      fr.readAsText(file);
   }
}


function updatePage() {
  // var varList = ["TaskName", "OnsetOfStimulis", "StimulusDuration", "Manufacturer", "ManufacturersModelName", "EchoTrainLength", "AcquisitionNumber", "MagneticFieldStrength", "FlipAngle", "EchoTime", "RepetitionTime", "PhaseEncodingLines", "BandwidthPerPixelPhaseEncode", "EffectiveEchoSpacing", "TotalReadoutTime", "AccelFactPE", "TrueEchoSpacing", "PhaseEncodingDirection", "AcquisitionTime",
  //  "SliceTiming", "ImageOrientation", "SliceThickness"]

  //reads json configuration file
  var key_list = [];
  var Jfile = JSON.parse(fr.result);

  //puts Json keys into a list
  for (var key in Jfile) {
    key_list.push(key);
  }

  //code to load preprepared data in to the text boxes
  for (var key in key_list) {
    var item = key_list[key];
    var val = Jfile[item];

    if (val == Ukey) {
      unnecessary(item);
    } else if (!val == "") {
      document.getElementById(item).value = val;
    }
  }
  //code to load preprepared data in to the text boxes
  // if (Jfile.TaskName == Ukey) {unnecessary("TaskName");} else if (!Jfile.TaskName == "") {document.getElementById("TaskName").value = Jfile.TaskName;}
  // if (Jfile.OnsetOfStimulis == Ukey) {unnecessary("OnsetOfStimulis");} else if (!Jfile.OnsetOfStimulis == "") {document.getElementById("OnsetOfStimulis").value = Jfile.OnsetOfStimulis;}
  // if (Jfile.StimulusDuration == Ukey) {unnecessary("StimulusDuration");} else if (!Jfile.StimulusDuration == "") {document.getElementById("StimulusDuration").value = Jfile.StimulusDuration;}
  // if (Jfile.Manufacturer == Ukey) {unnecessary("Manufacturer");} else if (!Jfile.Manufacturer == "") {document.getElementById("Manufacturer").value = Jfile.Manufacturer;}
  // if (Jfile.ManufacturersModelName == Ukey) {unnecessary("ManufacturersModelName");} else if (!Jfile.ManufacturersModelName == "") {document.getElementById("ManufacturersModelName").value = Jfile.ManufacturersModelName;}
  // if (Jfile.EchoTrainLength == Ukey) {unnecessary("EchoTrainLength");} else if (!Jfile.EchoTrainLength == "") {document.getElementById("EchoTrainLength").value = Jfile.EchoTrainLength;}
  // if (Jfile.AcquisitionNumber == Ukey) {unnecessary("AcquisitionNumber");} else if (!Jfile.AcquisitionNumber == "") {document.getElementById("AcquisitionNumber").value = Jfile.AcquisitionNumber;}
  // if (Jfile.MagneticFieldStrength == Ukey) {unnecessary("MagneticFieldStrength");} else if (!Jfile.MagneticFieldStrength == "") {document.getElementById("MagneticFieldStrength").value = Jfile.MagneticFieldStrength;}
  // if (Jfile.FlipAngle == Ukey) {unnecessary("FlipAngle");} else if (!Jfile.FlipAngle == "") {document.getElementById("FlipAngle").value = Jfile.FlipAngle;}
  // if (Jfile.EchoTime == Ukey) {unnecessary("EchoTime");} else if (!Jfile.EchoTime == "") {document.getElementById("EchoTime").value = Jfile.EchoTime;}
  // if (Jfile.RepetitionTime == Ukey) {unnecessary("RepetitionTime");} else if (!Jfile.RepetitionTime == "") {document.getElementById("RepetitionTime").value = Jfile.RepetitionTime;}
  // if (Jfile.PhaseEncodingLines == Ukey) {unnecessary("PhaseEncodingLines");} else if (!Jfile.PhaseEncodingLines == "") {document.getElementById("PhaseEncodingLines").value = Jfile.PhaseEncodingLines;}
  // if (Jfile.BandwidthPerPixelPhaseEncode == Ukey) {unnecessary("BandwidthPerPixelPhaseEncode");} else if (!Jfile.BandwidthPerPixelPhaseEncode == "") {document.getElementById("BandwidthPerPixelPhaseEncode").value = Jfile.BandwidthPerPixelPhaseEncode;}
  // if (Jfile.EffectiveEchoSpacing == Ukey) {unnecessary("EffectiveEchoSpacing");} else if (!Jfile.EffectiveEchoSpacing == "") {document.getElementById("EffectiveEchoSpacing").value = Jfile.EffectiveEchoSpacing;}
  // if (Jfile.TotalReadoutTime == Ukey) {unnecessary("TotalReadoutTime");} else if (!Jfile.TotalReadoutTime == "") {document.getElementById("TotalReadoutTime").value = Jfile.TotalReadoutTime;}
  // if (Jfile.AccelFactPE == Ukey) {unnecessary("AccelFactPE");} else if (!Jfile.AccelFactPE == "") {document.getElementById("AccelFactPE").value = Jfile.AccelFactPE;}
  // if (Jfile.TrueEchoSpacing == Ukey) {unnecessary("TrueEchoSpacing");} else if (!Jfile.TrueEchoSpacing == "") {document.getElementById("TrueEchoSpacing").value = Jfile.TrueEchoSpacing;}
  // if (Jfile.PhaseEncodingDirection == Ukey) {unnecessary("PhaseEncodingDirection");} else if (!Jfile.PhaseEncodingDirection == "") {document.getElementById("PhaseEncodingDirection").value = Jfile.PhaseEncodingDirection;}
  // if (Jfile.AcquisitionTime == Ukey) {unnecessary("AcquisitionTime");} else if (!Jfile.AcquisitionTime == "") {document.getElementById("AcquisitionTime").value = Jfile.AcquisitionTime;}
  // if (Jfile.SliceTiming == Ukey) {unnecessary("SliceTiming");} else if (!Jfile.SliceTiming == "") {document.getElementById("SliceTiming").value = Jfile.SliceTiming;}
  // if (Jfile.ImageOrientation == Ukey) {unnecessary("ImageOrientation");} else if (!Jfile.ImageOrientation == "") {document.getElementById("ImageOrientation").value = Jfile.ImageOrientation;}
  // if (Jfile.SliceThickness == Ukey) {unnecessary("SliceThickness");} else if (!Jfile.SliceThickness == "") {document.getElementById("SliceThickness").value = Jfile.SliceThickness;}
}

//marks unnecessary boxes
function unnecessary(elementName) {
  document.getElementById(elementName).placeholder = "Unnecessary";
  document.getElementById(elementName).style.color = "red";
}


function checked_unnecessary(elementName) {
  document.getElementById(elementName).value = Ukey;
  document.getElementById(elementName).disabled = true;
}

function normalize(elementName) {
  document.getElementById(elementName).value = "";
  document.getElementById(elementName).disabled = false;
}


function check_box(id) {
  var value = document.getElementById(id).value;
  if (value == Ukey) {
    normalize(id);
  } else {
    checked_unnecessary(id);
  }
}
