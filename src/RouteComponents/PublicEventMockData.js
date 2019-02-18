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
                        "id": int,
                        "photo_url": string
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
                    "id": int,
                    "photo_url": string
                },
                "comment_time": timestamp
            }
        }
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
                        "id": 1,
                        "photo_url": "url"
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2,
                        "photo_url": "url"
                    },
                    {
                        "name": "Mark Twain",
                        "id": 3,
                        "photo_url": "url"
                    }
                ]
            },
            {
                "ensemble_name": "Cool Dads",
                "ensemble_set_length": 90,
                "ensemble_members": [
                    {
                        "name": "Joe Jackson",
                        "id": 1,
                        "photo_url": "url"
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2,
                        "photo_url": "url"
                    }
                ]
            }
        ],
        "details": {
            "time": "Jul 28th",
            "location": "somewhere"
        },
        "event_comments": [
            {
                "comment_id": 1,
                "comment_text": "Test comment text, it's very cool.",
                "comment_user": {
                    "name": "Joe Jackson",
                    "id": 1,
                    "comment_time": "2019-02-13 10:30:27",
                    "photo_url": "url"
                }
            },
            {
                "comment_id": 2,
                "comment_text": "More test comment text",
                "comment_user": {
                    "name": "Jimmy Page",
                    "id": 2,
                    "comment_time": "2019-02-13 10:45:21",
                    "photo_url": "url"
                }
            }
        ]
    }
};
