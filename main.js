
//User profile/application info


// Checks if element exists by html id
function existselementid(htmlid) {
    var element = document.getElementById(htmlid);
    if (element) {
        return true;
    } else {
        return false;
    }
}

// Checks if element exists by class name
function existsclass(classname) {
    var element = document.getElementsByClassName(classname);
    if (element.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if element exists by html tag
function existstag(tag) {
    var element = document.getElementsByTagName(tag);
    if (element.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if element exists by query (CSS)
function existsquery(query) {
    var element = document.querySelector(query)
    if (element) {
        return true;
    } else {
        return false;
    }
}

function existsxpath(xpath) {
    var element = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (element.length > 0) {
        return true;
    }
}

// Changes text value if element exists. Else, does nothing.
function trytype(query, text) {
    if (existsquery(query)) {
        document.querySelector(query).value = text;
    } 
}

// Moves to xpath by scrolling into view and then clicks on target element
// document.querySelector("input[data-automation-id*='password']:nth-child(1)")
//unfinished! 
function moveclick(query) {
    var foundelement = document.querySelector(query);
    foundelement.scrollIntoView()
    foundelement.click()
}

function waitForElement(selector) {
    return new Promise(function(resolve, reject) {
      var element = document.querySelector(selector);
  
      if(element) {
        resolve(element);
        return;
      }
  
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          var nodes = Array.from(mutation.addedNodes);
          for(var node of nodes) {
            if(node.matches && node.matches(selector)) {
              observer.disconnect();
              resolve(node);
              return;
            }
          };
        });
      });
  
      observer.observe(document.documentElement, { childList: true, subtree: true });
    });
  }

  function waitForXPath(xpath) {
    return new Promise(function(resolve, reject) {
      var element = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  
      if(element) {
        resolve(element);
        return;
      }
  
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          var nodes = Array.from(mutation.addedNodes);
          for(var node of nodes) {
            if(node.matches && (node == document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0))) {
              observer.disconnect();
              resolve(node);
              return;
            }
          };
        });
      });
  
      observer.observe(document.documentElement, { childList: true, subtree: true });
    });
  }

  /**
 * Set Select Box Selection By Text
 * @param eid Element ID
 * @param eval Element Index
 */
function setSelectBoxByText(eid, etxt) {
  var eid = document.getElementById(eid);
  for (var i = 0; i < eid.options.length; ++i) {
      if (eid.options[i].text === etxt)
          eid.options[i].selected = true;
  }
}


// Export helper functions
// export {
//     PROFILE,
//     existselementid,
//     existsclass,
//     existsquery,
//     existstag,
//     trytype,
//     moveclick,
//     pollDOM
// };


// Main function. Two parts. First, detects the URL to determine application type
// Second, calls on function inside other js files to perform the autofill.
// function apply() {
//     var outerhtml = document.getElementsByTagName("body")[0].outerHTML.toLowerCase();
//     console.log("ping!")
//     if (outerhtml.includes("greenhouse")) {
//         console.log("target acquired");
//         return;
//     } else if (outerhtml.includes("workday")) {
//         return initWorkday();
//     } else if (outerhtml.includes("taleo")) {
//         return;
//     } else if (outerhtml.includes("lever")) {
//         return; 
//     } else if (outerhtml.includes("jobvite")) {
//         return;
//     } else {
//         console.log("incorrect page")
//         return;
//     }
// }
