import React from "react";
import DisplayCase from "./Containers/DisplayCase";
import Comment from "./Comment";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class CommentSection extends React.Component {
    // show comments for events, ensembles
    // props
    // comments: array of comments

    _jwt = null;
    _id = null;

    state = {
        comments: [],
        newComment: ""
    };

    addComment = () => {
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
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                Text: this.state.newComment,
                Id: this._id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.repopulateComments();
                } else {
                    this.setState({
                        sendingRequest: false
                    });
                }
            }).catch(e => {
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    repopulateComments = () => {
        this.setState({
            sendingRequest: true,
            newComment: ""
        });

        fetch(this.props.getUrl, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                Id: this._id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        comments: json.comments
                    });
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
        this._jwt = this.props.jwt;
        this._id = this.props.id;

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
                        placeholder={"Add a comment"}
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
