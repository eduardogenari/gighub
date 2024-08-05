import { actionGetEventByIdEdu } from "@/actions/events";
import Image from "next/image";


export default async function EventDetailPage() {

    let event = await actionGetEventByIdEdu("17u8vOG6u3qwf3R");
  
    return (
      <main className="flex flex-col">
        <div className="h-screen w-screen flex items-center justify-center overflow-auto">
          <div className="relative h-screen w-screen">
            <Image
              layout="fill"
              objectFit="cover"
              alt={event?.name || 'Default Alt Text'}
              src={event?.images?.[3]?.url || '/public/images/001-paul-goback.jpg'}
              className="rounded-[0px]"
            />
          </div>
        </div>
        <div className="mt-64 w-4/5 self-center">
          <h1>id:   {event?.id}</h1>
          <h1>name:   {event?.name}</h1>
          <h1>buy on ticketmaster:   {event?.url}</h1>
          <pre>{JSON.stringify(paul, null, 2)}</pre>
        </div>
      </main>
    );
  }


let paul = {
    "name": "Paul McCartney",
    "type": "event",
    "id": "17u8vOG6u3qwf3R",
    "test": false,
    "url": "https://www.ticketmaster.co.uk/paul-mccartney-london-18-12-2024/event/350060D49DC944AF",
    "locale": "en-us",
    "images": [
      {
        "ratio": "3_2",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_3_2.jpg",
        "width": 1024,
        "height": 683,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_PORTRAIT_16_9.jpg",
        "width": 640,
        "height": 360,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_EVENT_DETAIL_PAGE_16_9.jpg",
        "width": 205,
        "height": 115,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/ac1/3bc6b045-e04f-4520-b1de-b552e2b1cac1_SOURCE",
        "width": 2426,
        "height": 1365,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_LANDSCAPE_16_9.jpg",
        "width": 1136,
        "height": 639,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_16_9.jpg",
        "width": 1024,
        "height": 576,
        "fallback": false
      },
      {
        "ratio": "4_3",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_CUSTOM.jpg",
        "width": 305,
        "height": 225,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RECOMENDATION_16_9.jpg",
        "width": 100,
        "height": 56,
        "fallback": false
      },
      {
        "ratio": "3_2",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_ARTIST_PAGE_3_2.jpg",
        "width": 305,
        "height": 203,
        "fallback": false
      },
      {
        "ratio": "3_2",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_PORTRAIT_3_2.jpg",
        "width": 640,
        "height": 427,
        "fallback": false
      },
      {
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_SOURCE",
        "width": 2909,
        "height": 4364,
        "fallback": false
      },
      {
        "ratio": "16_9",
        "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_LARGE_16_9.jpg",
        "width": 2048,
        "height": 1152,
        "fallback": false
      }
    ],
    "sales": {
      "public": {
        "startDateTime": "2024-06-21T09:00:00Z",
        "startTBD": false,
        "startTBA": false,
        "endDateTime": "2024-12-18T18:30:00Z"
      }
    },
    "dates": {
      "start": {
        "localDate": "2024-12-18",
        "localTime": "18:30:00",
        "dateTime": "2024-12-18T18:30:00Z",
        "dateTBD": false,
        "dateTBA": false,
        "timeTBA": false,
        "noSpecificTime": false
      },
      "timezone": "Europe/London",
      "status": {
        "code": "onsale"
      },
      "spanMultipleDays": false
    },
    "classifications": [
      {
        "primary": true,
        "segment": {
          "id": "KZFzniwnSyZfZ7v7nJ",
          "name": "Music"
        },
        "genre": {
          "id": "KnvZfZ7vAeA",
          "name": "Rock"
        },
        "subGenre": {
          "id": "KZazBEonSMnZfZ7v6F1",
          "name": "Pop"
        },
        "type": {
          "id": "KZAyXgnZfZ7v7nI",
          "name": "Undefined"
        },
        "subType": {
          "id": "KZFzBErXgnZfZ7v7lJ",
          "name": "Undefined"
        },
        "family": false
      }
    ],
    "promoter": {
      "id": "3431",
      "name": "MARSHALL ARTS LTD",
      "description": "MARSHALL ARTS LTD / NTL / GBR"
    },
    "promoters": [
      {
        "id": "3431",
        "name": "MARSHALL ARTS LTD",
        "description": "MARSHALL ARTS LTD / NTL / GBR"
      },
      {
        "id": "3431",
        "name": "MARSHALL ARTS LTD",
        "description": "MARSHALL ARTS LTD / NTL / GBR"
      }
    ],
    "pleaseNote": "Under 16s must be accompanied by an adult. Seats located on Level 4 (Upper Tier, Upper Bowl) are not recommended for those who have a fear of heights. **Floor Seating is not raked and other customers might stand during the performance** **Letters of authorisation will not be accepted at the venue when collecting tickets for events at the O2. If collecting from the box office, the card holder must be present** A max of 6 tickets per person and per household applies. Tickets in excess of 6 will be cancelled.",
    "priceRanges": [
      {
        "type": "standard",
        "currency": "GBP",
        "min": 55.0,
        "max": 170.0
      },
      {
        "type": "standard including fees",
        "currency": "GBP",
        "min": 63.5,
        "max": 186.6
      }
    ],
    "seatmap": {
      "staticUrl": "https://s1.ticketm.net/uk/tmimages/venue/maps/uk1/16176s.gif",
      "id": "seatmap"
    },
    "accessibility": {
      "id": "accessibility"
    },
    "ticketLimit": {
      "info": "Please note: There is a ticket Limit of 6 tickets per person and per credit card on this event",
      "id": "ticketLimit"
    },
    "ageRestrictions": {
      "legalAgeEnforced": false,
      "id": "ageRestrictions"
    },
    "ticketing": {
      "safeTix": {
        "enabled": false,
        "inAppOnlyEnabled": false
      },
      "allInclusivePricing": {
        "enabled": false
      },
      "id": "ticketing"
    },
    "_links": {
      "self": {
        "href": "/discovery/v2/events/17u8vOG6u3qwf3R?locale=en-us"
      },
      "attractions": [
        {
          "href": "/discovery/v2/attractions/K8vZ9171uq0?locale=en-us"
        }
      ],
      "venues": [
        {
          "href": "/discovery/v2/venues/KovZ9177PFf?locale=en-de"
        }
      ]
    },
    "_embedded": {
      "venues": [
        {
          "name": "The O2",
          "type": "venue",
          "id": "KovZ9177PFf",
          "test": false,
          "url": "https://www.ticketmaster.co.uk/the-o2-tickets-london/venue/435542",
          "locale": "en-de",
          "images": [
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/uk/dbimages/624v.gif",
              "width": 205,
              "height": 115,
              "fallback": false
            }
          ],
          "postalCode": "SE10 0DX",
          "timezone": "Europe/London",
          "city": {
            "name": "London"
          },
          "country": {
            "name": "Great Britain",
            "countryCode": "GB"
          },
          "address": {
            "line1": "Peninsula Square",
            "line2": "Greenwich"
          },
          "location": {
            "longitude": "0.005519",
            "latitude": "51.501581"
          },
          "markets": [
            {
              "name": "All of United Kingdom",
              "id": "201"
            },
            {
              "name": "London",
              "id": "202"
            }
          ],
          "dmas": [
            {
              "id": 601
            },
            {
              "id": 602
            }
          ],
          "boxOfficeInfo": {
            "acceptedPaymentDetail": "Visa, Mastercard, American Express, Maestro, Cash.",
            "willCallDetail": "Collection from The O2 main box office is on the day of the event from 2 hours before event doors opening time (see ticket for details). Purchasing credit card and Ticketmaster booking reference number are required for collection. Letters of authorisation are not accepted for collections or duplicate ticket collections."
          },
          "parkingDetail": "Car Park 1 is used for parking events within The O2 arena, it is approximately 350m from the main entrance at The O2. It is recommended that tickets are pre-booked due to limited availability. The Peninsula and other areas of Greenwich is a Controlled Parking Zone and there is no parking on the roads surrounding The O2.",
          "accessibleSeatingDetail": "Accessible Seating: The O2 operates a dedicated disabled access booking line. Contact: Tel: 020 8463 3359 Typetalk: 18001 020 8463 3359 Email: access@theo2.co.uk Monday to Friday: 09:00 – 19:00 Saturday to Sunday: 10:00 – 18:00 For more information on access at The O2 please visit www.theo2.co.uk",
          "generalInfo": {
            "generalRule": "Tickets cannot be cancelled or exchanged after purchase unless the event is cancelled, rescheduled or subject to a material alteration. Unlawful resale, or attempted unlawful resale of a ticket is grounds for seizure or cancellation without refund or other compensation. Tickets cannot be used for competitions, promotions, advertising or hospitality packages without the express written permission of the event promoter. Failure to adhere to these conditions may result in the ticket holder being refused entry or removed from the venue without refund or other compensation. The Venue is not liable for any Tickets that are lost or stolen. Standing tickets can not be duplicated under any circumstances. For any further or specific enquiry in regards to access requirements you can check www.theo2.co.uk/visit-us/accessibility or contact the access team via email at access@theO2.co.uk or by phone at 0208 463 3359 Admission (venues within The O2): There is no readmission once you have left a Venue. The use of unauthorised cameras, video and/or sound recording equipment is prohibited and such items may be confiscated at the Ticket holder's own risk. No food or drink is permitted to be brought into the Venue. A variety of food and beverages (alcoholic and non-alcoholic) will be available for purchase inside. The O2 is a no smoking venue. Please note: Level 4 is not recommended for people with vertigo or a fear of heights. In seated areas other members of the audience may stand up during the event. Floor seating is flat / not tiered Some events will contain flashing images Where ID is requested to gain entry to an event this must be a valid in date photo ID (e.g. Driving licence or passport). Invalid or out of date ID will not be accepted and you may be refused entrance.",
            "childRule": "All children must have a ticket. Children aged 14 or under must be accompanied by an Adult aged 18 or older. Children under 16 cannot enter the standing area. Events may be age restricted and it is the responsibility of the Ticket holder to check before purchasing. Please visit www.theo2.co.uk for further information. Acceptable proof of ID: Passport, international ID card, drivers licence, ISIC card. For a full list of terms and conditions please see www.theo2.co.uk"
          },
          "upcomingEvents": {
            "ticketmaster": 123,
            "_total": 123,
            "_filtered": 0
          },
          "ada": {
            "adaPhones": "020 8463 3359",
            "adaCustomCopy": "Accessible Seating \n\nAccessible bookings can be  purchased online when selecting the event via www.theo2.co.uk and visiting the https://www.theo2.co.uk/accessibility (copy to browser), Ticketmaster do not process any Accessible tickets for any event at The O2.\n \nYou can also book through the accessible booking line by calling 020 8463 3359. The accessible booking line is open 9am to 6pm Monday to Friday and 10am to 5pm every Saturday. \nIf you require assistance with your booking, please email access@theo2.co.uk where they will be able to assist you with booking the most appropriate tickets \n",
            "adaHours": "Service Hours:\n\nPhone line opening times differ on priority and general on sale date, see event details for timings.\n\nOpening hours:\nMonday to Friday: 09:00 / 18:00\nSaturday to Sunday: 10:00 / 17:00\n \n"
          },
          "_links": {
            "self": {
              "href": "/discovery/v2/venues/KovZ9177PFf?locale=en-de"
            }
          }
        }
      ],
      "attractions": [
        {
          "name": "Paul McCartney",
          "type": "attraction",
          "id": "K8vZ9171uq0",
          "test": false,
          "url": "https://www.ticketmaster.co.uk/paul-mccartney-entrades/artist/735610",
          "locale": "en-us",
          "externalLinks": {
            "youtube": [
              {
                "url": "https://www.youtube.com/user/PAULMCCARTNEY"
              }
            ],
            "twitter": [
              {
                "url": "https://twitter.com/PaulMcCartney"
              }
            ],
            "lastfm": [
              {
                "url": "http://www.last.fm/music/Paul+McCartney"
              }
            ],
            "facebook": [
              {
                "url": "https://www.facebook.com/PaulMcCartney"
              }
            ],
            "wiki": [
              {
                "url": "https://en.wikipedia.org/wiki/Paul_McCartney"
              }
            ],
            "musicbrainz": [
              {
                "id": "ba550d0e-adac-4864-b88b-407cab5e76af"
              }
            ],
            "homepage": [
              {
                "url": "http://www.paulmccartney.com/"
              }
            ]
          },
          "aliases": [
            "mcartney",
            "paul mccartney",
            "paul macartney",
            "paul mcartney",
            "paul mccarthy",
            "paul mccartny"
          ],
          "images": [
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_3_2.jpg",
              "width": 1024,
              "height": 683,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_PORTRAIT_16_9.jpg",
              "width": 640,
              "height": 360,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_EVENT_DETAIL_PAGE_16_9.jpg",
              "width": 205,
              "height": 115,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/ac1/3bc6b045-e04f-4520-b1de-b552e2b1cac1_SOURCE",
              "width": 2426,
              "height": 1365,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_LANDSCAPE_16_9.jpg",
              "width": 1136,
              "height": 639,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_16_9.jpg",
              "width": 1024,
              "height": 576,
              "fallback": false
            },
            {
              "ratio": "4_3",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_CUSTOM.jpg",
              "width": 305,
              "height": 225,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RECOMENDATION_16_9.jpg",
              "width": 100,
              "height": 56,
              "fallback": false
            },
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_ARTIST_PAGE_3_2.jpg",
              "width": 305,
              "height": 203,
              "fallback": false
            },
            {
              "ratio": "3_2",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_RETINA_PORTRAIT_3_2.jpg",
              "width": 640,
              "height": 427,
              "fallback": false
            },
            {
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_SOURCE",
              "width": 2909,
              "height": 4364,
              "fallback": false
            },
            {
              "ratio": "16_9",
              "url": "https://s1.ticketm.net/dam/a/5a0/ca8fbbf7-4803-4af6-8b18-50bbff2695a0_TABLET_LANDSCAPE_LARGE_16_9.jpg",
              "width": 2048,
              "height": 1152,
              "fallback": false
            }
          ],
          "classifications": [
            {
              "primary": true,
              "segment": {
                "id": "KZFzniwnSyZfZ7v7nJ",
                "name": "Music"
              },
              "genre": {
                "id": "KnvZfZ7vAeA",
                "name": "Rock"
              },
              "subGenre": {
                "id": "KZazBEonSMnZfZ7v6F1",
                "name": "Pop"
              },
              "type": {
                "id": "KZAyXgnZfZ7v7nI",
                "name": "Undefined"
              },
              "subType": {
                "id": "KZFzBErXgnZfZ7v7lJ",
                "name": "Undefined"
              },
              "family": false
            }
          ],
          "upcomingEvents": {
            "ticketnet": 2,
            "mfx-es": 3,
            "ticketmaster": 9,
            "_total": 14,
            "_filtered": 0
          },
          "_links": {
            "self": {
              "href": "/discovery/v2/attractions/K8vZ9171uq0?locale=en-us"
            }
          }
        }
      ]
    }
  };
