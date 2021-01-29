function lever() {
    document.getElementsByName("name")[0].value = PROFILE.first_name;
    document.getElementsByName("email")[0].value = PROFILE.email;
    document.getElementsByName("phone")[0].value = PROFILE.phone;
    if (PROFILE.current_job1 == 1) {
        document.getElementsByName("org")[0].value = PROFILE.employer1;
    } else if (PROFILE.current_job2 == 1) {
        document.getElementsByName("org")[0].value = PROFILE.employer2;
    } else if (PROFILE.current_job3 == 1) {
        document.getElementsByName("org")[0].value = PROFILE.employer3;
    }
    document.getElementsByName("urls[LinkedIn]")[0].value = PROFILE.linkedin;
    document.getElementsByName("urls[GitHub]")[0].value = PROFILE.github;
    document.getElementsByName("urls[Portfolio]")[0].value = PROFILE.website;
    completeNotification();
    // now submit resume
}