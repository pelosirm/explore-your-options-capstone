'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const savedInfoSchema = mongoose.Schema( {


  INSTNM: {
  	type : String
  },
  CITY: {
  	type : String
  },
  STABBR: {
  	type : String
  },
  CONTROL: {
  	type : String
  },
  HIGHDEG : {
    type : Number
  },
  REGION: {
  	type : Number
  },
  LOCALE: {
  	type : String
  },
  HBCU: {
  	type : Number
  },
  PBI: {
  	type : Number
  },
  ANNHI: {
  	type : Number
  },
  TRIBAL: {
  	type : Number
  },
  AANAPII: {
  	type : Number
  },
  HSI: {
  	type : Number
  },
  NANTI: {
  	type : Number
  },
  MENONLY: {
  	type : Number
  },
  WOMENONLY: {
  	type : Number
  },
  RELAFFIL: {
  	type : String
  },
  '01Agriculture, Agriculture Operations, and Related Sciences': {
  	type : Number
  },
  '01Natural Resources and Conservation': {
  	type : Number
  },
  '01Architecture and Related Services': {
  	type : Number
  },
  '01Area, Ethnic, Cultural, Gender, and Group Studies': {
  	type : Number
  },
  '01Communication, Journalism, and Related Programs': {
  	type : Number
  },
  '01Communications Technologies/Technicians and Support Services': {
  	type : Number
  },
  '01Computer and Information Sciences and Support Services': {
  	type : Number
  },
  '01Personal and Culinary Services': {
  	type : Number
  },
  '01Education': {
  	type : Number
  },
  '01Engineering': {
  	type : Number
  },
  '01Engineering Technologies and Engineering-Related Fields': {
  	type : Number
  },
  '01Foreign Languages, Literatures, and Linguistics': {
  	type : Number
  },
  '01Family and Consumer Sciences/Human Sciences': {
  	type : Number
  },
  '01Legal Professions and Studies': {
  	type : Number
  },
  '01English Language and Literature/Letters': {
  	type : Number
  },
  '01Liberal Arts and Sciences, General Studies and Humanities': {
  	type : Number
  },
  '01Library Science': 0,
  '01Biological and Biomedical Sciences': {
  	type : Number
  },
  '01Mathematics and Statistics': {
  	type : Number
  },
  '01Military Technologies and Applied Sciences': {
  	type : Number
  },
  '01Multi/Interdisciplinary Studies': {
  	type : Number
  },
  '01Parks, Recreation, Leisure, and Fitness Studies': {
  	type : Number
  },
  '01Philosophy and Religious Studies': {
  	type : Number
  },
  '01Theology and Religious Vocations': {
  	type : Number
  },
  '01Physical Sciences': {
  	type : Number
  },
  '01Science Technologies/Technicians': {
  	type : Number
  },
  '01Psychology': {
  	type : Number
  },
  '01Homeland Security, Law Enforcement, Firefighting and Related Protective Services': {
  	type : Number
  },
  '01Public Administration and Social Service Professions': {
  	type : Number
  },
  '01Social Sciences': {
  	type : Number
  },
  '01Construction Trades': {
  	type : Number
  },
  '0Mechanic and Repair Technologies/Technicians': {
  	type : Number
  },
  '01Precision Production': {
  	type : Number
  },
  '01Transportation and Materials Moving': {
  	type : Number
  },
  '01Visual and Performing Arts': {
  	type : Number
  },
  '01Health Professions and Related Programs': {
  	type : Number
  },
  '01Business, Management, Marketing, and Related Support Services': {
  	type : Number
  },
  '01History': {
  	type : Number
  },
  UGDS: {
  	type : Number
  },
  NPT4: {
  	type : Number
  },
  NPT41: {
  	type : Number
  },
  NPT42: {
  	type : Number
  },
  NPT43: {
  	type : Number
  },
  NPT44: {
  	type : Number
  },
  NPT45: {
  	type : Number
  },
  MD_EARN_WNE_P10: {
  	type : String
  },
  GT_25K_P6: {
  	type : Number
  },
  GRAD_DEBT_MDN_SUPP: {
  	type : Number
  },
  GRAD_DEBT_MDN10YR_SUPP: {
  	type : Number
  },
  RPY_3YR_RT_SUPP: {
  	type : Number
  },
  C150_L4_POOLED_SUPP: {
  	type : Number
  },
  user: {
  	type : String
  }
})

const SavedInfo = mongoose.model('saved-info', savedInfoSchema);

module.exports = {
    SavedInfo: SavedInfo
}