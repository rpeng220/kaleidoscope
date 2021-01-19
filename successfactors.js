function sfLogin() {
    document.getElementById("username").value = PROFILE.email;
    document.getElementById("password").value = PROFILE.password;
    document.evaluate('//button[contains(text(), "Sign In")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click()
}

function sfRegister() {
    document.getElementById('fbclc_userName').value = PROFILE.email;
    document.getElementById('fbclc_emailConf').value = PROFILE.email;
    document.getElementById('fbclc_pwd').value = PROFILE.password;
    document.getElementById('fbclc_pwdConf').value = PROFILE.password;
    document.getElementById('fbclc_fName').value = PROFILE.first_name;
    document.getElementById('fbclc_lName').value = PROFILE.last_name;
    var countryselect = document.getElementById("fbclc_country");
    countryselect.value = document.evaluate('//option[contains(text(), "United States")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
    countryselect.dispatchEvent(changeevent);
}

function sfApply() {
    //upload resume first
    //fname, email ,lname, country are already filled
    document.getElementsByName('cellPhone')[0].value = PROFILE.phone;
    document.getElementsByName('address')[0].value = PROFILE.street_address;
    document.getElementsByName('zip')[0].value = PROFILE.zip_code;
    var stateselect = document.getElementsByName("state");
    stateselect.value = document.evaluate('//option[contains(text(), "California")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
    stateselect.dispatchEvent(changeevent);
    document.evaluate('//*[contains(text(),"Previous Employment")]//following::*[contains(text(), "Title")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0) = PROFILE.job_title1;
    document.evaluate('//*[contains(text(), "Company Name")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0) = PROFILE.employer1;
    var desc1_a = document.evaluate('//*[contains(text(), "Responsibilities")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    var desc1_b = document.evaluate('//*[contains(text(), "Achievements")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    if (desc1_a) {
        desc1_a.value = PROFILE.job_desc1;
    } else if (desc1_a) {
        desc1_b.value = PROFILE.job_desc1;
    }
    document.evaluate('//*[contains(text(), "Previous Work History")]//following::input[@role="combobox"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = PROFILE.job_start_month1.toString() + "/01/" + PROFILE.job_start_year1;
    document.evaluate('//*[contains(text(), "Previous Work History")]//following::input[@role="combobox"][2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = PROFILE.job_end_month1.toString() + "/01/" + PROFILE.job_end_year1;
    if (PROFILE.employer2 != "") {
        
    }
    if (PROFILE.employer3 != "") {

    }
    var uni1 = document.evaluate('//*[contains(text(), "School")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    var uni2 = document.evaluate('//*[contains(text(), "University")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    var uni3 = document.evaluate('//*[contains(text(), "Institution")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    if (uni1) {
        uni1.value = PROFILE.university;
    } else if (uni2) {
        uni2.value = PROFILE.university;
    } else if (uni3) {
        uni3.value = PROFILE.university;
    }
}