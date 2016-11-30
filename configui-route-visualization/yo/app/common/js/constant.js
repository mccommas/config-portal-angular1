    //angular.constant
    configApp.constant("Configuration", {
        "xmlCASID": "5042015",
        "userType": {
            "associationUser": "association user",
            "admissionUser": "admissions user"
        }
    });

    var _NODE_IMAGE_URL = '';
    var _NODE_IMAGE_URL_APP_BRANDING_LOGO = '';
    var _NODE_IMAGE_URL_APP_BRANDING_BACKGROUND = '';
    if (local_environment) {
        _NODE_IMAGE_URL = 'http://localhost:3030/api/imageupload';
        _NODE_IMAGE_URL_APP_BRANDING_LOGO = 'http://localhost:3030/api/imageupload';
        _NODE_IMAGE_URL_APP_BRANDING_BACKGROUND = 'http://localhost:3030/api/imageupload';
    } else {
        _NODE_IMAGE_URL = 'uploadProgramImage';
        _NODE_IMAGE_URL_APP_BRANDING_LOGO = 'uploadGatewayImage/GATEWAY_LOGO';
        _NODE_IMAGE_URL_APP_BRANDING_BACKGROUND = 'uploadGatewayImage/GATEWAY_BACKGROUND';
    }

    var _Program_levels = [
        {
            value: 'Accelerated BSN for Non-Nurses',
            displayName: 'Accelerated BSN for Non-Nurses (Second Degree)'
            },
        {
            value: 'Accelerated BSN to DNP',
            displayName: 'Accelerated BSN to DNP'
            },
        {
            value: 'Accelerated BSN to PhD',
            displayName: 'Accelerated BSN to PhD'
            },
        {
            value: 'ADN to BSN',
            displayName: 'ADN to BSN'
            },
        {
            value: 'Associate Degree in Nursing',
            displayName: 'Associate Degree in Nursing'
            },
        {
            value: 'BS/BA (RN) to MSN',
            displayName: 'BS/BA (RN) to MSN'
            },
        {
            value: 'BSN (Pre-Licensure)',
            displayName: 'BSN (Pre-Licensure)'
            },
        {
            value: 'BSN to MSN',
            displayName: 'BSN to MSN'
            },
        {
            value: 'DNP (Post-Baccalaureate)',
            displayName: 'DNP (Post-Baccalaureate)'
            },
        {
            value: 'DNP (Post-Masters)',
            displayName: 'DNP (Post-Masters)'
            },
        {
            value: 'DNS',
            displayName: 'DNS'
            },
        {
            value: 'Dual Degree Doctoral',
            displayName: 'Dual Degree Doctoral'
            },
        {
            value: 'Dual Degree Masters',
            displayName: 'Dual Degree Masters'
            },
        {
            value: 'EdD',
            displayName: 'EdD'
            },
        {
            value: 'LPN (or LVN)',
            displayName: 'LPN (or LVN)'
            },
        {
            value: 'LPN to ADN',
            displayName: 'LPN to ADN'
            },
        {
            value: 'LPN to BSN',
            displayName: 'LPN to BSN'
            },
        {
            value: 'LPN to MSN',
            displayName: 'LPN to RN'
            },
        {
            value: 'LPN to MSN',
            displayName: 'LPN to BSN'
            },
        {
            value: 'Master\'s Entry Program in Nursing',
            displayName: 'Master\'s Entry Program in Nursing'
            },
        {
            value: 'MN (Master of Nursing)',
            displayName: 'MN (Master of Nursing)'
            },
        {
            value: 'MS (Major in Nursing)',
            displayName: 'MS (Major in Nursing)'
            },
        {
            value: 'MSN (Master\'s of Science in Nursing)',
            displayName: 'MSN (Master\'s of Science in Nursing)'
            },
        {
            value: 'Non-Degree Nursing',
            displayName: 'Non-Degree Nursing'
            },
        {
            value: 'PHD',
            displayName: 'PHD'
            },
        {
            value: 'Post Baccalaureate Certificate',
            displayName: 'LPN to BSN'
            },
        {
            value: 'Post Doctoral Certificate',
            displayName: 'Post Doctoral Certificate'
            },
        {
            value: 'Post Master\'s Certificate',
            displayName: 'Post Master\'s Certificate'
            },
        {
            value: 'Postdoctoral Program',
            displayName: 'Postdoctoral Program'
            },
        {
            value: 'RN Diploma',
            displayName: 'RN Diploma'
            },
        {
            value: 'RN to BSN',
            displayName: 'RN to BSN'
            },
        {
            value: 'RN to MSN',
            displayName: 'RN to MSN'
            }
        ];
    // additional levels added for custom cas forms
    var _Program_levels806 = [
  	    {
  		    value: 'Bachelors',
  		    displayName: 'Bachelors'
  	    },
  	    {
  		    value: 'Masters (Direct Admit)',
  		    displayName: 'Masters (Direct Admit)'
  	    },
  	    {
  		    value: 'Masters (Bachelors Required to Apply)',
  		    displayName: 'Masters (Bachelors Required to Apply)'
  	    },
  	    {
  		    value: 'Doctorate',
  		    displayName: 'Doctorate'
  	    }
  	    ,
  	    {
  		    value: 'N/A',
  		    displayName: 'N/A'
  	    }

      ];
    var _Program_levels6327 = [
  	    {
  		    value: 'Bachelors',
  		    displayName: 'Bachelors'
  	    },
  	    {
  		    value: 'Combined (3 + 2)',
  		    displayName: 'Combined (3 + 2)'
  	    },
  	    {
  		    value: 'Masters',
  		    displayName: 'Masters'
  	    },
  	    {
  		    value: 'Doctorate',
  		    displayName: 'Doctorate'
  	    }

      ];
    var _Program_levels807 = [
	    {
		    value: 'Associates',
		    displayName: 'Associates'
	    },
	    {
		    value: 'Baccalaureate',
		    displayName: 'Baccalaureate'
	    },
	    {
		    value: 'Certificate',
		    displayName: 'Certificate'
	    },
	    {
		    value: 'Masters',
		    displayName: 'Masters'
	    }

    ];
    var _Program_levels1839 = [
	    {
		    value: 'Undergrad',
		    displayName: 'Undergrad'
	    },
	    {
		    value: 'Graduate',
		    displayName: 'Graduate'
	    },
	    {
		    value: 'Certificate',
		    displayName: 'Certificate'
	    }

    ];
    
    var _Program_levels1853 = [
  	    {
   		    value: 'Bachelors',
   		    displayName: 'Bachelors'
   	    },
   	    {
   		    value: 'Doctorate',
   		    displayName: 'Doctorate'
   	    },
   	    {
   		    value: 'Masters',
   		    displayName: 'Masters'
   	    },
   	    {
   		    value: 'Certificate',
   		    displayName: 'Certificate'
   	    }

   ];    

    var _Program_tracks = [
        {
            value: 'Administration (Executive, Leadership, Management, Healthcare Systems)',
            displayName: 'Administration (Executive, Leadership, Management, Healthcare Systems)'
            },
        {
            value: 'Case Management',
            displayName: 'Case Management'
            },
        {
            value: 'Clinical Nurse Leader',
            displayName: 'Clinical Nurse Leader'
            },
        {
            value: 'Clinical Nurse Specialist - Adult-Gerontology',
            displayName: 'Clinical Nurse Specialist - Adult-Gerontology'
            },
        {
            value: 'Clinical Nurse Specialist - Neonatal',
            displayName: 'Clinical Nurse Specialist - Neonatal'
            },
        {
            value: 'Clinical Nurse Specialist - Pediatric',
            displayName: 'Clinical Nurse Specialist - Pediatric'
            },
        {
            value: 'Clinical Nurse Specialist - Womens Health',
            displayName: 'Clinical Nurse Specialist - Womens Health'
            },
        {
            value: 'Combined or Dual Track Offered',
            displayName: 'Combined or Dual Track Offered'
            },
        {
            value: 'Education/Educator',
            displayName: 'Education/Educator'
            },
        {
            value: 'Forensic',
            displayName: 'Forensic'
            },
        {
            value: 'Genetics',
            displayName: 'Genetics'
            },
        {
            value: 'Health Policy',
            displayName: 'Health Policy'
            },
        {
            value: 'Informatics',
            displayName: 'Informatics'
            },
        {
            value: 'Nurse Anesthesia',
            displayName: 'Nurse Anesthesia'
            },
        {
            value: 'Nurse Midwifery',
            displayName: 'Nurse Midwifery '
            },
        {
            value: 'Nurse Practitioner - Adult-Gerontology Acute Care',
            displayName: 'Nurse Practitioner - Adult-Gerontology Acute Care'
            },
        {
            value: 'Nurse Practitioner - Adult-Gerontology Primary Care',
            displayName: 'Nurse Practitioner - Adult-Gerontology Primary Care'
            },
        {
            value: 'Nurse Practitioner - Family',
            displayName: 'Nurse Practitioner - Family'
            },
        {
            value: 'Nurse Practitioner - Neonatal',
            displayName: 'Nurse Practitioner - Neonatal'
            },
        {
            value: 'Nurse Practitioner - Pediatric Acute Care',
            displayName: 'Nurse Practitioner - Pediatric Acute Care'
            },
        {
            value: 'Nurse Practitioner - Pediatric Primary Care',
            displayName: 'Nurse Practitioner - Pediatric Primary Care'
            },
        {
            value: 'Nurse Practitioner - Psychiatric-Mental Health',
            displayName: 'Nurse Practitioner - Psychiatric-Mental Health'
            },
        {
            value: 'Nurse Practitioner - Womens Health',
            displayName: 'Nurse Practitioner - Womens Health'
            },
        {
            value: 'Public Health',
            displayName: 'Public Health'
            },
        {
            value: 'School Nurse',
            displayName: 'School Nurse'
            },
        {
            value: 'Other',
            displayName: 'Other'
            }
        ];
    var _Program_programTypes = [
        {
            value: 'Accelerated BSN for Non-Nurses (Second Baccalaureate Degree)',
            displayName: 'Accelerated BSN for Non-Nurses (Second Baccalaureate Degree)'
            },
        {
            value: 'Accelerated BSN to DNP',
            displayName: 'Accelerated BSN to DNP'
            },
        {
            value: 'Accelerated BSN to PhD',
            displayName: 'Accelerated BSN to PhD'
            },
        {
            value: 'ADN to BSN',
            displayName: 'ADN to BSN'
            },
        {
            value: 'Associate Degree in Nursing',
            displayName: 'Associate Degree in Nursing'
            },
        {
            value: 'BS/BA (RN) to MSN',
            displayName: 'BS/BA (RN) to MSN'
            },
        {
            value: 'BSN (Pre-Licensure)',
            displayName: 'BSN (Pre-Licensure)'
            },
        {
            value: 'BSN to MSN',
            displayName: 'BSN to MSN'
            },
        {
            value: 'DNP (Post-Baccalaureate)',
            displayName: 'DNP (Post-Baccalaureate)'
            },
        {
            value: 'DNP (Post-Master\'s)',
            displayName: 'DNP (Post-Master\'s)'
            },
        {
            value: 'DNS',
            displayName: 'DNS'
            },
        {
            value: 'Dual Degree Doctoral',
            displayName: 'Dual Degree Doctoral'
            },
        {
            value: 'Dual Degree Master\'s',
            displayName: 'Dual Degree Master\'s'
            },
        {
            value: 'EdD',
            displayName: 'EdD'
            },
        {
            value: 'LPN (or LVN)',
            displayName: 'LPN (or LVN)'
            },
        {
            value: 'LPN to ADN',
            displayName: 'LPN to ADN'
            },
        {
            value: 'LPN to BSN',
            displayName: 'LPN to BSN'
            },
        {
            value: 'LPN to MSN',
            displayName: 'LPN to MSN'
            },
        {
            value: 'LPN to RN',
            displayName: 'LPN to RN'
            },
        {
            value: 'Master\'s Entry Program in Nursing (Entry-Level Master\'s for Non-Nurses)',
            displayName: 'Master\'s Entry Program in Nursing (Entry-Level Master\'s for Non-Nurses)'
            },
        {
            value: 'MN (Master of Nursing)',
            displayName: 'MN (Master of Nursing)'
            },
        {
            value: 'MS (Major in Nursing)',
            displayName: 'MS (Major in Nursing)'
            },
        {
            value: 'MSN (Master\'s of Science in Nursing)',
            displayName: 'MSN (Master\'s of Science in Nursing)'
            },
        {
            value: 'Non-Degree Nursing',
            displayName: 'Non-Degree Nursing'
            },
        {
            value: 'PhD',
            displayName: 'PhD'
            },
        {
            value: 'Post Baccalaureate Certificate',
            displayName: 'Post Baccalaureate Certificate'
            },
        {
            value: 'Post Doctoral Certificate',
            displayName: 'Post Doctoral Certificate'
            },
        {
            value: 'Post Master\'s Certificate',
            displayName: 'Post Master\'s Certificate'
            },
        {
            value: 'Postdoctoral Program',
            displayName: 'Postdoctoral Program'
            },
        {
            value: 'RN Diploma',
            displayName: 'RN Diploma'
            },
        {
            value: 'RN to BSN',
            displayName: 'RN to BSN'
            },
        {
            value: 'RN to MSN',
            displayName: 'RN to MSN'
            }
        ];
    
    var _Program_programTypes_6350 = [
     {
         value: 'Accelerated BSN for Non-Nurses (Second Baccalaureate Degree)',
         displayName: 'Accelerated BSN for Non-Nurses (Second Baccalaureate Degree)'
     },
     {
         value: 'ADN to BSN',
         displayName: 'ADN to BSN'
         },
     {
         value: 'Associate Degree in Nursing',
         displayName: 'Associate Degree in Nursing'
         },
     {
         value: 'BSN (Pre-Licensure)',
         displayName: 'BSN (Pre-Licensure)'
         },
       {
         value: 'BSN to MSN',
         displayName: 'BSN to MSN'
         },
     {
	     value: 'DNAP (Doctor of Nursing Anesthesia Practice)',
	     displayName: 'DNAP (Doctor of Nursing Anesthesia Practice)'
	     },
     {
         value: 'DNP (Post-Baccalaureate)',
         displayName: 'DNP (Post-Baccalaureate)'
         },
     {
         value: 'DNP (Post-Master\'s)',
         displayName: 'DNP (Post-Master\'s)'
         },
     {
         value: 'DNS',
         displayName: 'DNS'
         },
     {
         value: 'Dual Degree Doctoral',
         displayName: 'Dual Degree Doctoral'
         },
     {
         value: 'Dual Degree Master\'s',
         displayName: 'Dual Degree Master\'s'
         },
     {
         value: 'EdD',
         displayName: 'EdD'
         },
     {
         value: 'LPN (or LVN)',
         displayName: 'LPN (or LVN)'
         },
     {
         value: 'LPN to ADN',
         displayName: 'LPN to ADN'
         },
     {
         value: 'LPN to BSN',
         displayName: 'LPN to BSN'
         },
     {
         value: 'Master\'s Entry Program in Nursing (Entry-Level Master\'s for Non-Nurses)',
         displayName: 'Master\'s Entry Program in Nursing (Entry-Level Master\'s for Non-Nurses)'
         },
     {
         value: 'Master\'s (MSN, MS, or MN)',
         displayName: 'Master\'s (MSN, MS, or MN)'
         }, 
         {
         value: 'Non-Degree Nursing',
         displayName: 'Non-Degree Nursing'
         },
     {
	     value: 'PhD (Post-Baccalaureate)',
	     displayName: 'PhD (Post-Baccalaureate)'
     	},
    {
	     value: 'PhD (Post-Master\'s)',
	     displayName: 'PhD (Post-Master\'s))'
    	},
     {
         value: 'Post Baccalaureate Certificate',
         displayName: 'Post Baccalaureate Certificate'
         },
     {
         value: 'Post Graduate Certificate',
         displayName: 'Post Graduate Certificate'
         },
     {
         value: 'Postdoctoral Program',
         displayName: 'Postdoctoral Program'
         },
     {
         value: 'RN Diploma',
         displayName: 'RN Diploma'
         },
     {
         value: 'RN to BSN',
         displayName: 'RN to BSN'
         },
     {
         value: 'RN to MSN',
         displayName: 'RN to MSN'
         }
     ];
    // added for CAS on program type drop down select
    var _Program_programTypes_805 = [
	    {
		    value: 'Entry Level',
		    displayName: 'Entry Level'
	    },
	    {
		    value: 'Degree Completion',
		    displayName: 'Degree Completion'
	    },
	    {
		    value: 'Graduate',
		    displayName: 'Graduate'
	    }
    ]
    var _Program_programTypes_1833 = [
	    {
		    value: 'Audiology',
		    displayName: 'Audiology'
	    },
	    {
		    value: 'Speech Language Pathology',
		    displayName: 'Speech Language Pathology'
	    }
    ]

    var _Program_programTypes_806 = [
         	    {
         		    value: 'Professional',
         		    displayName: 'Professional'
         	    },
         	    {
         		    value: 'Post-Professional Degree',
         		    displayName: 'Post-Professional Degree'
         	    },
         	    {
         		    value: 'Post-Professional Residency',
         		    displayName: 'Post-Professional Residency'
         	    }
             ]
    var _Program_programTypes_6327 = [
     	    {
     		    value: 'Post-Professional',
     		    displayName: 'Post-Professional'
     	    },
     	    {
     		    value: 'Professional',
     		    displayName: 'Professional'
     	    }
         ]

    var _Program_concentrations = [
        {
            value: 'Cardiology',
            displayName: 'Cardiology'
            },
        {
            value: 'Community Health',
            displayName: 'Community Health'
            },
        {
            value: 'Dermatology',
            displayName: 'Dermatology'
            },
        {
            value: 'Diabetes',
            displayName: 'Diabetes'
            },
        {
            value: 'Emergency',
            displayName: 'Emergency'
            },
        {
            value: 'Endocrinology',
            displayName: 'Endocrinology'
            },
        {
            value: 'Ethics',
            displayName: 'Ethics'
            },
        {
            value: 'Genetics',
            displayName: 'Genetics'
            },
        {
            value: 'Health Policy',
            displayName: 'Health Policy'
            },
        {
            value: 'Health Systems',
            displayName: 'Health Systems'
            },
        {
            value: 'Hematology',
            displayName: 'Hematology'
            },
        {
            value: 'HIV/AIDS',
            displayName: 'HIV/AIDS'
            },
        {
            value: 'Holistic',
            displayName: 'Holistic'
            },
        {
            value: 'Hospice',
            displayName: 'Hospice'
            },
        {
            value: 'Informatics',
            displayName: 'Informatics'
            },
        {
            value: 'Leadership',
            displayName: 'Leadership'
            },
        {
            value: 'Nephrology',
            displayName: 'Nephrology'
            },
        {
            value: 'Neurology',
            displayName: 'Neurology'
            },
        {
            value: 'Occupational Health',
            displayName: 'Occupational Health'
            },
        {
            value: 'Oncology',
            displayName: 'Oncology'
            },
        {
            value: 'Ophthamology',
            displayName: 'Ophthamology'
            },
        {
            value: 'Orthopedic',
            displayName: 'Orthopedic'
            },
        {
            value: 'Pain management',
            displayName: 'Pain management'
            },
        {
            value: 'Palliative',
            displayName: 'Palliative'
            },
        {
            value: 'Perinatal',
            displayName: 'Perinatal'
            },
        {
            value: 'Perioperative',
            displayName: 'Perioperative'
            },
        {
            value: 'Plastic surgery',
            displayName: 'Plastic surgery'
            },
        {
            value: 'Population Health',
            displayName: 'Population Health'
            },
        {
            value: 'Pulmonary',
            displayName: 'Pulmonary'
            },
        {
            value: 'Rehabilitation',
            displayName: 'Rehabilitation'
            },
        {
            value: 'Reproductive',
            displayName: 'Reproductive'
            },
        {
            value: 'Rheumatology',
            displayName: 'Rheumatology'
            },
        {
            value: 'Substance Abuse',
            displayName: 'Substance Abuse'
            },
        {
            value: 'Toxicology',
            displayName: 'Toxicology'
            },
        {
            value: 'Transplant',
            displayName: 'Transplant'
            },
        {
            value: 'Trauma',
            displayName: 'Trauma'
            },
        {
            value: 'Urology',
            displayName: 'Urology'
            },
        {
            value: 'Womens Health',
            displayName: 'Womens Health'
            },
        {
            value: 'Wound Care',
            displayName: 'Wound Care'
            },
        {
            value: 'Other or Not Listed',
            displayName: 'Other or Not Listed'
            }
        ];

    var _Max_Allowed = [1, 2, 3, 4, 5];
    var _Max_Allowed_From_0 = [0, 1, 2, 3, 4, 5];
    var _Program_startTerms = [

        {
            value: 'Winter',
            displayName: 'Winter'
            },
        {
            value: 'Spring',
            displayName: 'Spring'
            },
        {
            value: 'Summer 1',
            displayName: 'Summer 1'
            },
        {
            value: 'Summer 2',
            displayName: 'Summer 2'
        },
        {
            value: 'Fall',
            displayName: 'Fall'
        },

        {
            value: 'Interim',
            displayName: 'Interim'
        },
        {
            value: 'Rolling',
            displayName: 'Rolling'
        }
        ];
    var _Program_academicYears = [
        {
            value: '2017',
            displayName: '2017'
            },
        {
            value: '2018',
            displayName: '2018'
            },
        {
            value: '2019',
            displayName: '2019'
            }
        ];
    var _Program_academicYears_form_809 = [
       {
           value: '2015',
           displayName: '2015'
           },
       {
           value: '2016',
           displayName: '2016'
           },
       {
           value: '2017',
           displayName: '2017'
           }
       ];

    var _Program_academicYears_form_6350 = [
        {
            value: '2017',
            displayName: '2017'
        },
        {
            value: '2018',
            displayName: '2018'
        },
        {
            value: '2019',
            displayName: '2019'
        }
    ];
    var _Program_deliveries = [
       {
           value: 'On-campus',
           displayName: 'On-campus'
       },
       {
           value: 'On-line',
           displayName: 'On-line'
       },
       {
           value: 'On-line/On-campus Hybrid',
           displayName: 'On-line/On-campus Hybrid'
       }
   ];
    var _Program_deliveries_6350 = [
	   {
	       value: 'On Campus',
		   displayName: 'On Campus'
	   },
	   {
	       value: 'Online',
		   displayName: 'Online'
	   },
	   {
	       value: 'Hybrid',
		   displayName: 'Hybrid'
	       }
	   ];
    var _Program_deliveries_1838 = [
        {
            value: 'On Campus',
            displayName: 'On Campus'
        },
        {
            value: 'Blended Learning (Hybrid)',
            displayName: 'Blended Learning (Hybrid)'
        },
        {
            value: 'Online',
            displayName: 'Online'
        }
    ];
    var _Program_department_1849 = [
            {
                value: 'Region 1',
                displayName: 'Region 1'
            },
            {
                value: 'Region 2',
                displayName: 'Region 2'
            },
            {
                value: 'Region 3',
                displayName: 'Region 3'
            },
            {
                value: 'Region 4',
                displayName: 'Region 4'
            },
            {
                value: 'Region 5',
                displayName: 'Region 5'
            },
            {
                value: 'Region 6',
                displayName: 'Region 6'
            },
            {
                value: 'Region 7',
                displayName: 'Region 7'
            },
            {
                value: 'Region 8',
                displayName: 'Region 8'
            },
            {
                value: 'Region 9',
                displayName: 'Region 9'
            },
            {
                value: 'Multi Region',
                displayName: 'Multi Region'
            }
        ];   
    var _Program_Program_Length_1849 = [
          {
              value: '12 Months',
              displayName: '12 Months'
          },
          {
              value: '18 Months',
              displayName: '18 Months'
          },
          {
              value: '24 Months',
              displayName: '24 Months'
          }
      ];
    var _Program_Positions_Available_1849 = [
                 {
                     value: '1',
                     displayName: '1'
                 },
                 {
                     value: '2',
                     displayName: '2'
                 },
                 {
                     value: '3',
                     displayName: '3'
                 },
                 {
                     value: '4',
                     displayName: '4'
                 },
                 {
                     value: '5',
                     displayName: '5'
                 },
                 {
                     value: '6',
                     displayName: '6'
                 },
                 {
                     value: '7',
                     displayName: '7'
                 },
                 {
                     value: '8',
                     displayName: '8'
                 },
                 {
                     value: '9',
                     displayName: '9'
                 },
                 {
                     value: '10',
                     displayName: '10'
                 },
                 {
                     value: '11',
                     displayName: '11'
                 },
                 {
                     value: '12',
                     displayName: '12'
                 },
                 {
                     value: '13',
                     displayName: '13'
                 },
                 {
                     value: '14',
                     displayName: '14'
                 },
                 {
                     value: '15',
                     displayName: '15'
                 },
                 {
                     value: '16',
                     displayName: '16'
                 },
                 {
                     value: '17',
                     displayName: '17'
                 },
                 {
                     value: '18',
                     displayName: '18'
                 },
                 {
                     value: '19',
                     displayName: '19'
                 },
                 {
                     value: '20',
                     displayName: '20'
                 },
                 {
                     value: '21',
                     displayName: '21'
                 },
                 {
                     value: '22',
                     displayName: '22'
                 },
                 {
                     value: '23',
                     displayName: '23'
                 },
                 {
                     value: '24',
                     displayName: '24'
                 },
                 {
                     value: '25',
                     displayName: '25'
                 },
    ];

    var _Transcript_accepted = [
        {
            name: 'Official',
            value: 'OFFICIAL'
            },
        {
            name: 'Unofficial',
            value: 'UNOFFICIAL'
            },
        {
            name: 'None',
            value: 'NONE'
            }
        ];
    var _Question_Type = [
        {
            "id": 9,
            "value": "Multiple Choice"
                                },
        {
            "id": 6,
            "value": "Essay"
                                },
        {
            "id": 10,
            "value": " Either / Or"
        },
        {
             "id": 11,
             "value": "Section Text Box"
                  }
    ];
    var _Answer_Format = [{
            "id": 4,
            "value": "Single Answer"
                                },
        {
            "id": 8,
            "value": "Multiple Answer"
                 }];

    var _Answer_Display4 = [{
            "id": 2,
            "value": "Drop Menu"
                                },
        {
            "id": 1,
            "value": "Radio"
                 }];
    var _Answer_Display8 = [{
            "id": 3,
            "value": "Check box"
                                }
        ];
    // additional select options for casIDs 811,815
    var _cas815StartTerms = [

        {
            value: 'Winter',
            displayName: 'Winter'
        },
        {
            value: 'Spring',
            displayName: 'Spring'
        },
        {
            value: 'Summer 1',
            displayName: 'Summer 1'
        },
        {
            value: 'Summer 2',
            displayName: 'Summer 2'
        },
        {
            value: 'Fall',
            displayName: 'Fall'
        },
        {
            value: 'Rolling',
            displayName: 'Rolling'
        }
   ];

    var _cas815Tracks = [
	    {
		    value: 'Orthotic Residency',
		    displayName: 'Orthotic Residency'
	    },
	    {
		    value: 'Prosthetic Residency',
		    displayName: 'Prosthetic Residency'
	    },
	    {
		    value: 'O&P Residency',
		    displayName: 'O&P Residency'
	    }
    ];

    var _cas1856Tracks = [
	    {
		    value: 'Pardee School Program',
		    displayName: 'Pardee School Program'
	    },
	    {
		    value: 'Joint-Degree Program',
		    displayName: 'Joint-Degree Program'
	    },
	    {
		    value: 'Dual-Degree Program',
		    displayName: 'Dual-Degree Program'
	    }
    ];

    var _Program_delivery = [
        {
            value: '"On Campus',
            displayName: '"On Campus'
        },
        {
            value: 'Online',
            displayName: 'Online'
        },
        {
            value: 'Hybrid',
            displayName: 'Hybrid'
        }
    ];

    // dropdown for CAS 807 on subject field on 08/05/2015
    var _Subject_807 = [
	    {
		    value: 'Respiratory Therapy',
		    displayName: 'Respiratory Therapy'
	    },
	    {
		    value: 'Medical/Clinical Laboratory Sciences',
		    displayName: 'Medical/Clinical Laboratory Sciences'
	    },
	    {
		    value: 'Imaging and Radiologic Sciences',
		    displayName: 'Imaging and Radiologic Sciences'
	    }

    ];

    var _COLOR_PICKER = {
        primary: [
            '000000', '232323', '3c3c3c', '5a5a5a', '828282', 'e2e2e2', 'fafafa', 'b48686',
            '975252', '6c3333', '630000', 'be0000', 'ff0000', 'ff6d6d', 'ffd0d0', 'b8a495',
            '8b6a50', '7a4d29', '632c00', 'c54f00', 'ff8400', 'ffba57', 'ffdfac', 'd7cab1',
            'c4ad80', '865902', 'd3a400', 'ffde00', 'ffef82', 'fffad7', '91ac93', '507252',
            '29582b', '063e08', '0d6d14', '31a825', '9cdb76', 'd4e8c5', 'aed6cf', '6bb3a7',
            '3e9082', '00715d', '0ba88c', '00e5b2', '68ffdd', 'bbfff0', '98dde3', '56afb7',
            '328c94', '016e78', '12cacb', '00fdff', 'affeff', 'd9ffff', '7090b3', '5369a1',
            '25347f', '10016d', '0018a7', '105fe3', '4caaec', 'acdef6', 'b1a1d0', '7f66ae', 
            '5f3890', '870fc5', 'bc7df7', 'd5bcf4'
        ],
        secondary: [
            '000000', '232323', '3c3c3c', '5a5a5a', '828282', 'e2e2e2', 'fafafa', 'b48686',
            '975252', '6c3333', '630000', 'be0000', 'ff0000', 'ff6d6d', 'ffd0d0', 'b8a495',
            '8b6a50', '7a4d29', '632c00', 'c54f00', 'ff8400', 'ffba57', 'ffdfac', 'd7cab1',
            'c4ad80', '865902', 'd3a400', 'ffde00', 'ffef82', 'fffad7', '91ac93', '507252',
            '29582b', '063e08', '0d6d14', '31a825', '9cdb76', 'd4e8c5', 'aed6cf', '6bb3a7',
            '3e9082', '00715d', '0ba88c', '00e5b2', '68ffdd', 'bbfff0', '98dde3', '56afb7',
            '328c94', '016e78', '12cacb', '00fdff', 'affeff', 'd9ffff', '7090b3', '5369a1',
            '25347f', '10016d', '0018a7', '105fe3', '4caaec', 'acdef6', 'b1a1d0', '7f66ae',
            '5f3890', '870fc5', 'bc7df7', 'd5bcf4'
        ],
        textColor: [
            '000000', '191919', '323232', '4c4c4c', '666666', '7f7f7f', '999999', 'b2b2b2', 'cccccc', 'e5e5e5', 'ffffff'
        ]
    };

    var _Program_Attributes={
        casName :{
            id:1,
            programModelName:"casName",
            displayName:null,
            sortIndex:1,
            editable:false,
            required:true,
            lookUp:null,
            show:true
        },
        applicationName :{
            id:2,
            programModelName:"applicationName",
            displayName:null,
            sortIndex:2,
            editable:false,
            required:true,
            lookUp:null,
            show:true
        },
        organizationName:{
            id:3,
            programModelName:"organizationName",
            displayName:"Organization",
            sortIndex:3,
            editable:false,
            required:true,
            lookUp:null,
            show:true
        },
        programName:{
            id:4,
            programModelName:"programName",
            displayName:"Program Name",
            sortIndex:4,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        status:{
            id:5,
            programModelName:"status",
            displayName:"Status",
            sortIndex:5,
            editable:false,
            required:true,
            lookUp:null,
            show:true
        },
        id:{
            id:6,
            programModelName:"id",
            displayName:"Program ID",
            sortIndex:6,
            editable:false,
            required:true,
            lookUp:null,
            show:true
        },
        programId:{
            id:7,
            programModelName:"programCode",
            displayName:"Program Code",
            sortIndex:7,
            editable:false,
            required:false,
            lookUp:null,
            show:false
        },
        
        city:{
            id:9,
            programModelName:"city",
            displayName:"City",
            sortIndex:9,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        state:{
            id:10,
            programModelName:"state",
            displayName:"State",
            sortIndex:10,
            editable:true,
            required:true,
            lookUp:[],
            show:true
        },
        zipCode:{
            id:15,
            programModelName:"zipCode",
            displayName:"Zip Code",
            sortIndex:15,
            editable:true,
            required:false,
            lookUp:null,
            show:false
        },
        startTerm:{
            id:11,
            programModelName:"startTerm",
            displayName:"Start Term",
            sortIndex:11,
            editable:true,
            required:true,
            lookUp:[],
            show:true
        },
        academicYear:{
            id:12,
            programModelName:"academicYear",
            displayName:"Start Year",
            sortIndex:12,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        startDate:{
            id:13,
            programModelName:"startDate",
            displayName:"Open Date",
            sortIndex:13,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        deadline:{
            id:14,
            programModelName:"deadline",
            displayName:"Deadline",
            sortIndex:14,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        waDisplayName:{
            id:14,
            programModelName:"waDisplayName",
            displayName:"WebAdmit Name",
            sortIndex:14,
            editable:true,
            required:false,
            lookUp:null,
            show:true
        },
        
        deadlineDisplay:{
            id:15,
            programModelName:"deadlineDisplay",
            displayName:"Deadline Display Date",
            sortIndex:15,
            editable:true,
            required:true,
            lookUp:null,
            show:true
        },
        addition_information:[
            {
                id:8,
                programModelName:"programLevel",
                displayName:"Level",
                sortIndex:8,
                editable:true,
                required:true,
                lookUp:null
            },
            {
                id:16,
                programModelName:"programType",
                displayName:"Program Type",
                sortIndex:15,
                editable:true,
                required:true,
                lookUp:null
            },
            {
                id:17,
                programModelName:"track",
                displayName:"Track",
                sortIndex:15,
                editable:true,
                required:false,
                lookUp:null
            },
            {
                id:18,
                programModelName:"delivery",
                displayName:"Delivery",
                sortIndex:15,
                editable:true,
                required:false,
                lookUp:null
            },
            {
                id:19,
                programModelName:"concentration",
                displayName:"Concentration",
                sortIndex:15,
                editable:true,
                required:false,
                lookUp:null
            },
            {
                id:20,
                programModelName:"department",
                displayName:"Department",
                sortIndex:15,
                editable:true,
                required:false,
                lookUp:null
            },
            {
                id:21,
                programModelName:"applicationType",
                displayName:"Application Type",
                sortIndex:15,
                editable:true,
                required:false,
                lookUp:null
            },
            {
                id:14,
                programModelName:"campus",
                displayName:"Campus",
                sortIndex:14,
                editable:true,
                required:false,
                lookUp:null
            }
        ]
    };