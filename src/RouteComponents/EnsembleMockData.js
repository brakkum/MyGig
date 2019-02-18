/*
Ensemble Page Data
{
    "success": boolean,
    "data": {
        "ensemble_name": string,
        "ensemble_members": [
            {
                "name": string,
                "id": int,
                "photo_url":string
            }
        ],
        "ensemble_comments": {
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
        "ensemble_name": "The Test Band",
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
        ],
        "ensemble_comments": [
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
