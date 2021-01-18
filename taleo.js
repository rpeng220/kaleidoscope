var changeevent = new Event('change', {
    bubbles: true,
});

function tryvalue(id, stringval) {
    if (document.getElementById(id)) {
        document.getElementById(id).value = stringval;
    }
}

function dateselect(id, dateval) {
    var dateele = document.getElementById(id);
    if (document.getElementById(id)) {
        dateele.value = dateval;
        dateele.dispatchEvent(inputevent2);
        dateele.dispatchEvent(changeevent);
    }
}


function taleoLogin() {
    document.getElementById("dialogTemplate-dialogForm-login-name1").value = PROFILE.username;
    document.getElementById("dialogTemplate-dialogForm-login-password").value = PROFILE.password;
    document.getElementById("dialogTemplate-dialogForm-login-defaultCmd").click();
    setTimeout(function() {
        if (document.getElementById('dialogTemplate-dialogForm-login-errorMessageTitle')) {
            document.getElementById("dialogTemplate-dialogForm-login-register").click();
            waitForElement("[id=dialogTemplate-dialogForm-userName]").then(function() {
                document.getElementById("dialogTemplate-dialogForm-userName").value = PROFILE.username;
                document.getElementById("dialogTemplate-dialogForm-password").value = PROFILE.password;
                if (document.getElementById('dialogTemplate-dialogForm-passwordConfirm')) {
                    document.getElementById('dialogTemplate-dialogForm-passwordConfirm').value = PROFILE.password;
                }
                document.getElementById('dialogTemplate-dialogForm-email').value = PROFILE.email;
                setTimeout(function() { document.getElementById('dialogTemplate-dialogForm-defaultCmd').click();}, 1000);
            });
        }
    }, 2000);
}

