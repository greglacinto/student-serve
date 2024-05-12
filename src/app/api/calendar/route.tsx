// api > hello > route.ts
import { google } from "googleapis";
import {NextRequest, NextResponse} from "next/server";
import path from "path";

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, 
    process.env.SECRET_ID,
    process.env.REDIRECT
);

const credentials = JSON.parse(process.env.CREDENTIALS !)
const calendarId = process.env.CALENDAR_ID

const GOOGLE_PRIVATE_KEY= process.env.PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.CLIENT_EMAIL
const GOOGLE_PROJECT_NUMBER = process.env.PROJECT_NUMBER
const GOOGLE_CALENDAR_ID = process.env.CALENDAR_ID

// google calendar API settings
const scopes = 'https://www.googleapis.com/auth/calender';
const calendar = google.calendar({
    version: 'v3'
});

const auth = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY,
    scopes,
);

const auths = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'student-serve-423020-bf11f9b5d4a4.json'),
    scopes: 'https://www.googleapis.com/auth/calendar',
})


// date-time string for calendar
const dateTimeForCalendar = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    if ( month < 10 ) {
        month = Number(`0${month}`);
    }
    const year = date.getFullYear();
    let day = date.getDate();
    if ( day < 10 ) {
        day = Number(`0${day}`);
    }
    let hour = date.getHours();
    if ( hour < 10 ) {
        hour = Number(`0${hour}`);
    }
    let minute = date.getMinutes();
    if ( minute < 10 ) {
        minute = Number(`0${minute}`);
    }
    const second = 0
    const millisecond = 0

    const startDate = new Date(year, month-1, day, hour, minute, second, millisecond);
    // to handle offset
    startDate.setTime(startDate.getTime() - 4 * 60 * 60 * 1000);
    const endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }

}

console.log(dateTimeForCalendar())

const event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': dateTimeForCalendar().start,
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': dateTimeForCalendar().end,
      'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
      ]
    }
  };


// const insertEvent = async(event: any) => {

//     auths.getClient().then(a=>{ 
//         calendar.events.insert({ 
//           auth:a, 
//           calendarId: GOOGLE_CALENDAR_ID, 
//           requestBody: event, 
//         }, function(err: any, event: any) { 
//           if (err) { 
//             console.log('There was an error contacting the Calendar service: ' + err); 
//             return; 
//           } 
//           console.log('Event created: %s', event.data); 
//         //   res.jsonp("Event successfully created!"); 
//         }); 
//       })

    // try {
    //     const resp = await calendar.events.insert({
    //         auth: auth,
    //         calendarId: calendarId,
    //         requestBody: event
    //     });
    //     console.log(resp)
    //     if ( resp['status'] == 200 && resp['statusText'] == 'OK') {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // } catch (error) {
    //     console.log(`Error at InsertEvent --> ${error}`);
    //     return 0;
    // }
// }

export async function GET (request: NextRequest){
    const greeting = "Hello World!!"
    const json = {
        greeting
    };
    const authClient_1 = await oauth2Client.getAccessToken()
    console.log(authClient_1)
    try {
        const g_calender = google.calendar({
            version: 'v3',
            auth: oauth2Client
        })
        const resp = await g_calender.events.list({
            calendarId: calendarId,
            timeMin: (dateTimeForCalendar().start).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        })

        console.log(resp.data.items)
    } catch (err) {
        console.log('Error fetching calendar details ', err)
    }
    
    
    return NextResponse.json(json);
}