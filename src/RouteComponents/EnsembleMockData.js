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
        "ensembleName": "The Test Band",
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
        ],
        "ensembleComments": [
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
            }
        ],
        "user_is_owner": false
    }
};
