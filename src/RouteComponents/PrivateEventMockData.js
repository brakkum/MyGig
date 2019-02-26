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
            "time": "2019-05-13 19:30:00",
            "location": "Some Venue"
        },
        "eventComments": [
            {
                "commentId": 1,
                "commentText": "Test comment text, it's very cool.",
                "commentTime": "2019-02-13 10:30:27",
                "commentUser": {
                    "name": "Joe Jackson",
                    "id": 1,
                    "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                    "connectedToUser": true
                }
            },
            {
                "commentId": 2,
                "commentText": "More test comment text",
                "commentTime": "2019-02-13 10:45:21",
                "commentUser": {
                    "name": "Jimmy Page",
                    "id": 2,
                    "photoUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1NzI1MDM5MV5BMl5BanBnXkFtZTcwNDUwMTI2Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                    "connectedToUser": false
                },
            },
            {
                "commentId": 1,
                "commentText": "Test comment text, it's very cool. so cool in fact, that I believe there should be more of it. So much in fact, that it gets quite tedious to read. Wouldn't that be wonderful? I feel as though it's quite marvelous how far this little string goes.",
                "commentTime": "2019-02-14 10:30:27",
                "commentUser": {
                    "name": "Joe Jackson",
                    "id": 1,
                    "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                    "connectedToUser": true
                }
            },
        ],
        "userIsOwner": true
    }
};
