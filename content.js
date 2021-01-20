

// function setV() {
//     var email = document.querySelector("input[data-automation-id=email]");
    
//     email.value = "abc@gmail.com";
    
//     var event = new Event('input', {
//     bubbles: true,
//     cancelable: true,
// });

// email.dispatchEvent(event);

// }

var isWorkdayload = false;
var taleoflag = false;

window.addEventListener('load', function() {
  console.log(document.readyState);
  isWorkdayload = false;
  var currenturl = window.location.toString();
  if (existsquery("input[id='first_name']")) {
    console.log("success2");
    greenhouse();
  }
  if (window.location.toString().includes("myworkdayjobs")) {
    console.log("workday detected");
    setTimeout(function() {workday()}, 15000);
  }
  if (window.location.toString().includes("taleo") && taleoflag == false) {
    console.log("taleo detected");
    setTimeout(function() {taleo()}, 8000);
  }
  if (currenturl.includes('lever.co') && currenturl.includes('/apply')) {
    console.log("lever detected")
    setTimeout(function() {lever()}, 5000);
  }
});


// document.addEventListener('visibilitychange', function(){
//     console.log("WW");
//     setV();
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
      console.log(document.location.href);
    }
  })

chrome.action.setPopup({
  popup: "index.html"
});

function selectItem(index)
{
        if (index > 2)
        {
            return;
        }
        
        var testevent = new Event("mousedown");
        var a1 = document.getElementsByClassName("select2-choice select2-default")[0];
        a1.dispatchEvent(testevent);
        
        var a2 = document.querySelector("#select2-drop > div > input")
        
                console.log(Date.now() + "  BB");
        console.log(a2);
        
        // university
        if (index === 0)
        {
            a2.value = "University of California - Berkeley";
            var testevent2 = new Event("keyup-change");
            a2.dispatchEvent(testevent2);
        }
        
        // degree
        else if (index === 1)
        {
          // a2.value = PROFILE.degree;
        }
        
        // major
        else if (index === 2)
        {
          // a2.value = PROFILE.major;
            //a2.value = "Art";
        }
                
         setTimeout(function(){ 
                     
             //var objecttarget = document.evaluate('(//ul[@class="select2-results"])[8]//li[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
            var objecttarget = document.getElementsByClassName("select2-results-dept-0");
            console.log(objecttarget);
            
            console.log(Date.now() + "  CC");
          
            var k = 0;
            if (index === 1)
            {
                k = 4;
            }
            else if (index === 2)
            {
                k =2;
            }

            var mousedown = new Event("mousedown", {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                
            var mouseup = new Event("mouseup", {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                
            objecttarget[k].dispatchEvent(mousedown);
            

                               
            objecttarget[k].dispatchEvent(mouseup);
            
 
            setTimeout(function(){ selectItem(index+1); }, 3000);

             
            },    
            3000
        );
}


function setV() {
        var i = 0;
        selectItem(i);
}