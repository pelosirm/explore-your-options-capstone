////assign active user for user interactions
let activeUser = '';
//
//// api calls
//
////fading messages to display alerts and errors
//function displayError(message) {
//    $(".error-message span").html(message);
//    $(".error-message").fadeIn();
//    $(".error-message").fadeOut(10000);
//};
//
//create new user
function createUser(user) {
   $.ajax({
           url: "http://localhost:8080//users/create",
           type: "POST",
           dateType: "json",
           data: JSON.stringify(user),
           contentType: "application/json"
       })
       .done(function (results) {
           console.log(results)
           
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
           url: "http://localhost:8080//users/login",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(user),
           contentType: "application/json"
       })
       .done(function (results) {
       		console.log(results)
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

//
//// page manipulation
//
////hide for search functionality
//function search() {
//    $('.header-intro').show();
//    $('.search-input').show();
//    $('.header-text').hide();
//    $('.header-image').show();
//    $('.my-trips').hide();
//    $('.search-results').hide();
//    $('.returning-user').hide();
//    $('.create-new').hide();
//    $('.nav-login').hide();
//    $('.nav-sign-up').hide();
//    $('.nav-signout').show();
//    $('.nav-trips').show();
//    $('.nav-demo').hide();
//    $('.nav-search').show();
//    $('.nav-signout').show();
//    $('.demo-user').hide();
//
//}
//
////hide info to show user trips
//function myTrips() {
//    $('.my-trips').show();
//    $('.trips-list').show();
//    $('.header-intro').hide();
//    $('.search-input').hide();
//    $('.header-text').hide();
//    $('.search-results').hide();
//    $('.header-image').hide();
//    $('.nav-login').hide();
//    $('.nav-sign-up').hide();
//    $('.nav-trips').show();
//    $('.nav-demo').hide();
//    $('.nav-search').show();
//    $('.nav-signout').show();
//    $('.demo-user').hide();
//}
//
//$(document).ready(function () {
//
//    //this is the front end page loading
//    $('.login').hide();
//    $('.search-input').hide();
//    $('.search-results').hide();
//    $('.my-trips').hide();
//    $('.nav-signout').hide();
//    $('.nav-trips').hide();
//    $('.nav-search').hide();
//    $('.nav-signout').hide();
//    $('.my-trips').hide();
//    $('.error-message').hide();
//    $('.demo-user').hide();
//
//    // nav bar scroll
//    $(document).scroll(function () {
//        let $nav = $(".navbar-fixed-top");
//        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
//    });
//
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
//
//    //get hikes from external api
//    $('.search-location').on('submit', function (event) {
//        event.preventDefault();
//        let locationValue = encodeURI($('#location').val());
//
//        $('.search-results').empty();
//
//        getHikes(locationValue);
//
//        $('#location').val('');
//        $('.search-input').hide();
//        $('.header-intro').hide();
//        $('.header-image').hide();
//    })
//
//    //adding hike from search results
//    $('.search-results').on('click', '.add-link', function () {
//        let newHike = {}
//        let hikeImage;
//
//        newHike.trailName = $(this).closest('.hike').find('.trail-name').text();
//        newHike.length = $(this).closest('.hike').find('.trail-length').text();
//        hikeImage = $(this).closest('.hike-img-text').css('background-image');
//        hikeImage = hikeImage.replace('url("', '').replace('")', '')
//        newHike.img = hikeImage
//        newHike.location = $(this).closest('.hike').find('.trail-location').text();
//        newHike.url = $(this).closest('.more-info').find('a').attr('href');
//        newHike.googleMap = $(this).closest('.hike').find('.google-maps').find('iframe').attr('src');
//        newHike.dateCompleted = '';
//        newHike.notes = '';
//        newHike.status = false;
//        newHike.account = activeUser;
//
//        addHike(newHike);
//    })
//
//    //navigation page manipulation
//    //login in user
//    $('.nav-sign-up').on('click', function () {
//
//        $('.create-new').show();
//        $('.header-text').hide();
//        $('.search-input').hide();
//        $('.search-results').hide();
//        $('.my-trips').hide();
//        $('.returning-user').hide();
//        $('.demo-user').hide();
//    })
//
//    $('.nav-demo').on('click', function () {
//
//        $('.header-image').show();
//        $('.header-intro').show();
//        $('.returning-user').show();
//        $('.create-new').hide();
//        $('.search-input').hide();
//        $('.header-text').hide();
//        $('.search-results').hide();
//        $('.my-trips').hide();
//        $('.demo-user').show();
//
//    })
//
//    $('.nav-login').on('click', function () {
//        $('.header-image').show();
//        $('.header-intro').show();
//        $('.returning-user').show();
//        $('.create-new').hide();
//        $('.search-input').hide();
//        $('.header-text').hide();
//        $('.search-results').hide();
//        $('.my-trips').hide();
//        $('.demo-user').hide();
//    })
//
//    $('.nav-search').on('click', function () {
//        search();
//    })
//
//    $('.nav-signout').on('click', function () {
//        location.reload();
//    })
//
//    //go to my my trips
//    $('.nav-trips').on('click', function () {
//        myTrips();
//        $('.trips-list').empty();
//        getTrip(activeUser)
//    })
//
//    //update hike page manipulation
//    $('.update-hike').on('click', function () {
//        $('.update-form').show();
//        $('.hike-notes').hide()
//    })
//
//    //expand trips list toggles
//    $('.trips-list').on('click', '.accordion', function () {
//        this.classList.toggle("active");
//        $(this).next().next().toggle();
//    })
//
//    $('.trips-list').on('click', '.update-hike', function () {
//
//        let updateId = $(this).closest('.panel').attr('id')
//        let notes = $(this).closest('.panel').find('.update-notes').text();
//        let date = $(this).closest('.panel').find('.update-complete').text();
//        if (date == "Not Yet" || date == '') {
//            date = buildDate(new Date())
//        }
//        let divUpdate = $(this).closest('.hike-notes')
//        $(this).closest('.hike-notes').empty();
//        let updateForm = buildUpdateHtml(updateId, notes, date)
//        divUpdate.append(updateForm);
//
//    })
//
//    $('.trips-list').on('submit', '.form-update-hike', function (event) {
//        event.preventDefault();
//
//        let updateHikeInfo = {};
//        let id = $(this).attr('id');
//        let returnUpdate = $(this).closest('.hike-notes');
//
//        //create updated object
//        updateHikeInfo.id = id
//        updateHikeInfo.status = $('.form-update-hike [name=status]:checked').val();
//
//        if (updateHikeInfo.status == false) {
//            updateHikeInfo.dateCompleted = ''
//            updateHikeInfo.notes = ''
//        } else {
//            updateHikeInfo.dateCompleted = $('.form-update-hike [name=dateCompleted]').val();
//            updateHikeInfo.notes = $('.form-update-hike textarea').val();
//        }
//
//
//
//        //reach out and update information
//        updateTrip(id, updateHikeInfo, returnUpdate);
//    })
//
//    $('.trips-list').on('click', '.fa-minus-circle', function () {
//        let item = $(this).next().attr('id')
//        deleteTrip(item);
//    })
//
//
//
//});


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

	getAllJobs();
	getCollegeSelection();

	$('.sign-up-btn').on('click', function () {
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').hide();
		$('.create-new').show();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')

	})

	$('.nav-login').on('click', function () {
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').show();
		$('.create-new').hide();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')
	})

	$('.nav-sign-up').on('click', function () {
		$('.how-it-works').hide();
		$('.sign-up').show();
		$('.returning-user').hide();
		$('.create-new').show();
		$('.header-intro').hide();
		$('.header-image').css('height', '100%')
	})

	$('.form-returning-user').on('submit', function (event) {
		event.preventDefault();
		$('.sign-up').hide();
		$('.header-image').hide();
		$('.search-options').show();
		$('.nav-saved').show();
	})

	$('.form-create-new').on('submit', function (event) {
		event.preventDefault();
		$('.sign-up').hide();
		$('.header-image').hide();
		$('.search-options').show();
		$('.nav-saved').show();
	})

	$('.search-careers').on('click', function () {
		$('.search-careers-input').show();
		$('.search-careers').hide();
		$('.search-colleges').show();
		$('.search-colleges-input').hide();
		$('.career-results').hide();
	})

	$('.search-colleges').on('click', function () {
		$('.search-careers-input').hide();
		$('.search-careers').show();
		$('.search-colleges').hide();
		$('.search-colleges-input').show();
		$('.career-results').hide();
	})

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
			state : state

		}

		getCollegeSearch(collegeSearch)

		$('.search-options').hide();
		$('.college-results').show();

	})

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

	$('.new-search').on('click', function(){
		$('.college-results').hide();
		$('.search-options').show();
		$('.career-results').hide();

	})

	$('.navigation').on('click','.nav-saved',function(){
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

	// $('.compare-button button').on('click', function(){
	// 	console.log('fired')
	// 	$('.college-results').hide();
	// 	$('.search-options').hide();
	// 	$('.college-more-detail').hide();
	// 	$('.career-results').hide();
	// 	$('.saved-options').show();
	// })

	$('.compare-button').on('click',function(){
		$('.college-results').hide();
		$('.search-options').hide();
		$('.college-more-detail').hide();
		$('.career-results').hide();
		$('.saved-options').hide();
		$('.comparison').show();
	})

	$('.career-results').on('click','.save-career-btn', function(){
		let career = {
			career : '', 
			state : '', 
			nat_a_median : '',
			state_a_median : '', 
			education : '', 
			experience : '', 
			user : 'riley'
		}

		career.career = $('.career-results').find('#title-value').text()
		career.state = $('.career-results').find('#state-value').text()
		career.nat_a_median = $('.career-results').find('#nat-median-value').text()
		career.state_a_median = $('.career-results').find('#st-median-value').text()
		career.education = $('.career-results').find('#education-value').text()
		career.experience = $('.career-results').find('#experience-value').text()

		addCareer(career)
	})

	$('.college-more-detail').on('click','.save-college-btn',function(event){
		event.preventDefault();
		let query = {
			id : event.target.id
		}
		
		addCollege(query)
	})

	$('.form-search-colleges')

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

    $("input:checkbox").on('click', function() {
  		var $box = $(this);
  		if ($box.is(":checked")) {
   		var group = "input:checkbox[name='" + $box.attr("name") + "']";
    	$(group).prop("checked", false);
    		$box.prop("checked", true);
  		} else {
    	$box.prop("checked", false);
  		}
	});



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


function buildCollegeResults(results){
	let htmlOutput = '<div class="row">'
	
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
			htmlOutput += `<div class="row career-column"><div class="col-6 star-img right"></div><div class="col-6">`
			htmlOutput += `<p><span class="heavy emphasis orange" id="title-value">${national.OCC_TITLE}</span><br><span class="light" id="state-value"> ${state_ab}</span></p>`
			htmlOutput += `<ul><li><span class="heavy">National Median Salary:</span> <span id="nat-median-value">${national.NAT_A_MEDIAN}</span></li>`
    		htmlOutput += `<li><span class="heavy"> Region Median Salary:</span> <span id="st-median-value">${state_median}</span></li>`
    		htmlOutput += `<li><span class="heavy">Degree Requires:</span> <span id="education-value">${national.EDUCATION}</span></li>`
    		htmlOutput += `<li><span class="heavy">Experience Needed:</span> <span id="experience-value">${national.WORK_EXPERIENCE}</span></li>`
    		htmlOutput += `</ul></div></div><div class="row"><div class="col-12">`
    		htmlOutput += `<button class="save-career-btn"> Save Career</button></div></div>`
        	htmlOutput += `<p class="new-search center"><a href="#"> new search </a></p>`

   $('.career-results').append(htmlOutput)


}

$('.search-colleges-input').on('change','#region-select',function(){
     $('.search-colleges-input #state-select').val($("#state-select option:first").val());
});

$('.search-colleges-input').on('change','#state-select',function(){
     $('.search-colleges-input #region-select').val($("#region-select option:first").val());
});

function buildCollegeDetail(college, input){
	let htmlOutput = ''
	let tags = []
	let speciality = []

	tags.push(college.CONTROL)

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
			console.log(college[prop])
		}

	}

	speciality.sort(function(a,b){
		return b[1] - a[1]
	})



	htmlOutput += '<div class="row career-column">'
	htmlOutput += '<div class="col-12">'    
	htmlOutput += `<p><span class="heavy emphasis">${college.INSTNM}</span><br><span class="light"> ${college.CITY}, ${college.STABBR}</span><br>${college.UGDS} undergraduate students</p>`
    htmlOutput += `<ul>` 
    htmlOutput +=  `<li><span class="heavy"> School Details: </span>`

    for(let i=0; i<tags.length; i++){
    	if(i !== (tags.length-1))  {
    		htmlOutput += ` ${tags[i]} |`
    	} else {
    		htmlOutput += ` ${tags[i]}`
    	}
    }

    htmlOutput  += `</li><li><span class="heavy">Average Annual Cost:</span> $ ${college.NPT4}</li>` 
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
    htmlOutput 	+= `<td>$${college.NPT4} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $0 - $30,000 : </span> </td>`
    htmlOutput 	+= `<td>$${college.NPT41} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $30,001-$48,000 : </span></td>`
    htmlOutput 	+= `<td>$${college.NPT42}</td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $48,001-$75,000 : </span>  </td>`
    htmlOutput 	+= `<td>$${college.NPT43} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $75,001-$110,000 : </span> </td>`
    htmlOutput 	+= `<td>$${college.NPT44} </td>`
    htmlOutput 	+= `</tr>`
    htmlOutput 	+= `<tr>`
    htmlOutput 	+= `<td><span class="heavy"> $75,001-$110,000 : </span> </td>`
    htmlOutput 	+= `<td>$${college.NPT45} </td>`
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
    htmlOutput += '<div class="row">'
    htmlOutput += '<div class="col-12">'
    htmlOutput += `<button class="save-college-btn" id=${college._id}> Save College</button>`
    htmlOutput += '</div></div></div'

    input.append(htmlOutput);
}

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

