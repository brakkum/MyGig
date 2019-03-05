/*
Ensemble Page Data
{
    "success": boolean,
    "data": {
        "requests": [

        ],
        "connections": [

        ]
    }
}
*/
export default {
    "success": true,
    "data": {
        "requests": [
            {
                "name": "Jimmy Page",
                "id": 2,
                "photoUrl": "https://m.media-amazon.com/images/M/MV5BMTQ1NzI1MDM5MV5BMl5BanBnXkFtZTcwNDUwMTI2Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg",
                "connectedToUser": false,
                "connectedSince": null
            }
        ],
        "connections": [
            {
                "name": "Joe Jackson",
                "id": 1,
                "photoUrl": "https://memberdata.s3.amazonaws.com/jo/joejackson/photos/joejackson_photo_gal_37255_photo_35883055_lr.jpg",
                "connectedToUser": true,
                "connectedSince": "2018/03/04 12:35:00"
            },
            {
                "name": "Mark Twain",
                "id": 3,
                "photoUrl": "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MTUzNTA5OTAz/mark-twain-9512564-1-402.jpg",
                "connectedToUser": true,
                "connectedSince": "2018/12/28 07:45:36"
            }
        ]
    }
};
