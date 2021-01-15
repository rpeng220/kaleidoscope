var changeevent = new Event('change', {
    bubbles: true,
});


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
    countryselect.dispatchEvent(changeevent);
}