$('.saved-options').on('click','.delete', function(event){
	let query = {
		id : event.target.closest('label').id, 
		category :$(this).next().attr('name')
	}

	deleteInfo(query)

})

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

	function buildModal(info){
			console.log(info)
			let htmlOutput = ''

			htmlOutput += `<div class="col-12">`
			htmlOutput += `<p><span class="heavy emphasis orange">${info.career}</span><br><span class="light" id="state-value"> ${info.state}</span></p>`
			htmlOutput += `<ul><li><span class="heavy">National Median Salary:</span> <span id="nat-median-value">${info.nat_a_median}</span></li>`
    		htmlOutput += `<li><span class="heavy"> Region Median Salary:</span> <span id="st-median-value">${info["st-median-value"]}</span></li>`
    		htmlOutput += `<li><span class="heavy">Degree Requires:</span> <span id="education-value">${info.education}</span></li>`
    		htmlOutput += `<li><span class="heavy">Experience Needed:</span> <span id="experience-value">${info.experience}</span></li>`
    		htmlOutput += `</ul></div></div>`

    		$('.modal-fill').append(htmlOutput)
}

function addCareer(careerInfo) {
   $.ajax({
           url: "http://localhost:8080/career/create-new",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(careerInfo),
           contentType: 'application/json'
       })
       .done(function (results) {
           alert(results);
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

function addCollege(collegeId) {
   $.ajax({
           url: "http://localhost:8080/save-info",
           type: "POST",
           dataType: "json",
           data: JSON.stringify(collegeId),
           contentType: 'application/json'
       })
       .done(function (results) {
           alert(results);
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}

function getSavedInfo(user) {
   $.ajax({
           url: "http://localhost:8080/user-saved-info",
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

function deleteInfo(query) {
   $.ajax({
           url: "http://localhost:8080/delete-info",
           type: "DELETE",
           dataType: "json",
           data: JSON.stringify(query),
           contentType: 'application/json'
       })
       .done(function (results) {
       		$('.saved-options').empty();
       		let user = {
			user : 'riley'
			}
       		getSavedInfo(user);
       	   console.log(results)
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
       })
}


function getInfoForModal(info){
	   $.ajax({
           url: "http://localhost:8080/modal-info",
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



function getCollegeSelection(){
	   $.ajax({
           url: "http://localhost:8080/college",
           type: "GET",
           dateType: "json",
           contentType: "application/json"
       })
       .done(function (results) {
           // assign active user for further interactions
           buildCollegeDropdown(results);
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

function getAllJobs() {
   $.ajax({
           url: "http://localhost:8080/jobs",
           type: "GET",
           dateType: "json",
           contentType: "application/json"
       })
       .done(function (results) {
           // assign active user for further interactions
           buildCareerDropdown(results)
           
       })
       .fail(function (jxhqr, error, errorThrown) {
           console.log(jxhqr);
           console.log(error);
           console.log(errorThrown);
           displayError('Oops! Something went wrong')
       })
}

function getCareerSelection(search) {
	$.ajax({
		url:"http://localhost:8080/career-search/?career="+search.career+'&state='+search.state,
		type:"GET", 
		dataType: "json", 
		contentType: "application/json"
	})
	.done(function(results){
		console.log(results)
		buildCareerResults(results);
	})
	.fail(function(jxhqr, error, errorThrown){
		console.log(jxhqr);
		console.log(error);
		console.log(errorThrown);
		alert('error');
	})
}

function getCollegeSearch(search) {
	$.ajax({
		url:"http://localhost:8080/college-search/?degree="+search.degree+'&speciality='+search.speciality + '&region='+search.region+'&state=' + search.state,
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

function getIndividualCollege(id){
	$.ajax({
		url:'http://localhost:8080/search/'+id, 
		type:'GET', 
		dataType:'json', 
		contentType: 'application/json'
	})
	.done(function(results){
		buildCollegeDetail(results,$('.college-more-detail'))
		console.log(results)
	})
	.fail(function(jxhqr, error, errorThrown){
		console.log(jxhqr);
		console.log(error);
		console.log(errorThrown)
		alert('error')
	})
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


})