function taleoPersonalinfo() {
    document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_FirstName").value = PROFILE.first_name;
    document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_LastName").value = PROFILE.last_name;
    document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_Address").value = PROFILE.street_address;
    document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_City").value = PROFILE.city;
    document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_ZipCode").value = PROFILE.zip_code;
    var cellphone = document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_MobilePhone");
    var homephone = document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_HomePhone");
    if (document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_PreferredPhone")) {
        document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_PreferredPhone").value = 1;
    }
    if (homephone) {
        homephone.value = PROFILE.phone;
    } else if (cellphone) {
        cellphone.value = PROFILE.phone;
    }
    //select country > state
    var countryselect = document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_ResidenceLocation-0");
    countryselect.value = document.evaluate('//*[@id="et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_ResidenceLocation-0"]//option[contains(text(), "United States")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
    countryselect.dispatchEvent(inputevent2);
    countryselect.dispatchEvent(changeevent);
}

function taleoExperience() {
    taleoflag = true;
    console.log("taleo experience");
    //could use DOM containstext//input but this messes up if the HR dept changes the names of the fields
    var x = '0';
    var y = '0';
    var z = '0';
    if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_1-we-wei-0-frm-dv_cs_experience_Employer')) {
        x = '1';
        if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_0-csef-efi-0-frm-dv_cs_education_Program')) {
            y = '0';
            z = '2';
        } else {
            y = '2';
            z = '0';
        }
    } else if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_2-we-wei-0-frm-dv_cs_experience_Employer')) {
        x = '2';
        if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_1-csef-efi-0-frm-dv_cs_education_Program')) {
            y = '1';
            z = '0';
        } else {
            y = '0';
            z = '1';
        }
    } else {
        if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_1-csef-efi-0-frm-dv_cs_education_Program')) {
            y = '1';
            z = '2';
        } else {
            y = '2';
            z = '1';
        }
    }
    document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_Employer').value = PROFILE.employer1;
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_Responsibility', PROFILE.job_desc1);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_JobFunction', PROFILE.job_title1);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_UDFExperience_JobTitleUDF', PROFILE.job_title1);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_UDFExperience_Title', PROFILE.job_title1);
    if (PROFILE.current_job1 == 1 && document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm:dv_cs_experience_CurrentEmployer')) {
        document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm:dv_cs_experience_CurrentEmployer').click();
    }
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_BeginDate.month', PROFILE.job_start_month1 - 1);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_BeginDate.year', PROFILE.job_start_year1);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_EndDate.month', PROFILE.job_end_month1 - 1);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-0-frm-dv_cs_experience_EndDate.year', PROFILE.job_end_year1);
    //select dates of employment
    if (PROFILE.employer2 != "") {
        document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-lblAddWorkExperience').click();
        setTimeout(function() {
            document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_" + x + "-we-wei-1-frm-dv_cs_experience_Employer").value = PROFILE.employer2;
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_Responsibility', PROFILE.job_desc2);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_JobFunction', PROFILE.job_title2);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_UDFExperience_JobTitleUDF', PROFILE.job_title2);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_UDFExperience_Title', PROFILE.job_title2);
            if (PROFILE.current_job2 == 1 && document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm:dv_cs_experience_CurrentEmployer')) {
                document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm:dv_cs_experience_CurrentEmployer').click();
            }
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_BeginDate.month', PROFILE.job_start_month2 - 1);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_BeginDate.year', PROFILE.job_start_year2);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_EndDate.month', PROFILE.job_end_month2 - 1);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-1-frm-dv_cs_experience_EndDate.year', PROFILE.job_end_year2);
        }, 5000);
    }
    if (PROFILE.employer3 != "") {
        document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-lblAddWorkExperience').click();
        setTimeout(function () {
            document.getElementById("et-ef-content-ftf-gp-j_id_id16pc9-page_" + x + "-we-wei-0-frm-dv_cs_experience_Employer").value = PROFILE.employer3;
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_Responsibility', PROFILE.job_desc3);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_JobFunction', PROFILE.job_title3);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_UDFExperience_JobTitleUDF', PROFILE.job_title3);
            tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_UDFExperience_Title', PROFILE.job_title3);
            if (PROFILE.current_job3 == 1 && document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm:dv_cs_experience_CurrentEmployer')) {
                document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm:dv_cs_experience_CurrentEmployer').click();
            }
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_BeginDate.month', PROFILE.job_start_month3 - 1);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_BeginDate.year', PROFILE.job_start_year3);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_EndDate.month', PROFILE.job_end_month3 - 1);
            dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + x + '-we-wei-2-frm-dv_cs_experience_EndDate.year', PROFILE.job_end_year3);
        }, 5000);
    }
    if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_Institution')) {
        tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_Institution', PROFILE.university);
    } else {
        document.evaluate("//*[contains(text(), 'University')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = PROFILE.university;
    }
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_OtherInstitutionCity', PROFILE.uni_city);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_Program', PROFILE.major);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_gpa', PROFILE.gpa);
    tryvalue('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_gpaRange', '4');
    var degreeselect = document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_StudyLevel')
    degreeselect.value = document.evaluate('//*[@id="et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_StudyLevel"]//option[contains(text(), "Bachelor")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value;
    degreeselect.dispatchEvent(inputevent2);
    degreeselect.dispatchEvent(changeevent);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_startDate.month', PROFILE.uni_start_month - 1);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_startDate.year', PROFILE.uni_start_year);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_graduationDate.month', PROFILE.grad_month - 1);
    dateselect('et-ef-content-ftf-gp-j_id_id16pc9-page_' + y + '-csef-efi-0-frm-dv_cs_education_graduationDate.year', PROFILE.grad_year);
    setTimeout(function() {
        taleoflag = false;
    }, 30000)
}

function taleo() {
    if (document.getElementById("dialogTemplate-dialogForm-login-password")) {
        return taleoLogin();
    }
    if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_0-cpi-cfrmsub-frm-dv_cs_candidate_personal_info_FirstName')) {
        return taleoPersonalinfo();
    }
    if (document.getElementById('et-ef-content-ftf-gp-j_id_id16pc9-page_0-we-wei-0-frm-dv_cs_experience_Employer') || 'et-ef-content-ftf-gp-j_id_id16pc9-page_1-we-wei-0-frm-dv_cs_experience_Employer' || 'et-ef-content-ftf-gp-j_id_id16pc9-page_2-we-wei-0-frm-dv_cs_experience_Employer') {
        return taleoExperience();
    } else {
        var clickelement;
        if (document.getElementById("et-ef-content-ftf-saveContinueCmdBottom")) {
            clickelement = document.getElementById("et-ef-content-ftf-saveContinueCmdBottom");
        }
        if (document.getElementById("editTemplateMultipart-editForm-content-ftf-saveContinueCmdBottom")) {
            clickelement = document.getElementById("editTemplateMultipart-editForm-content-ftf-saveContinueCmdBottom");
        }
        function pagechange() {
            setTimeout(function() {
                console.log("checking")
                return taleo();
            }, 7000);
        }
        clickelement.addEventListener("click", pagechange);
        return;
    }    
    //click detect

}