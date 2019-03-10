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
                "ensembleName": "Some Guys",
                "ensembleSetLength": 45,
                "ensembleMembers": [
                    {
                        "name": "Joe Jackson",
                        "id": 1,
                        "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                        "connectedToUser": true
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2,
                        "photoUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1NzI1MDM5MV5BMl5BanBnXkFtZTcwNDUwMTI2Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                        "connectedToUser": false
                    },
                    {
                        "name": "Mark Twain",
                        "id": 3,
                        "photoUrl": "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MTUzNTA5OTAz/mark-twain-9512564-1-402.jpg",
                        "connectedToUser": true
                    }
                ]
            },
            {
                "ensembleName": "Cool Dads",
                "ensembleSetLength": 90,
                "ensembleMembers": [
                    {
                        "name": "Joe Jackson",
                        "id": 1,
                        "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                        "connectedToUser": true
                    },
                    {
                        "name": "Jimmy Page",
                        "id": 2,
                        "photoUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1NzI1MDM5MV5BMl5BanBnXkFtZTcwNDUwMTI2Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                        "connectedToUser": false
                    }
                ]
            }
        ],
        "details": {
            "time": "Jul 28th",
            "location": "somewhere"
        },
        "eventComments": [
            {
                "commentId": 1,
                "commentText": "Test comment text, it's very cool.",
                "commentUser": {
                    "name": "Joe Jackson",
                    "id": 1,
                    "commentTime": "2019-02-13 10:30:27",
                    "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                    "connectedToUser": true
                }
            },
            {
                "commentId": 2,
                "commentText": "More test comment text",
                "commentUser": {
                    "name": "Jimmy Page",
                    "id": 2,
                    "commentTime": "2019-02-13 10:45:21",
                    "photoUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1NzI1MDM5MV5BMl5BanBnXkFtZTcwNDUwMTI2Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                    "connectedToUser": false
                }
            },
            {
                "commentId": 3,
                "commentText": "More test comment text",
                "commentUser": {
                    "name": "Mark Twain",
                    "id": 3,
                    "commentTime": "2019-02-14 10:05:21",
                    "photoUrl": "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MTUzNTA5OTAz/mark-twain-9512564-1-402.jpg",
                    "connectedToUser": true
                }
            }
        ],
        "user_is_owner": true
    }
};
