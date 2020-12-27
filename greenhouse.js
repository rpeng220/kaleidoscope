import trytype from main

function greenhouse() {
    trytype("input[id='first_name']", PROFILE.first_name)
    trytype("input[id='last_name']", PROFILE.last_name)
    trytype("input[id='email']", PROFILE.email)
    trytype("input[id='phone']", PROFILE.phone)
    trytype("input[aria-label='Education Start Month']", PROFILE.uni_start_month)
    trytype("input[aria-label='Education Start Year']", PROFILE.uni_start_year)
    trytype("input[aria-label='Education End Month']", PROFILE.grad_month)
    trytype("input[aria-label='Education End Year']", PROFILE.grad_year)
}