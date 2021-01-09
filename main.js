console.log("hello peppa!");

//User profile/application info
var PROFILE = {
    first_name: "Boris",
    last_name: "Kwang",
    email: "uniquepugs223@gmail.com",
    phone: "510-436-7890",
    linkedin: "www.linkedin.com",
    website: "www.facebook.com",
    github: "www.github.com",
    street_address: "1520 Shattuck Avenue",
    city: "Berkeley",
    state: "California",
    zip_code: "94702",
    university: "UC Berkeley",
    gpa: 4,
    degree: "Economics",
    uni_start_month: 8,
    uni_start_year: "2017",
    grad_month: 9,
    grad_year: "2021",
    degree_received: 1,
    employer1: "Robert Half",
    job_title1: "Marketing Analyst",
    current_job1: 0,
    job_location1: "California",
    job_start_month1: 8,
    job_start_year1: "2008",
    job_end_month1: 3,
    job_end_year1: "2009",
    job_desc1: `lead job market efforts,
    doubled retention rates,
    pipeline two million`,
    employer2: "Flybar",
    job_title2: "Associate",
    current_job2: 1,
    job_location2: "California",
    job_start_month2: 3,
    job_start_year2: "2012",
    job_end_month2: 4,
    job_end_year2: "2014",
    job_desc2: `lead job market efforts,
    doubled retention rates,
    pipeline two million`,
    employer3: "",
    job_title3: "Associate",
    current_job3: 1,
    job_location3: "California",
    job_start_month3: 3,
    job_start_year3: "2012",
    job_end_month3: 4,
    job_end_year3: "2014",
    job_desc3: `lead job market efforts,
    doubled retention rates,
    pipeline two million`,
    username: "uniquepugs223",
    password: "Awesomepasword!1",
    question: "bagool",
    answer: "bafool"
}

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

// Waits for element found by xpath to be present before continuing.
function pollDOM(xpath, func) {
    var el = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (el) {
        return func();
  } else {
    setTimeout(pollDOM, 300); // try again in 300 milliseconds
  }
}


// Export helper functions
export {
    PROFILE,
    existselementid,
    existsclass,
    existsquery,
    existstag,
    trytype,
    moveclick,
    pollDOM
};


// Main function. Two parts. First, detects the URL to determine application type
// Second, calls on function inside other js files to perform the autofill.


