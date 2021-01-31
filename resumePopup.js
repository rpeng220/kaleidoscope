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
  uni_city: "Berkeley",
  gpa: 4,
  major: "Economics",
  degree: "Bachelor",
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

window.addEventListener('load', function() {

function saveProfile() {
    PROFILE.first_name = document.getElementById('fname').value;
    PROFILE.last_name = document.getElementById('lname').value;
    PROFILE.email = document.getElementById('email').value;
    PROFILE.phone = document.getElementById('phone').value;
    PROFILE.linkedin = document.getElementById('linkedin').value;
    PROFILE.website = document.getElementById('website').value;
    PROFILE.github = document.getElementById('github').value;
    PROFILE.street_address = document.getElementById('street_address').value;
    PROFILE.city = document.getElementById('city').value;
    PROFILE.state = document.getElementById('selectstate').value;
    PROFILE.zip_code = document.getElementById('zip_code').value;
    PROFILE.university = document.getElementById('uni_city').value;
    PROFILE.gpa = document.getElementById('gpa').value;
    PROFILE.degree = document.getElementById('selectdegree').value;
    PROFILE.major = document.getElementById('major').value;
    var unistart_arr = document.getElementById('uni_start').value.split('-');
    PROFILE.uni_start_month = parseInt(unistart_arr[1]);
    PROFILE.uni_start_year = unistart_arr[0];
    var grad_arr = document.getElementById('grad_date').value.split('-');
    PROFILE.grad_month = parseInt(grad_arr[1]);
    PROFILE.grad_year = grad_arr[0];
    PROFILE.employer1 = document.getElementById('employer1').value;
    PROFILE.job_title1 = document.getElementById('job_title1').value;
    PROFILE.current_job1 = document.getElementById('current_job1').checked;
    PROFILE.job_location1 = document.getElementById('job_location1').value;
    var job1s_arr = document.getElementById('job_start1').value.split('-');
    PROFILE.job_start_month1 = parseInt(job1s_arr[1]);
    PROFILE.job_start_year1 = job1s_arr[0];
    var jobend1_arr = document.getElementById('job_end1').value.split('-');
    PROFILE.job_end_month1 = parseInt(jobend1_arr[1]);
    PROFILE.job_end_year1 = jobend1_arr[0];
    PROFILE.job_desc1 = document.getElementById('job_desc1').value;
    PROFILE.employer2 = document.getElementById('employer2').value;
    PROFILE.job_title2 = document.getElementById('job_title2').value;
    PROFILE.current_job2 = document.getElementById('current_job2').checked;
    PROFILE.job_location2 = document.getElementById('job_location2').value;
    var job2s_arr = document.getElementById('job_start2').value.split('-');
    PROFILE.job_start_month2 = parseInt(job2s_arr[1]);
    PROFILE.job_start_year2 = job2s_arr[0];
    var jobend2_arr = document.getElementById('job_end2').value.split('-');
    PROFILE.job_end_month2 = parseInt(jobend2_arr[1]);
    PROFILE.job_end_year2 = jobend2_arr[0];
    PROFILE.job_desc2 = document.getElementById('job_desc2').value;
    PROFILE.employer3 = document.getElementById('employer3').value;
    PROFILE.job_title3 = document.getElementById('job_title3').value;
    PROFILE.current_job3 = document.getElementById('current_job3').checked;
    PROFILE.job_location3 = document.getElementById('job_location3').value;
    var job3s_arr = document.getElementById('job_start3').value.split('-');
    PROFILE.job_start_month3 = parseInt(job3s_arr[1]);
    PROFILE.job_start_year3 = job3s_arr[0];
    var jobend3_arr = document.getElementById('job_end3').value.split('-');
    PROFILE.job_end_month3 = parseInt(jobend3_arr[1]);
    PROFILE.job_end_year3 = jobend3_arr[0];
    PROFILE.job_desc3 = document.getElementById('job_desc3').value;
    PROFILE.username = document.getElementById('username').value;
    PROFILE.password = document.getElementById('password').value;
    PROFILE.question = document.getElementById('question').value;
    PROFILE.answer = document.getElementById('answer').value;
    var jsonPROFILE = JSON.stringify(PROFILE);
    chrome.storage.local.set({'profile': jsonPROFILE}, function() {
      document.getElementById('successMessage').style.visibility = "visible";
      chrome.storage.local.get('profile', function(result) {
        PROFILE = JSON.parse(result.profile);
      })
    });
    
  } 

var button = document.getElementById("submit");

if (button) {
  button.onclick = function() {
      saveProfile();
    }
  }
});




