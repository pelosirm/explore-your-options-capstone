//assign active user for user interactions
let activeUser = ''
//api calls

//create new user
function createUser(user) {
   $.ajax({
           url: "/users/create",
           type: "POST",
           dateType: "json",
           data: JSON.stringify(user),
           contentType: "application/json"
       })
       .done(function (results) {
           activeUser = results;

          $('.sign-up').hide();
          $('.header-image').hide();
          $('.search-options').show();
          $('.nav-saved').show();
          $('.nav-login').hide()
          $('.nav-demo').hide();
          $('.nav-signout').show();
          $('.nav-sign-up').hide();
          $('.nav-search').show();
           
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

//login returning user
function loginUser(user) {
   $.ajax({
           url: "/users/login",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(user),
           contentType: "application/json"
       })
       .done(function (results) {
       		activeUser = results;

          $('.sign-up').hide();
          $('.header-image').hide();
          $('.search-options').show();
          $('.nav-saved').show();
          $('.nav-login').hide()
          $('.nav-demo').hide();
          $('.nav-signout').show();
          $('.nav-sign-up').hide();
          $('.nav-search').show();
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

//get college info for building dropdowns
function getCollegeSelection(){
	   $.ajax({
           url: "/college",
           type: "GET",
           dateType: "json",
           contentType: "application/json"
       })
       .done(function (results) {
           buildCollegeDropdown(results);
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

// get job info for building dropdowns
function getAllJobs() {
   $.ajax({
           url: "/jobs",
           type: "GET",
           dateType: "json",
           contentType: "application/json"
       })
       .done(function (results) {
           buildCareerDropdown(results)
           
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

//get results for career query
function getCareerSelection(search) {
	$.ajax({
		url:"/career-search/?career="+search.career+'&state='+search.state,
		type:"GET", 
		dataType: "json", 
		contentType: "application/json"
	})
	.done(function(results){
		buildCareerResults(results);
	})
	.fail(function(jxhqr, error, errorThrown){
		console.log(jxhqr);
		console.log(error);
		console.log(errorThrown);
		alert('error');
	})
}

//get results for college query
function getCollegeSearch(search) {
	$.ajax({
		url:"/college-search/?degree="+search.degree+'&speciality='+search.speciality + '&region='+search.region+'&state=' + search.state,
		type:"GET", 
		dataType: "json", 
		contentType: "application/json"
	})
	.done(function(results){
		buildCollegeResults(results)
	})
	.fail(function(jxhqr, error, errorThrown){
		console.log(jxhqr);
		console.log(error);
		console.log(errorThrown);
		alert('error');
	})
}

//get college details
function getIndividualCollege(id){
	$.ajax({
		url:'/search/'+id, 
		type:'GET', 
		dataType:'json', 
		contentType: 'application/json'
	})
	.done(function(results){
		buildCollegeDetail(results,$('.college-more-detail'),'detail_level')
	})
	.fail(function(jxhqr, error, errorThrown){
		console.log(jxhqr);
		console.log(error);
		console.log(errorThrown)
		alert('error')
	})
}

// add career info to user
function addCareer(careerInfo) {
   $.ajax({
           url: "/career/create-new",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(careerInfo),
           contentType: 'application/json'
       })
       .done(function (results) {
           displayError('Record Added');
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

// add college info to user
function addCollege(collegeId) {
   $.ajax({
           url: "/save-info",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(collegeId),
           contentType: 'application/json'
       })
       .done(function (results) {
           displayError('Record Added');
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

//get saved info by user
function getSavedInfo(user) {
   $.ajax({
           url: "/user-saved-info",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(user),
           contentType: 'application/json'
       })
       .done(function (results) {
       	   buildSavedInfo(results)
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

//get info for saved modals
function getInfoForModal(info){
	   $.ajax({
           url: "/modal-info",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(info),
           contentType: 'application/json'
       })
       .done(function (results) {
       		if (info.category === 'college'){
       			buildCollegeDetail(results[0],$('.modal-fill'))	
       		} else {
       			buildModal(results[0])
       		}
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

//compare college and career
function compareCollege(query){
	   $.ajax({
           url: "/compare",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(query),
           contentType: 'application/json'
       })
       .done(function (results) {
       		buildCompareResults(results)

       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

//delete info from user
function deleteInfo(query) {
   $.ajax({
           url: "/delete-info",
           type: "DELETE",
           dataType: "json",
           data: JSON.stringify(query),
           contentType: 'application/json'
       })
       .done(function (results) {
       		$('.saved-options').empty();
       		let user = {
			user : activeUser
			}
       		getSavedInfo(user);
       	   	displayError('Record Deleted')
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

//format numbers
const numberWithCommas = (x) => {
  if (x == 'undefined'){
    return
  } else if(!x){
    return 
  }else { 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

function resetSearchInputs(){
    $('.search-colleges-input #state-select').val($("#state-select option:first").val());
    $('.search-colleges-input #region-select').val($("#region-select option:first").val());
    $('.search-colleges-input #degree-select').val($("#degree-select option:first").val());
    $('.search-colleges-input #speciality-select').val($("#speciality-select option:first").val());
    $('.search-careers-input #career-select').val($("#career-select option:first").val());
    $('.search-careers-input #state-career-select').val($("#state-career-select option:first").val());
}

//build html for api results 

//fading messages to display alerts and errors
function displayError(message) {
   $(".error-message span").html(message);
   $(".error-message").fadeIn();
   $(".error-message").fadeOut(10000);
};

//build career dropdown input
function buildCareerDropdown(results){
	let htmlOutput = '';
	let jobTitles = results[0];
	let states = results[1]

	htmlOutput += '<form class="form-search-careers"><legend> Search Careers </legend><div class="center-on-page"><div class="select"><select name="career" id="career-select"><option>Select Career</option>'

	for(let i = 0; i < jobTitles.length; i++){
		htmlOutput += `<option value=${jobTitles[i].OCC_CODE}>${jobTitles[i].OCC_TITLE}</option>`
	}
	htmlOutput += '</select></div><div class="select"><select name="state" id="state-career-select"><option>Select State</option>'
	
	for(let i=0; i < states.length; i++){
		htmlOutput += `<option value =${states[i].Abbreviation}>${states[i].State}</option>`
	}
	htmlOutput += '</select></div><input type="submit" value="Submit"></form>'

	$('.search-careers-input').append(htmlOutput)
}

//build input for college values
function buildCollegeDropdown(categories){
	let programs = categories[0];
	let state = categories[1];
	let region = categories[2];

	let htmlOutput = ''

	htmlOutput += '<form class="form-search-colleges">'
	htmlOutput += '<legend> Search Colleges </legend>'
	htmlOutput += '<div class="center-on-page">'
	htmlOutput += '<div class="select">'
	htmlOutput += '<select name="degree" id="degree-select">'
	htmlOutput += '<option>Select Degree</option>'
	htmlOutput += '<option value="2">Associates</option>'
	htmlOutput += '<option value="3,4">Bachelors</option>'
	htmlOutput += '</select>'
	htmlOutput += '</div>'
	htmlOutput += '<div class="select">'
	htmlOutput += '<select name="speciality" id="speciality-select">'
	htmlOutput += '<option>Select Speciality</option>'

	for(let i=0; i< programs.length; i++) {
		htmlOutput += `<option value="${programs[i].PROGRAM}"">${programs[i].PROGRAM}</option>`
	}

	htmlOutput += '</select></div><div class="select"><select name="region" id="region-select"><option>Select Region</option>'

	for(let i=0; i<region.length; i++) {
		htmlOutput += `<option value=${region[i].CODE}>${region[i].REGION}</option>`
	}

	htmlOutput += '</select></div><div class="select"><select name="state" id="state-select"><option>Select State</option>'

	for(let i=0; i<state.length; i++) {
		htmlOutput += `<option value=${state[i].Abbreviation}>${state[i].State}</option>`
	}

	htmlOutput += '</select></div></div><input type="submit" value="Submit"></form>'

	$('.search-colleges-input').append(htmlOutput)
}


//build results for colleges
function buildCollegeResults(results){

	let htmlOutput = '<h1>Search Results </h1><div class="row">'
	
	for(let i=0; i< results.length; i++) {

		htmlOutput += '<div class="col-3">'
        htmlOutput += `<p><span class="heavy emphasis">${results[i].INSTNM}</span><br><span class="light"> ${results[i].CITY}, ${results[i].STABBR}</span></p>`
        htmlOutput += `<ul>`
        htmlOutput += `<li><span class="heavy">Average Annual Cost:</span> $${numberWithCommas(results[i].NPT4)}</li>`
        htmlOutput += `<li><span class="heavy"> Graduation Rate:</span> ${Math.round(results[i].C150_L4_POOLED_SUPP * 100)}% </li>`
        htmlOutput += `<li><span class="heavy">Average Debt:</span> $${numberWithCommas(results[i].GRAD_DEBT_MDN_SUPP)}</li>`
        htmlOutput += `</ul>`
        htmlOutput += `<p class="more-details heavy"><a href="#" id=${results[i]._id}>More Details</a> </p>`
        htmlOutput +=  `</div>`

		if ( i && ((i+1) % 3 === 0)) {
			htmlOutput += '</div><div class="row">'
		} else if ((i+1) === results.length) {
			htmlOutput += '</div>'
			htmlOutput += `<p class="new-search center"><a href="#"> new search </a></p>`
		}
	}
	$('.college-results').append(htmlOutput)

}

//build html for career results
function buildCareerResults(results){
	
	let htmlOutput = ''
	let national = results[0]
	let state = results[1]
	let state_median = ''
	let state_ab = ''

	if(state) {
		state_median = state.A_MEDIAN
		state_ab = state.STATE

	} else {
		state_median = 'No data'
		state_ab = ''

	}
			htmlOutput += `<div class="row career-column"><div class="col-12">`
			htmlOutput += `<p><span class="heavy emphasis orange" id="title-value">${national.OCC_TITLE}</span><br><span class="light" id="state-value"> ${state_ab}</span></p>`
			htmlOutput += `<ul><li><span class="heavy">National Median Salary:</span> <span id="nat-median-value">${numberWithCommas(national.NAT_A_MEDIAN)}</span></li>`
    	htmlOutput += `<li><span class="heavy"> Region Median Salary:</span> <span id="st-median-value">${numberWithCommas(state_median)}</span></li>`
    	htmlOutput += `<li><span class="heavy">Degree Requires:</span> <span id="education-value">${national.EDUCATION}</span></li>`
    	htmlOutput += `<li><span class="heavy">Experience Needed:</span> <span id="experience-value">${national.WORK_EXPERIENCE}</span></li>`
    	htmlOutput += `</ul></div></div><div class="row"><div class="col-12">`
    	htmlOutput += `<button class="save-career-btn"> Save Career</button></div></div>`
      htmlOutput += `<p class="new-search center"><a href="#"> new search </a></p>`

   $('.career-results').append(htmlOutput)

}

//build college detail for saved info modal and for college searches
function buildCollegeDetail(college, input, detail){
	let htmlOutput = ''
	let tags = []
	let speciality = []

	tags.push(college.CONTROL)

	//interate through tags

	if(college.RELAFFIL !== 'NULL') {
		tags.push(college.RELAFFIL)
	}

	if(college.HBCU === 1){
		tags.push('Historically Black Colleges')
	}

	if(college.PBI === 1) {
		tags.push('Predominantly Black Institution')
	}

	if(college.ANNHI === 1){
		tags.push('Alaska Native Native Hawaiian serving institution')
	}

	if(college.TRIBAL === 1) {
		tags.push('tribal college and university')
	}

	if(college.AANAPII === 1){
		tags.push('Asian American Native American Pacific Islander-serving institution')
	}

	if(college.HSI === 1){
		tags.push('Hispanic-serving institution')
	}

	if(college.NANTI === 1){
		tags.push('Native American non-tribal institution')
	}

	if(college.MENONLY === 1){
		tags.push('Men Only')
	}

	if(college.WOMENONLY === 1){
		tags.push('Women Only')
	}


	for(let prop in college){
		if(prop.match(/01/)){
			speciality.push([prop.slice(2),(Math.round(college[prop]*100))])
		}

	}

	//arrange specialties by popularity
	speciality.sort(function(a,b){
		return b[1] - a[1]
	})



	htmlOutput += '<div class="row career-column">'
	htmlOutput += '<div class="col-12">'    
	htmlOutput += `<p><span class="heavy emphasis">${college.INSTNM}</span><br><span class="light"> ${college.CITY}, ${college.STABBR}</span><br>${numberWithCommas(college.UGDS)} undergraduate students</p>`
  htmlOutput += `<ul>` 
  htmlOutput +=  `<li><span class="heavy"> School Details: </span>`

    for(let i=0; i<tags.length; i++){
    	if(i !== (tags.length-1))  {
    		htmlOutput += ` ${tags[i]} |`
    	} else {
    		htmlOutput += ` ${tags[i]}`
    	}
    }

    htmlOutput  += `</li><li><span class="heavy">Average Annual Cost:</span> $ ${numberWithCommas(college.NPT4)}</li>` 
    htmlOutput 	+= `<li><span class="heavy"> Graduation Rate:</span> ${Math.round(college.C150_L4_POOLED_SUPP*100)} %</li>`
    htmlOutput 	+= `<li><span class="heavy">Average Debt:</span> $${college.GRAD_DEBT_MDN_SUPP}</li>`
    htmlOutput 	+= `<button class="accordion">`
    htmlOutput 	+= `<i class="fa fa-chevron-down" aria-hidden="true"></i> Cost Details </button>`
    htmlOutput 	+= `<div class="panel">`
    htmlOutput 	+= `<p> Average annual cost by income bracket </p>`
    htmlOutput 	+= `<table>`
    htmlOutput 	+= `<table>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<th>Income Level</th>`
    htmlOutput 	+= `<th>Cost</th>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> Average Annual Cost : </span></td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT4)} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $0 - $30,000 : </span> </td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT41)} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $30,001-$48,000 : </span></td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT42)}</td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $48,001-$75,000 : </span>  </td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT43)} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $75,001-$110,000 : </span> </td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT44)} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $75,001-$110,000 : </span> </td>`
    htmlOutput 	+= `<td>$${numberWithCommas(college.NPT45)} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `</table>`
    htmlOutput 	+= `</div>`
    htmlOutput 	+= `<button class="accordion">`
    htmlOutput 	+= `<i class="fa fa-chevron-down" aria-hidden="true"></i> Program Details </button>`
    htmlOutput 	+= `<div class="panel">`
    htmlOutput 	+= '<p> Most Popular Programs</p><ul>'

    for(let i=0;i<5; i++){
    	htmlOutput += `<li>${i+1}. ${speciality[i][0]} - ${speciality[i][1]}% </li>`
    }

    htmlOutput += '</ul><p> Other Programs Offered </p><ul>'

    for(let i=5; i<speciality.length;i++){
    	if(speciality[i][1] !== 0) {
    		htmlOutput += `<li> ${speciality[i][0]} </li>`
    	}
    	
    }

    htmlOutput += '</ul></div></div>'
    
    // if not modal add save button 
    if(detail == 'detail_level') {
    	htmlOutput += '<div class="row">'
    	htmlOutput += '<div class="col-12">'
    	htmlOutput += `<button class="save-college-btn" id=${college._id}> Save College</button>`
    	htmlOutput += `</div></div>`
    	htmlOutput += `<p class="return-search new-search center"><a href="#"> return to search </a></p>`
    }

    htmlOutput += `</div>`

    input.append(htmlOutput);
}

//build saved info for users
function buildSavedInfo(results){
	let htmlOutput = ''

	htmlOutput += '<div class="row">'
	htmlOutput += '<div class="col-12">'
	htmlOutput += '<h1> Saved Info </h1>'
	htmlOutput += '<p class="divide"> select one career and one college to compare return on investment </p>'
	htmlOutput += '<p class="divide orange"> careers </p>'
 
	for(let i =0; i< results[1].length; i++){
		htmlOutput += `<label class="checkbox-container" id=${results[1][i]._id}>${results[1][i].career}<a href="#" class="modal_trigger info"><i class="fas fa-info"></i></a><a href="#" class="delete"><i class="fas fa-times"></i></a>`
		htmlOutput += `<input type="checkbox" name='career'>`
		htmlOutput += '<span class="checkmark"></span></label>'
	}

	htmlOutput += '<p class="divide orange"> colleges</p>'

	for(let i=0; i<results[0].length;i++){
		htmlOutput += `<label class="checkbox-container" id=${results[0][i]._id}>${results[0][i].INSTNM}<a href="#" class="modal_trigger info"><i class="fas fa-info"></i></a><a href="#" class="delete"><i class="fas fa-times"></i></a>`
		htmlOutput += `<input type="checkbox" name="college"><span class="checkmark"></span></label>`                      
	}
	
	htmlOutput += '</div></div><div class="row"><div class="col-12"><button class="compare-button"> Compare</button></div></div>'

	$('.saved-options').append(htmlOutput);

}

//build modal detail for the saved info
function buildModal(info){
	let htmlOutput = ''

	htmlOutput += `<div class="col-12">`
	htmlOutput += `<p><span class="heavy emphasis orange">${info.career}</span><br><span class="light" id="state-value"> ${info.state}</span></p>`
	htmlOutput += `<ul><li><span class="heavy">National Median Salary:</span> <span id="nat-median-value">${numberWithCommas(info.nat_a_median)}</span></li>`
  htmlOutput += `<li><span class="heavy"> Region Median Salary:</span> <span id="st-median-value">${numberWithCommas(info["st-median-value"])}</span></li>`
  htmlOutput += `<li><span class="heavy">Degree Requires:</span> <span id="education-value">${info.education}</span></li>`
  htmlOutput += `<li><span class="heavy">Experience Needed:</span> <span id="experience-value">${info.experience}</span></li>`
  htmlOutput += `</ul></div></div>`

    $('.modal-fill').append(htmlOutput)
}


//build html for comparison results
function buildCompareResults(results){

	let calculationData = {}

	if(results[0][0]["st_a_median"] === 'No data' || results[0][0]["st_a_median"] === ''){
		let salary = results[0][0]['nat_a_median'].replace(',','')
		calculationData.salary = parseInt(salary)
	} else{
		let salaryNat = results[0][0]['st_a_median'].replace(',','')
		calculationData.salary = parseInt(salaryNat)
	}

	let ROI = ((calculationData.salary * 20) - 827136 - (results[1][0]['NPT4'] * 4))

	let htmlOutput = '' 
	htmlOutput += '<div class="row">'
	htmlOutput += '<div class="col-12">'
	htmlOutput += `<p><span class="light">as a </span><span class="heavy emphasis orange">${results[0][0]['career']}</span><br><span class="light"> attending</span><span class="heavy emphasis orange"> ${results[1][0]['INSTNM']}</span></p>`
	htmlOutput += `<p><span class="light"> return on investment over 20 years: </span><br><span class="heavy emphasis orange">$${numberWithCommas(ROI)}</span></p>`
	htmlOutput += '</div></div>'
	htmlOutput += `<p class="new-search center back"><a href="#"> back </a></p>`

	$('.comparison').append(htmlOutput)
}

//page manipulation and trigger events

$(document).ready(function () {
	$('.sign-up').hide();
	$('.nav-signout').hide();
	$('.nav-saved').hide();
	$('.nav-search').hide();
	$('.search-options').hide();
	$('.search-careers-input').hide();
	$('.search-colleges-input').hide();
	$('.college-results').hide();
	$('.career-results').hide();
	$('.college-more-detail').hide();
	$('.saved-options').hide();
	$('.comparison').hide();
	$('.error-message').hide();


	//set up for search input
	getAllJobs();
	getCollegeSelection();


	//set background for log in options
	$('.sign-up-btn').on('click', function (event) {
		event.preventDefault();
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').hide();
		$('.create-new').show();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')

	})

	//for returing users
	$('.nav-login').on('click', function () {
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').show();
		$('.create-new').hide();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')
	})

	//for new users
	$('.nav-sign-up').on('click', function () {
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').hide();
		$('.create-new').show();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')
	})

  $('.nav-signout').on('click',function(){
    location.reload()
  })

	//for new searches
	$('.nav-search').on('click',function(){
		$('.comparison').hide();
		$('.college-results').hide();
		$('.search-options').show();
		$('.career-results').hide();
		$('.career-results').empty();
		$('.college-results').empty();
		$('.college-more-detail').empty();
		$('.comparison').empty();
    $('.saved-options').empty();
    resetSearchInputs();
	})

	//nav bar new search
	$('.new-search').on('click', function(){
    $('.comparison').empty();
		$('.comparison').hide();
		$('.college-results').hide();
		$('.search-options').show();
		$('.career-results').hide();
		$('.career-results').empty();
		$('.college-results').empty();
		$('.college-more-detail').empty();
    $('.saved-options').empty();

	})

	//navigation for saved values
	$('.navigation').on('click','.nav-saved',function(){
    $('.saved-options').empty();
		$('.how-it-works').hide();
		$('header').hide();
		$('.how-it-works').hide();
		$('.sign-up').hide();
		$('.search-options').hide();
		$('.college-results').hide();
		$('.college-more-detail').hide();
		$('.career-results').hide();
		$('.saved-options').show();
		let user = {
			user : 'riley'
		}
		getSavedInfo(user)

	})

	  //create new user
   $('.form-create-new').on('submit', function (event) {

       event.preventDefault();
       let form = document.body.querySelector('.form-create-new');

       if (form.checkValidity && !form.checkValidity()) {
           return;
       }

       let user = $('.form-create-new [name=username]').val();
       let password = $('.form-create-new [name=password]').val();
       let confirmPassword = $('.form-create-new [name=confirmPassword]').val();

       if (password !== confirmPassword) {
           displayError('Passwords must match!')
       } else {

           let newUser = {
               username: user,
               password: password
           }
           createUser(newUser);

           $('.form-create-new [name=username]').val('');
           $('.form-create-new [name=password]').val('');
           $('.form-create-new [name=confirmPassword]').val('');

   		$('.sign-up').hide();
			$('.header-image').hide();
			$('.search-options').show();
			$('.nav-saved').show();
			$('.nav-login').hide()
			$('.nav-demo').hide();
			$('.nav-signout').show();
			$('.nav-sign-up').hide();
			$('.nav-search').show();
       }
   })

  
   //login returning user
  $('.form-returning-user').on('submit', function (event) {
       event.preventDefault();
       let form = document.body.querySelector('.form-returning-user');

       if (form.checkValidity && !form.checkValidity()) {
           return;
       }
       let user = $('.form-returning-user [name=username]').val();
       let password = $('.form-returning-user [name=password]').val();

       let returingUser = {
           username: user,
           password: password
       }
       loginUser(returingUser);

       $('.form-returning-user [name=username]').val('');
       $('.form-returning-user [name=password]').val('');

   })


	//page manipulation for switching career and college search

	$('.search-careers').on('click', function () {
		$('.search-careers-input').show();
		$('.search-careers').hide();
		$('.search-colleges').show();
		$('.search-colleges-input').hide();
		$('.career-results').hide();
		$('.comparison').hide();
	})

	$('.search-colleges').on('click', function () {
		$('.search-careers-input').hide();
		$('.search-careers').show();
		$('.search-colleges').hide();
		$('.search-colleges-input').show();
		$('.career-results').hide();
		$('.comparison').hide();

	})

	//form submit for college search
	$('.search-colleges-input').on('submit','.form-search-colleges', function(event){

		event.preventDefault();
		let degree = $( "#degree-select option:selected" ).val();
		let speciality = '01'+$( "#speciality-select option:selected" ).val();
		

		let region = undefined
		let state = undefined

		if($('.search-colleges-input #state-select').val()== 'Select State'){
			region = $( "#region-select option:selected" ).val();
		} else {
			state = $( "#state-select option:selected" ).val();
		}

		let collegeSearch = {
			degree : degree, 
			speciality : speciality, 
			region : region,
			state : null

		}

		getCollegeSearch(collegeSearch)

		$('.search-options').hide();
		$('.college-results').show();
	})

	//form submit for career search
	$('.search-careers-input').on('submit','.form-search-careers', function(event){
		event.preventDefault();
		let career = $( "#career-select option:selected" ).val();
		let state = $("#state-career-select option:selected").val();

		let search = {
			career : career, 
			state : state
		}

		getCareerSelection(search) 
		$('.search-options').hide();
		$('.career-results').show();
	})

	$('.more-details').on('click', function() {
		$('.college-results').hide();
		$('.search-options').hide();
		$('.college-more-detail').show();
		$('.career-results').hide();
	})

	$('.college-results').on('click','.more-details',function(event){
		const individualCollege = event.target.id
		getIndividualCollege(individualCollege);
		$('.college-more-detail').show();
		$('.college-results').hide();
		$('.search-options').hide();
		$('.career-results').hide();

	})

	// save career information
	$('.career-results').on('click','.save-career-btn', function(){
		let career = {
			career : '', 
			state : '', 
			nat_a_median : '',
			st_a_median : '', 
			education : '', 
			experience : '', 
			user : 'riley'
		}

		career.career = $('.career-results').find('#title-value').text()
		career.state = $('.career-results').find('#state-value').text()
		career.nat_a_median = $('.career-results').find('#nat-median-value').text()
		career.st_a_median = $('.career-results').find('#st-median-value').text()
		career.education = $('.career-results').find('#education-value').text()
		career.experience = $('.career-results').find('#experience-value').text()

		addCareer(career)
	})

	//save college information
	$('.college-more-detail').on('click','.save-college-btn',function(event){
		event.preventDefault();
		let query = {
			id : event.target.id
		}
		
		addCollege(query)
	})

	// reset search values
	$('.career-results').on('click','.new-search a',function(){
		$('.college-results').hide();
		$('.search-options').show();
		$('.career-results').hide();
		$('.career-results').empty();
		$('.college-results').empty();
		$('.college-more-detail').empty();
    resetSearchInputs();


	})

	$('.college-results').on('click','.new-search a',function(){
		$('.college-results').hide();
		$('.search-options').show();
		$('.career-results').hide();
		$('.career-results').empty();
		$('.college-results').empty();
		$('.college-more-detail').empty();
		$('.comparison').empty();
    resetSearchInputs();

	})


	//compare button for college and career to get ROI
	$('.saved-options').on('click','.compare-button', function(){
		let query = {

		}
		query.college = $('.saved-options input:checkbox[name="college"]:checked').closest('label').attr('id')
		query.career = $('.saved-options input:checkbox[name="career"]:checked').closest('label').attr('id')
		compareCollege(query)

		$('.college-results').hide();
		$('.search-options').hide();
		$('.college-more-detail').hide();
		$('.career-results').hide();
		$('.saved-options').hide();
		$('.comparison').show();
	})


	//return from comparison screen
	$('.comparison').on('click','.back',function(event){
		$('.comparison').empty();
		let user = {
			user : activeUser
		}
		getSavedInfo(user)
		$('.saved-options').show();
		$('.comparison').hide();
		$('.saved-options').empty();
	})

	//return from college detailed view

	$('.college-more-detail').on('click','.return-search',function(){
		$('.college-more-detail').empty();
		$('.college-more-detail').hide();
		$('.college-results').show();
	})

	//reset 
	$('.home').on('click', function () {
		location.reload();
	})

	//expand list toggles
    $('.college-more-detail').on('click','.accordion', function () {
        this.classList.toggle("active");
        $(this).next().toggle();
    })

    $('.modal-fill').on('click','.accordion', function () {
        this.classList.toggle("active");
        $(this).next().toggle();
    })


    //checkbox manipulation to insure one selection per group
    $(".saved-options").on('click','input:checkbox', function() {
  		var $box = $(this);
  		if ($box.is(":checked")) {
   		var group = "input:checkbox[name='" + $box.attr("name") + "']";
    	$(group).prop("checked", false);
    		$box.prop("checked", true);
  		} else {
    	$box.prop("checked", false);
  		}
	});

    //input manipulation to insure either state or region selected
	$('.search-colleges-input').on('change','#region-select',function(){
     	$('.search-colleges-input #state-select').val($("#state-select option:first").val());
	});

	$('.search-colleges-input').on('change','#state-select',function(){
     	$('.search-colleges-input #region-select').val($("#region-select option:first").val());
	});


    //modal activation
	let modal = document.getElementById('myModal');
	let span = document.getElementsByClassName("close")[0];

	span.onclick = function() {
    	modal.style.display = "none";
	}

	window.onclick = function(event) {
    	if (event.target == modal) {
        	modal.style.display = "none";
    	}
	}

	//activate the modal information for more info in saved info page
	$('.saved-options').on('click','.info', function(event){

		let categoryName = $(this).next().next().attr('name'); 
		let idValue = event.target.closest('label').id;

		$('.modal-fill').empty();

		var modal = document.getElementById('myModal');
		modal.style.display = "block";

		let query = {
			category : categoryName, 
			id : idValue
		}

		getInfoForModal(query)
	})

	//delete saved info
	$('.saved-options').on('click','.delete', function(event){
		let query = {
			id : event.target.closest('label').id, 
			category :$(this).next().attr('name')
		}

		deleteInfo(query)
	})
})
