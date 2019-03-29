import React from "react";
import DisplayCase from "./Containers/DisplayCase";
import Comment from "./Comment";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class CommentSection extends React.Component {
    // show comments for events, ensembles
    // props
    // comments: array of comments

    state = {
        comments: [],
        newComment: ""
    };

    addComment = () => {
        let jwt = this.props.jwt;
        let id = this.props.id;

        if (!this.state.newComment) {
            return;
        }

        this.setState({
            sendingRequest: true
        });

        fetch(this.props.submitUrl, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                Text: this.state.newComment,
                Id: id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("comment submitted");
                    this.repopulateComments();
                } else {
                    console.log("bad comment request ", json);
                    this.setState({
                        sendingRequest: false
                    });
                }
            }).catch(e => {
                console.log(e);
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    repopulateComments = () => {
        let jwt = this.props.jwt;
        let id = this.props.id;

        this.setState({
            sendingRequest: true,
            newComment: ""
        });

        fetch(this.props.getUrl, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                Id: id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        comments: json.comments
                    })
                    console.log("retrieved comments ", json)
                } else {
                    console.log("comments not retrieved ", json)
                }
                this.setState({
                    sendingRequest: false
                });
            }).catch(e => {
                console.log(e);
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    updateComment = comm => {
        this.setState({
            newComment: comm
        });
    };

    componentDidMount() {
        this.setState({
            comments: this.props.comments
        })
    }

    render() {
        return(
            <div>
                <DisplayCase label={this.props.label || "Comments"}>
                    {
                        this.state.comments && this.state.comments.map((comment, i) => {
                           return <Comment {...comment} key={i} />
                        })
                    }
                </DisplayCase>
                <div style={{maxWidth: "400px", margin: "auto"}}>
                    <Input
                        value={this.state.newComment}
                        type={"textarea"}
                        onChange={comm => this.updateComment(comm)}
                        maxLength={"500"}
                    />
                    <Button
                        preClickText={"Submit"}
                        onClick={this.addComment}
                        type={"submit"}
                        style={{float: "right"}}
                    />
                </div>
            </div>
        )
    }
}
