
function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  document.getElementById("curr_list").style.visibility = 'hidden';
  document.getElementById("logo").style.visibility = 'hidden';
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.body.style.backgroundColor = "white";
}


