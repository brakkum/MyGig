/*
Private Event Page Data
{
    "success": boolean,
    "data": {
        "event_name": string,
        "ensembles": array [
            {
                "ensemble_name": string,
                "ensemble_set_length": int,
                "ensemble_members: array[
                    {
                        "name": string,
                        "id": int
                    }
                ]
            }
        ],
        "details": {
            "time": datetime,
            "location": string
        },
        "comments": {
            {
                "comment_id": int,
                "comment_text": string,
                "comment_user" {
                    "name": string,
                    "id": int
                },
                "comment_time": timestamp
            }
        },
        "user_is_owner": boolean
    }
}
*/
export default {
    "success": true,
    "data": {
        "name": "the show!",
        "ensembles": [
            {
                "ensemble_name": "Some Guys",
                "ensemble_set_length": 45,
                "ensemble_members": [
                    {
                        "name": "Joe Jackson",
                        "id": 1
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2
                    },
                    {
                        "name": "Mark Twain",
                        "id": 3
                    }
                ]
            },
            {
                "ensemble_name": "Cool Dads",
                "ensemble_set_length": 90,
                "ensemble_members": [
                    {
                        "name": "Joe Jackson",
                        "id": 1
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2
                    }
                ]
            }
        ],
        "details": {
            "time": "2019-05-13 19:30:00",
            "location": "Some Venue"
        },
        "event_comments": [
            {
                "comment_id": 1,
                "comment_text": "Test comment text, it's very cool.",
                "comment_user": {
                    "name": "Joe Jackson",
                    "id": 1,
                    "comment_time": "2019-02-13 10:30:27"
                }
            },
            {
                "comment_id": 2,
                "comment_text": "More test comment text",
                "comment_user": {
                    "name": "Jimmy Page",
                    "id": 2,
                    "comment_time": "2019-02-13 10:45:21"
                }
            }
        ],
        "user_is_owner": true
    }
};
