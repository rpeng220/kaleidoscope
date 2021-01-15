// import {PROFILE, moveclick, existsclass, existselementid, existsquery,
// existstag, trytype, pollDOM, existsxpath} from "./main.js"
/// <reference path="jquery-3.5.1.js"/>

var inputevent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

// Helper function to handle workday events. Fills out an input field and updates the value with site JS.
function changevalue(element, stringval) {
    element.value = stringval;
    element.dispatchEvent(inputevent);
}

function trytypexpath(xpath, stringval) {
    ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (ele) {
        ele.value = stringval;
        ele.dispatchEvent(inputevent);
    }
}


// Trytype for Workday apps using querySelector
function trytypeworkday(query, stringval) {
    if (existsquery(query)) {
        var element = document.querySelector(query);
        element.value = stringval;
        element.dispatchEvent(inputevent);
    }
}

// Trytype for Workday Listed Inputs
function trytypelist(xpath, posn, stringval) {
    var ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(posn);
    if (ele) {
        ele.value = stringval;
        ele.dispatchEvent(inputevent);
    }
} 

function dropdownSelect(xpath1, xpath2) {
    var dropdown = document.evaluate(xpath1, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    dropdown.click()
    pollDOM(xpath2, document.evaluate(xpath2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click())
} 

function workdayLogin() {
    var version = "none"
    var emailfield = document.querySelector("input[data-automation-id=email]");
    var passwordfield = document.querySelector("input[data-automation-id=password]"); 
    if (existsquery("input[data-automation-id=email]")) {
        version = "modern";
    } else {
        emailfield = document.querySelector("input[aria-label=Email Address]");
        passwordfield = document.querySelector("input[aria-label=Password]");
        version = "archaic"
    }
    changevalue(emailfield, PROFILE.email);
    changevalue(passwordfield, PROFILE.password);
    setTimeout(function() {
        document.querySelector('div[data-automation-id=click_filter]').click();
        // moveclick('div[data-automation-id=click_filter]');
        console.log("ok rammus")
    }, 1000);
    setTimeout(function() {
        var currenttext = document.getElementsByTagName("body")[0].innerText;
        if (currenttext.includes("ERROR: Invalid Username/Password")) {
            register(version);
        }
    }, 2000);
    return
}

function register(version) {
    if (version == "modern") {
        document.querySelector("[data-automation-id=createAccountLink]").click();
        } 
        function modern() {
            if (existsquery('[data-automation-id=email')) {
                changevalue(document.querySelector('[data-automation-id=email'), PROFILE.email)
            }
            if (existsquery('[data-automation-id=userName')) {
                changevalue(document.querySelector('[data-automation-id=userName'), PROFILE.email)
            }
            changevalue(document.querySelector('[data-automation-id=password'), PROFILE.password)
            if (existsquery('[data-automation-id=verifyPassword]')) {
                changevalue(document.querySelector('[data-automation-id=verifyPassword]'), PROFILE.password)
            }
            if (existsquery('[data-automation-id=confirmPassword]')) {
                changevalue(document.querySelector('[data-automation-id=confirmPassword]'), PROFILE.password)
            }
            if (existsquery('[data-automation-id=createAccountCheckbox]')) {
                document.querySelector('[data-automation-id=createAccountCheckbox').click();
            }
            document.querySelector('[data-automation-id=click_filter]').click()
        }
        setTimeout(modern, 2000);
    if (version == "archaic") {
        const accountclick = document.evaluate('//*[(text()="Create Account")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        accountclick.click();
        function archaic() {
            if (existsquery('[aria-label=Email Address')) {
                changevalue(document.querySelector('[aria-label=Email Address'), PROFILE.email);
            }
            changevalue(document.querySelector('[aria-label=Password'), PROFILE.password);
            if (existsquery('[aria-label=Verify New Password]')) {
                changevalue(document.querySelector('[aria-label=Verify New Password]'), PROFILE.password);
            }
            if (existsquery('[data-automation-id=checkboxPanel]')) {
                document.querySelector('[data-automation-id=checkboxPanel]').click();
            }
            document.querySelector('[data-automation-id=click_filter]').click();
        }
        setTimeout(archaic, 2000);
    }
}

// Having problems with string parsing literal quotations into encapsulated_state
function workdayPersonalinfo(nav, form) {
    var encapsulated_state = "\"" + PROFILE.state + "\"";
    function clickonstate() {
        var targetstate = document.evaluate('//div[contains(text(), "California")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        targetstate.click();
    }
    if (form == "default") { //we don't want to rely on page ordering if we don't have to, so this is the default.
        trytypeworkday('[data-automation-id="legalNameSection_firstName"]', PROFILE.first_name);
        trytypeworkday('[data-automation-id="legalNameSection_primary"]', PROFILE.last_name);
        trytypeworkday('[data-automation-id="addressSection_addressLine1"]', PROFILE.address);
        trytypeworkday('[data-automation-id="addressSection_city"]', PROFILE.city);
        trytypeworkday('[data-automation-id="addressSection_postalCode"]', PROFILE.zip_code);
        trytypeworkday('[data-automation-id="phone-number"]', PROFILE.phone);
        const state = document.evaluate('//label[contains(text(), "State")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        state.click();
        waitForXPath('//div[contains(text(), "California")]').then(clickonstate());
        // setTimeout(clickonstate, 800);
        // pollDOM('//div[contains(text(),' + encapsulated_state + ')]', clickonstate);
    }
    if (form == "custom") { 
        const firstname = document.evaluate('//*[contains(text(), "First Name")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const lastname = document.evaluate('//*[contains(text(), "Last Name")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        changevalue(firstname, PROFILE.first_name);
        changevalue(lastname, PROFILE.last_name);
        const address = document.evaluate("//*[contains(text(), 'Address Line 1')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const city = document.evaluate("//*[contains(text(), 'City')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const zipcode = document.evaluate("//*[contains(text(), 'Postal Code')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const state = document.evaluate('//label[contains(text(), "State")]//following::div[2]//div[1]//div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        changevalue(address, PROFILE.street_address);
        changevalue(city, PROFILE.city);
        changevalue(zipcode, PROFILE.zip_code);
        const phone = document.evaluate("//*[contains(text(), 'Phone Number')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
        changevalue(phone, PROFILE.phone);
        state.click();
        waitForXPath('//div[contains(text(), "California")]').then(clickonstate());
        // setTimeout(clickonstate, 800);
        // pollDOM('//div[contains(text(),' + encapsulated_state + ')]', clickonstate);
    }
    //done, send notification and wait for next page, then call workday func
    return;
}

function workdayExperience(nav, form) {
    var datecount = 1;
    var currenttext = document.getElementsByTagName("body")[0].innerText;
    var edusection = false;
    var langsection = false;
    if (form == "default") {
        if (currenttext.includes("Job Title") == false) {
            document.querySelector("[aria-label='Add Work Experience']").click();
        function defaultfunc() {
            trytypeworkday('[data-automation-id="jobTitle"]', PROFILE.job_title1);
            trytypeworkday('[data-automation-id="company"]', PROFILE.employer1);
            trytypeworkday('[data-automation-id="location"]', PROFILE.job_location1);
            trytypeworkday('[data-automation-id="description"]', PROFILE.job_desc1);
            trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateInputWrapper"]', 0, PROFILE.job_start_month1 + PROFILE.job_start_year1);
            if (PROFILE.current_job1 == 1) {
                document.querySelector('[data-automation-id="currentlyWorkHere"]').click()
            } else {
                trytypelist('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month1 + PROFILE.job_end_year1);
                datecount += 1;
            }
            if (PROFILE.employer2 != "") {
                pollDOM('//*[@aria-label="Add Another Work Experience"]', function() {
                    document.querySelector('[aria-label="Add Another Work Experience"]').click()
                    pollDOM('(//*[@data-automation-id="jobTitle"])[2]', function() {
                        trytypelist('//*[@data-automation-id="jobTitle"]', 1, PROFILE.job_title2);
                        trytypelist('//*[@data-automation-id="company"]', 1, PROFILE.employer2);
                        trytypelist('//*[@data-automation-id="location"]', 1, PROFILE.job_location2);
                        trytypelist('//*[@data-automation-id="description"]', 1, PROFILE.job_desc2);
                        trytypelist('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_start_month2 + PROFILE.job_start_year2);
                        datecount += 1;
                        if (PROFILE.current_job2 == 1) {
                            document.evaluate('//*[@data-automation-id="currentlyWorkHere"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).click();
                        } else {
                            trytypelist('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month2 + PROFILE.job_end_year2);
                            datecount += 1;
                        }
                        if (PROFILE.employer3 != "") {
                            pollDOM('//*[@aria-label="Add Another Work Experience"]', function() {
                                document.querySelector('[aria-label="Add Another Work Experience"]').click()
                                pollDOM('(//*[@data-automation-id="jobTitle"])[3]', function() {
                                    trytypelist('//*[@data-automation-id="jobTitle"]', 2, PROFILE.job_title3);
                                    trytypelist('//*[@data-automation-id="company"]', 2, PROFILE.employer3);
                                    trytypelist('//*[@data-automation-id="location"]', 2, PROFILE.job_location3);
                                    trytypelist('//*[@data-automation-id="description"]', 2, PROFILE.job_desc3);
                                    trytypelist('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_start_month3 + PROFILE.job_start_year3);
                                    datecount += 1;
                                    if (PROFILE.current_job2 == 1) {
                                        document.evaluate('//*[@data-automation-id="currentlyWorkHere"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2).click();
                                    } else {
                                        trytypelist('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month3 + PROFILE.job_end_year3);
                                        datecount += 1;
                                        }
                                    });
                                });
                            }
                        });
                    });
                }
                if (currenttext.includes("Degree") || existsquery('[aria-label=Add Education]')) {
                    edusection = true;
                    if (currenttext.includes("Degree") == false) {
                        document.querySelector("[aria-label='Add Education']").click();
                        pollDOM("//*[@data-automation-id='school']", function() {
                    changevalue(document.querySelector("[data-automation-id='school']"), PROFILE.university);
                    changevalue(document.querySelector("[data-automation-id='gpa']"), PROFILE.gpa);
                    trytypelist('//*[@data-automation-id="educationSection"]//*[@data-automation-id="dateInputWrapper"]', 0, PROFILE.uni_start_year);
                            trytypelist('//*[@data-automation-id="educationSection"]//*[@data-automation-id="dateInputWrapper"]', 1, PROFILE.grad_year);
                            document.querySelector("[data-automation-id='degree']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "Bachelors Degree")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 800);
                            setTimeout(function() {
                                document.querySelector('[data-automation-id="multiselectInputContainer"]').click();
                                setTimeout(function() {
                                    var major = '[data-automation-label="' + PROFILE.major + '"]';
                                    changevalue(document.querySelector('[data-automation-id="searchBox"]'), PROFILE.major);
                                    setTimeout(document.querySelector(major).click(), 600);
                                    }, 600)
                                }, 1000)
                            })
                        }
                    }
                if (existsquery('[aria-label="Add Languages"]') || currenttext.includes('native language')) {
                    langsection = true;
                    // language ttff 
                    if (currenttext.includes("native language") == false) {
                        document.querySelector("[aria-label='Add Languages']").click();
                        setTimeout(function() {
                            document.querySelector("[data-automation-id='language']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "English")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 500);
                            }, 1000);
                        setTimeout(function() {
                            document.querySelector("[data-automation-id='languageProficiency-0']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "Native")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 1500);
                        }, 2000);
                        setTimeout(document.querySelector('[data-automation-id="nativeLanguage"]').click(), 2300);
                    }
            //upload resume here
            //click code goes here if the other click doesnt owrk
                }
            //trytypelist
            }
        pollDOM('//*[@data-automation-id="jobTitle"]', defaultfunc())
        }
    }
    if (form == "custom") {
        if (currenttext.includes("Job Title") == false) {
            document.evaluate('//*[contains(text(), "Work Experience")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
        }
        function custom() {
            trytypexpath('//*[contains(text(), "Job Title")]//following::input[1]', PROFILE.job_title1);
            trytypexpath('//*[contains(text(), "Company")]//following::input[1]', PROFILE.employer1);
            trytypexpath('//*[contains(text(), "Location")]//following::input[1]', PROFILE.job_location1);
            trytypexpath('//*[contains(text(), "Role Description")]//following::input[1]', PROFILE.job_desc1);
            trytypexpath('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', PROFILE.job_start_month1 + PROFILE.job_start_year1);
            if (PROFILE.current_job1 == 1) {
                document.evaluate('(//label[contains(text(), "currently work here")])[1]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
            } else {
                trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month1 + PROFILE.job_end_year1);
                datecount += 1
            }
            if (PROFILE.employer2 != "") {
                setTimeout(function() {
                    document.evaluate('//*[contains(text(), "Work Experience")]//following::button[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                    setTimeout(function() {
                        trytypexpath('(//*[contains(text(), "Job Title")])[3]//following::input[1]', PROFILE.job_title2);
                        trytypexpath('(//*[contains(text(), "Company")])[3]//following::input[1]', PROFILE.employer2);
                        trytypexpath('(//*[contains(text(), "Location")])[3]//following::input[1]', PROFILE.job_location2);
                        trytypexpath('(//*[contains(text(), "Role Description")])[3]//following::input[1]', PROFILE.job_desc2);
                        trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_start_month2 + PROFILE.job_start_year2);
                        datecount += 1;
                        if (PROFILE.current_job2 == 1) {
                            document.evaluate('(//label[contains(text(), "currently work here")])[2]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                        } else {
                            trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month2 + PROFILE.job_end_year2);
                            datecount += 1;
                        }
                        setTimeout(function() {
                            trytypexpath('(//*[contains(text(), "Job Title")])[last()]//following::input[1]', PROFILE.job_title3);
                            trytypexpath('(//*[contains(text(), "Company")])[last()]//following::input[1]', PROFILE.employer3);
                            trytypexpath('(//*[contains(text(), "Location")])[last()]//following::input[1]', PROFILE.job_location3);
                            trytypexpath('(//*[contains(text(), "Role Description")])[last()]//following::input[1]', PROFILE.job_desc3);
                            trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_start_month3 + PROFILE.job_start_year3);
                            datecount += 1;
                            if (PROFILE.current_job2 == 1) {
                                document.evaluate('(//label[contains(text(), "currently work here")])[3]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                            } else {
                                trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month3 + PROFILE.job_end_year3);
                                datecount += 1;
                            }
                        }, 500)
                    }, 500)

                }, 500);
            }
            //education + language stuff
            if (currenttext.includes("Degree") || existsxpath('//*[contains(text(), "Education")]//following::button[1]')) {
                edusection = true;
                if (currenttext.includes("Degree")) {
                    document.evaluate('//*[contains(text(), "Education")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                }
                setTimeout(function() {
                    trytypexpath('(//*[contains(text(), "University")])//following::input[1]', PROFILE.university);
                    dropdownSelect('')
                    trytypexpath('(//*[contains(text(), "Overall Result")])//following::input[1]', PROFILE.gpa);
                    trytypelist('//*[contains(text(), "Education")]//following::*[@data-automation-id="dateWidgetInputBox"]', 0, PROFILE.uni_start_year);
                    trytypelist('//*[contains(text(), "Education")]//following::*[@data-automation-id="dateWidgetInputBox"]', 1, PROFILE.grad_year);
                    //major
                }, 1200)
            }
            if (currenttext.includes("native language") || existsxpath('//*[contains(text(), "Languages")]//following::button[1]')) {
                langsection = true;
                if (currenttext.includes("native language") == false) {
                    document.evaluate('//*[contains(text(), "Languages")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                }
                setTimeout(function() {
                    dropdownSelect()
                    //dropdownselect english
                    document.evaluate('(//label[contains(text(), "native language")])//following::div[@data-automation-id="checkboxPanel"][1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                }, 1200)
            }
        //upload resume goes here
        }
    }
}

function workday(nav, form) {
    //wait for DOM pageload to complete
    console.log("dom loaded")
    var currenttext = document.getElementsByTagName("body")[0].innerText;
    var lowertext = currenttext.toLowerCase();
    if (lowertext.includes('sign in')) {
        console.log("logging in");
        return workdayLogin();
    }
    var currentpage = "none";
    var currentelement;
    if (existsquery('[data-automation-id="taskOrchCurrentItemLabel"]')) {
        nav = 1;
        currentelement = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        currentpage = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
    }
    if (existsclass('css-1uso8fp')) {
        nav = 2;
        currentelement = document.getElementsByClassName('css-1uso8fp')[0];
        currentpage = document.getElementsByClassName('css-1uso8fp')[0].innerText;
    } else if (existstag('h2')) {
        nav = 3;
        currentelement = document.getElementsByTagName('h2')[0];
        currentpage = document.getElementsByTagName('h2')[0].innerText;
    }
    var pagelower = currentpage.toLowerCase();
    var clickelement;
    if (existsquery("[data-automation-id='bottom-navigation-next-button']")) {
        form = "default";
        clickelement = document.querySelector("[data-automation-id='bottom-navigation-next-button']");
    } else if (existsquery('[data-automation-id="wd-CommandButton_next"]')) {
        form = "custom";
        clickelement = document.querySelector('[data-automation-id="wd-CommandButton_next"]');
    }
        // console.log(pagelower.includes("quick apply"));
        // if (pagelower.includes("quick apply")) {
        //     console.log("got here");
        //     if (form == "default") {
        //         document.querySelector("[data-automation-id='bottom-navigation-next-button']").click()
        //     } else {
        //         document.querySelector('[data-automation-id="wd-CommandButton_next"]').click()
        //     }
        // }
    if (pagelower.includes("my information")) {
        return workdayPersonalinfo(nav, form);
    }
    if (pagelower.includes("my experience")) {
        return workdayExperience(nav, form);
    } else {
        console.log("creating observer");
        function pagechange() {
            setTimeout(function() {
                console.log("checking")
                if (currentelement) {
                    return workday(nav, form);
                }
            }, 7000);
        }
        clickelement.addEventListener("click", pagechange);
        // function checkforchange() {
        //     if (nav == 1) {
        //         currentpage2 = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
        //     } else if (nav == 2) {
        //         currentpage2 = document.getElementsByClassName('css-1uso8fp')[0].innerText;
        //     } else if (nav == 3) {
        //         currentpage2 = document.getElementsByTagName('h2')[0].innerText;
        //     }
        //     if (currentpage2 == currentpage) {
        //         document.removeEventListener("DOMContentLoaded");
        //         console.log("different page, return workday");
        //         // observer.disconnect()
        //         return workday(nav, form)
        //     }
        // }
        // document.addEventListener("DOMContentLoaded", checkforchange());
        // ORRRR use event listener here with the conditional below....
        // var observer = new MutationObserver(mutations => {
        //     for(let mutation of mutations) {
                
        //         var currentpage2 = "none";
        //         if (nav == 1) {
        //             currentpage2 = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
        //         } else if (nav == 2) {
        //             currentpage2 = document.getElementsByClassName('css-1uso8fp')[0].innerText;
        //         } else if (nav == 3) {
        //             currentpage2 = document.getElementsByTagName('h2')[0].innerText;
        //         }
        //         console.log("yo whatup");
        //         console.log(currentpage);
        //         if (currentpage2 == currentpage) {
        //             console.log("different page, return workday");
        //             observer.disconnect()
        //             return workday(nav, form)
        //         }
        //      }
        //  });
        //  observer.observe(document, { childList: true, subtree: true });
    }
}

//        document.addEventListener("DOMContentLoaded", workday(nav, form));


// function initWorkday() {
//     var currenttext = document.getElementsByTagName("body")[0].innerText;
//     var lowertext = currenttext.toLowerCase();
//     if (lowertext.includes('sign in')) {
//         login();
        // setTimeout(function() {
        //     console.log("init workday");
        //     if (existsquery('[data-automation-id="taskOrchCurrentItemLabel"]')) {
        //         console.log("uno");
        //         return workday("we51", "none");
        //     }
        //     if (existsclass('css-1uso8fp')) {
        //         console.log("dos");
        //         return workday("progressbar", "none");
        //     } else if (existstag('h2')) {
        //         console.log("tres");
        //         return workday("h2", "none");
        //     }
        //     console.log("you're");
        // }, 10000);
//     }
// }

// export {
//     initWorkday
// };