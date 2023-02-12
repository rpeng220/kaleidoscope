

var PROFILE = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  linkedin: "",
  website: "",
  github: "",
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  university: "",
  uni_city: "",
  gpa: 4,
  major: "",
  degree: "",
  uni_start_month: 8,
  uni_start_year: "2017",
  grad_month: 9,
  grad_year: "2021",
  degree_received: 1,
  employer1: "",
  job_title1: "",
  current_job1: 0,
  job_location1: "",
  job_start_month1: 8,
  job_start_year1: "",
  job_end_month1: 3,
  job_end_year1: "",
  job_desc1: ``,
  employer2: "",
  job_title2: "",
  current_job2: 1,
  job_location2: "",
  job_start_month2: 3,
  job_start_year2: "",
  job_end_month2: 4,
  job_end_year2: "",
  job_desc2: ``,
  employer3: "",
  job_title3: "",
  current_job3: 1,
  job_location3: "",
  job_start_month3: 3,
  job_start_year3: "",
  job_end_month3: 4,
  job_end_year3: "",
  job_desc3: ``,
  username: "",
  password: "",
  question: "bagool",
  answer: "bafool"
}

/**
 * Copyright (c) 2020 Finn Thompson, licensed under the MIT License.
 * 
 * This module implements form persistence across sessions via local storage.
 * * Register a form for persistence with `FormPersistence#persist(form[, options])`.
 * * Save a form to local storage with `FormPersistence#save(form[, options])`.
 * * Load a saved form (e.g. at window load time) with `FormPersistence#load(form[, options])`.
 * * Clear saved form data with `FormPersistence#clearStorage(form[, options])`.
 * * Serialize form data to an object with `FormPersistence#serialize(form[, options])`.
 * * Deserialize a data object into a form with `FormPersistence#deserialize(form, data[, options])`.
 * 
 * See https://github.com/FThompson/FormPersistence.js
 */
 const FormPersistence = (function () {
  /**
   * Registers the given form for persistence by saving its data to local or session storage.
   * Saved form data will be stored upon page refresh and cleared upon form submission.
   * Saved form data will be loaded upon calling this function, typically on page load.
   * 
   * @param {HTMLFormElement} form    The form to make persistent.
   * @param {Object}          options Options object containing any of the following:
   *  * uuid - A unique identifier for this form's storage key.
   *           Required if using a form without an id. If unspecified, form id will be used.
   *  * useSessionStorage - Use session storage if `true`, local storage if `false`. Default `false`.
   *  * saveOnSubmit - Save form data upon submit if `true`. Default `false`.
   *  * valueFunctions - Special value functions to apply, like `name: fn(form, value)`.
   *  * include - Define a whitelist array of data names to include.
   *  * exclude - Define a blacklist array of data names to exclude.
   *  * includeFilter - Define a whitelist filter function that inputs an element and outputs a boolean. The element
   *                    is included if the function returns true.
   *  * excludeFilter - Define a blacklist filter function that inputs an element and outputs a boolean. The element
   *                    is excluded if the function returns true.
   */
  function persist(form, options) {
      let defaults = {
          saveOnSubmit: false
      }
      let config = Object.assign({}, defaults, options)
      load(form, config)
      // Some devices like ios safari do not support beforeunload events.
      // Unload event does not work in some situations, so we use both unload/beforeunload
      // and remove the unload event if the beforeunload event fires successfully.
      // If problems persist, we can add listeners on the pagehide event as well.
      let saveForm = () => save(form, config)
      let saveFormBeforeUnload = () => {
          window.removeEventListener('unload', saveForm)
          saveForm()
      }
      window.addEventListener('beforeunload', saveFormBeforeUnload)
      window.addEventListener('unload', saveForm)
      if (!config.saveOnSubmit) {
          form.addEventListener('submit', () => {
              window.removeEventListener('beforeunload', saveFormBeforeUnload)
              window.removeEventListener('unload', saveForm)
              clearStorage(form, config)
          })
      }
  }

  /**
   * Serializes the given form into an object, excluding password and file inputs.
   * 
   * @param {HTMLFormElement} form    The form to serialize.
   * @param {Object}          options Options object containing any of the following:
   *  * include - Define a whitelist array of data names to include.
   *  * exclude - Define a blacklist array of data names to exclude.
   *  * includeFilter - Define a whitelist filter function that inputs an element and outputs a boolean. The element
   *                    is included if the function returns true.
   *  * excludeFilter - Define a blacklist filter function that inputs an element and outputs a boolean. The element
   *                    is excluded if the function returns true.
   * 
   * @return {Object} The serialized data object.
   */
  function serialize(form, options) {
      let defaults = {
          include: [],
          exclude: [],
          includeFilter: null,
          excludeFilter: null
      }
      let config = Object.assign({}, defaults, options)
      let data = {}
      for (let element of form.elements) {
          let tag = element.tagName
          let type = element.type
          if (tag === 'INPUT' && (type === 'file')) {
              continue // do not serialize files
          }
          if (isNameFiltered(element.name, config.include, config.exclude)
                  || isElementFiltered(element, config.includeFilter, config.excludeFilter)) {
              continue
          }
          if (tag === 'INPUT') {
              let type = element.type
              if (type === 'radio') {
                  if (element.checked) {
                      pushToArray(data, element.name, element.value)
                  }
              } else if (type === 'checkbox') {
                  pushToArray(data, element.name, element.checked)
              } else {
                  pushToArray(data, element.name, element.value)
              }
          } else if (tag === 'TEXTAREA') {
              pushToArray(data, element.name, element.value)
          } else if (tag === 'SELECT') {
              if (element.multiple) {
                  for (let option of element.options) {
                      if (option.selected) {
                          pushToArray(data, element.name, option.value)
                      }
                  }
              } else {
                  pushToArray(data, element.name, element.value)
              }
          }
      }
      return data
  }

  /**
   * Add a value to an object, creating an array to place it in if needed.
   */
  function pushToArray(dict, key, value) {
      if (!(key in dict)) {
          dict[key] = []
      }
      dict[key].push(value)
  }

  /**
   * Checks if the given name should be filtered out.
   */
  function isNameFiltered(name, include, exclude) {
      if (!name) {
          return true
      }
      if (exclude.includes(name)) {
          return true
      }
      if (include.length > 0 && !include.includes(name)) {
          return true
      }
      return false
  }

  /**
   * Checks if the given element should be filtered out, either by name or by predicate.
   */
  function isElementFiltered(element, includeFilter, excludeFilter) {
      if (excludeFilter && excludeFilter(element)) {
          return true
      }
      if (includeFilter && !includeFilter(element)) {
          return true
      }
      return false
  }

  /**
   * Saves the given form to local or session storage.
   * 
   * @param {HTMLFormElement} form    The form to serialize to local storage.
   * @param {Object}          options Options object containing any of the following:
   *  * uuid - A unique identifier for this form's storage key.
   *           Required if using a form without an id. If unspecified, form id will be used.
   *  * useSessionStorage - Use session storage if `true`, local storage if `false`. Default `false`.
   *  * include - Define a whitelist array of data names to include.
   *  * exclude - Define a blacklist array of data names to exclude.
   *  * includeFilter - Define a whitelist filter function that inputs an element and outputs a boolean. The element
   *                    is included if the function returns true.
   *  * excludeFilter - Define a blacklist filter function that inputs an element and outputs a boolean. The element
   *                    is excluded if the function returns true.
   */
  function save(form, options) {
      let defaults = {
          uuid: null,
          useSessionStorage: false
      }
      let config = Object.assign({}, defaults, options)
      let data = serialize(form, config)
      let storage = config.useSessionStorage ? sessionStorage : localStorage
      storage.setItem(getStorageKey(form, config.uuid), JSON.stringify(data))
  }

  /**
   * Loads a given form by deserializing given data, optionally with given special value handling functions.
   * 
   * @param {HTMLFormElement} form    The form to deserialize data into.
   * @param {Object}          data    The data object to deserialize into the form.
   * @param {Object}          options Options object containing any of the following:
   *  * valueFunctions - Special value functions to apply, like `name: fn(form, value)`.
   *  * include - Define a whitelist array of data names to include.
   *  * exclude - Define a blacklist array of data names to exclude.
   *  * includeFilter - Define a whitelist filter function that inputs an element and outputs a boolean. The element
   *                    is included if the function returns true.
   *  * excludeFilter - Define a blacklist filter function that inputs an element and outputs a boolean. The element
   *                    is excluded if the function returns true.
   */
  function deserialize(form, data, options) {
      let defaults = {
          valueFunctions: null,
          include: [],
          exclude: [],
          includeFilter: null,
          excludeFilter: null
      }
      let config = Object.assign({}, defaults, options)
      // apply given value functions first
      let speciallyHandled = []
      if (config.valueFunctions !== null) {
          speciallyHandled = applySpecialHandlers(data, form, config)
      }
      // fill remaining values normally
      for (let name in data) {
          if (isNameFiltered(name, config.include, config.exclude)) {
              continue
          }
          if (!speciallyHandled.includes(name)) {
              let inputs = [...form.elements].filter(element => element.name === name
                      && !isElementFiltered(element, config.includeFilter, config.excludeFilter))
              inputs.forEach((input, i) => {
                  applyValues(input, data[name], i)
              })
          }
      }
  }

  /**
   * Loads a given form from local or session storage, optionally with given special value handling functions.
   * Does nothing if no saved values are found.
   * 
   * @param {HTMLFormElement} form    The form to load saved values into.
   * @param {Object}          options Options object containing any of the following:
   *  * uuid - A unique identifier for this form's storage key.
   *           Required if using a form without an id. If unspecified, form id will be used.
   *  * useSessionStorage - Use session storage if `true`, local storage if `false`. Default `false`.
   *  * valueFunctions - Special value functions to apply, like `name: fn(form, value)`.
   *  * include - Define a whitelist array of data names to include.
   *  * exclude - Define a blacklist array of data names to exclude.
   *  * includeFilter - Define a whitelist filter function that inputs an element and outputs a boolean. The element
   *                    is included if the function returns true.
   *  * excludeFilter - Define a blacklist filter function that inputs an element and outputs a boolean. The element
   *                    is excluded if the function returns true.
   */
  function load(form, options) {
      let defaults = {
          uuid: null,
          useSessionStorage: false
      }
      let config = Object.assign({}, defaults, options)
      let storage = config.useSessionStorage ? sessionStorage : localStorage
      let json = storage.getItem(getStorageKey(form, config.uuid))
      if (json) {
          let data = JSON.parse(json)
          deserialize(form, data, options)
      }
  }

  /**
   * Clears a given form's data from local or session storage.
   * 
   * @param {HTMLFormElement} form              The form to clear stored data for.
   * @param {Object}          options Options object containing any of the following:
   *  * uuid - A unique identifier for this form's storage key.
   *           Required if using a form without an id. If unspecified, form id will be used.
   *  * useSessionStorage - Use session storage if `true`, local storage if `false`. Default `false`.
   */
  function clearStorage(form, options) {
      let defaults = {
          uuid: null,
          useSessionStorage: false
      }
      let config = Object.assign({}, defaults, options)
      let storage = config.useSessionStorage ? sessionStorage : localStorage
      storage.removeItem(getStorageKey(form, config.uuid))
  }

  /**
   * Applies the given values to the given element.
   * Adds any checkbox elements checked to the given array.
   * 
   * @param {HTMLElement} element The element to apply values to.
   * @param {Array} values        The array of values. Some element types use the first element instead of the index.
   * @param {Number} index        The index of the value array to apply if applicable.
   * @param {Array} checkedBoxes  The array of checkboxes to add any clicked checkboxes to.
   */
  function applyValues(element, values, index) {
      let tag = element.tagName
      if (tag === 'INPUT') {
          let type = element.type
          if (type === 'radio') {
              element.checked = (element.value === values[0])
          } else if (type === 'checkbox') {
              element.checked = values[index]
          } else {
              element.value = values[index]
          }
      } else if (tag === 'TEXTAREA') {
          element.value = values[index]
      } else if (tag === 'SELECT') {
          if (element.multiple) {
              for (let option of element.options) {
                  option.selected = values.includes(option.value)
              }
          } else {
              element.value = values[index]
          }
      }
  }

  /**
   * Runs given value handling functions in place of basic value insertion.
   * 
   * Note that inclusion and exclusion filter functions do not apply here.
   * 
   * @param {Object}          data           The form data being loaded.
   * @param {HTMLFormElement} form           The HTML form being loaded.
   * @param {Object}          valueFunctions The special value functions, like `name: fn(form, value)`.
   * 
   * @return {Array} An array containing the data entry names that were handled.
   */
  function applySpecialHandlers(data, form, options) {
      let speciallyHandled = []
      for (let fnName in options.valueFunctions) {
          if (fnName in data) {
              if (isNameFiltered(fnName, options.include, options.exclude)) {
                  continue
              }
              for (let value of data[fnName]) {
                  options.valueFunctions[fnName](form, value)
              }
              speciallyHandled.push(fnName)
          }
      }
      return speciallyHandled
  }

  /**
   * Creates a local storage key for the given form.
   * 
   * @param {HTMLFormElement} form The form to create a storage key for.
   * 
   * @return {String} The unique form storage key.
   * @throws {Error} If given a form without an id or uuid.
   */
  function getStorageKey(form, uuid) {
      if (!uuid && !form.id) {
          throw Error('form persistence requires a form id or uuid')
      }
      return 'form#' + (uuid ? uuid : form.id)
  }

  /**
   * Return the public interface of FormPersistence.
   */
  return {
      persist: persist,
      load: load,
      save: save,
      clearStorage: clearStorage,
      serialize: serialize,
      deserialize: deserialize
  }
})();

/**
* Export the module if applicable.
*/
(function () {
  // istanbul ignore else
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = exports = FormPersistence
  }
})();

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
      PROFILE.university = document.getElementById('university').value;
      PROFILE.uni_city = document.getElementById('uni_city').value;
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
  let form = document.getElementById('profile');
  FormPersistence.persist(form);

  if (button) {
    button.onclick = function() {
        saveProfile();
      }
    }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-188515357-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();