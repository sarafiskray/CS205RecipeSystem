// **************************
// Owned by: Luke Potasiewicz
// **************************
import React, {Component} from 'react';
import {appState, partial} from "./App";
import {postRecipe} from "./actions";

class AddARecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            payload: {
                title: "",
                cook_time: "",
                img_url: "",
                ingredients: [""],
                steps: [""],
                userId: appState.id || "0"
            }
        };
        this._submit = this._submit.bind(this);
        this._createInput = this._createInput.bind(this);
        this._createInputList = this._createInputList.bind(this);
    }

    _createInput(target) {
        return <input type="text" value={this.state.payload[target]} onChange={
            partial(
                (t, event) => {
                    const localPayload = this.state.payload;
                    localPayload[t] = event.target.value;
                    this.setState({payload: localPayload});
                }, target)
        }/>
    }

    _submit() {
        postRecipe(this.state.payload);
        this.setState({submitted: true});
    }

    _createInputList(target) {
        if (this.state.payload[target].slice(-1)[0] !== "") {
            const localPayload = this.state.payload;
            localPayload[target].push("");
            this.setState({payload: localPayload});
        }
        return this.state.payload[target].map((element, i) => (
            <div key={i}>
                <input type="text" value={element} onChange={
                    partial(
                        (t, event) => {
                            const localPayload = this.state.payload;
                            localPayload[t][i] = event.target.value;
                            this.setState({payload: localPayload});
                        }, target)
                }/>
                {this.state.payload[target].length - 1 !== i ?
                    <button onClick={
                        partial(
                            (t) => {
                                const localPayload = this.state.payload;
                                localPayload[t].splice(i, 1);
                                this.setState({payload: localPayload});
                            }, target)

                    }>X</button> : null
                }
            </div>))
    }

    toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg";
            img.src = src;
        }
    }


    render() {
        if (this.state.submitted) {
            return (
                <div className="add-a-recipe">
                    <div className={""}>
                        {"Your recipe has been submitted."}
                    </div>
                </div>
            );
        }
        if (document.getElementById("data")) {
            const localPayload = this.state.payload;
            localPayload.img_url = document.getElementById("data").innerHTML;
            if (this.state.payload.img_url !== localPayload.img_url) {
                this.setState({payload: localPayload});
            }
        }
        return (
            <div className="add-a-recipe">
                <p>Name</p>
                {this._createInput("title")}
                <br/>
                <p>Time to Cook</p>
                {this._createInput("cook_time")}
                <br/>
                {/*This is no longer being used but is kept for refrence*/}
                {/*<p>Image URL</p>*/}
                {/*<input type="text" value={this.state.img_url} onChange={*/}
                {/*(event) => {*/}
                {/*this.setState({img_url: event.target.value});*/}
                {/*this.toDataURL(*/}
                {/*event.target.value,*/}
                {/*(dataUrl) => {*/}
                {/*const localPayload = this.state.payload;*/}
                {/*localPayload.img_url = dataUrl;*/}
                {/*this.setState({payload: localPayload});*/}
                {/*});*/}
                {/*}*/}
                {/*}/>*/}
                <p>Upload Image</p>
                <input type="file" accept={"image/*"} onChange={
                    partial((localThis, e) => {
                        const files = Array.from(e.target.files);
                        const reader = new FileReader();
                        reader.onloadend = function (e) {
                            const localPayload = localThis.state.payload;
                            localPayload.img_url = e.target.result;
                            localThis.setState({payload: localPayload});
                        };
                        reader.readAsDataURL(files[0])
                    }, this)
                }/>
                <br/>
                {
                    this.state.payload.img_url
                        ? [<img src={this.state.payload.img_url} alt={"recipe visual"}/>,
                            <br/>]
                        : null
                }
                <section>
                    <p>Ingredients</p>
                    <br/>
                    {this._createInputList("ingredients")}
                    <p>Steps</p>
                    <br/>
                    {this._createInputList("steps")}
                </section>
                <button className={"goButton"} onClick={this._submit}>Submit</button>
            </div>
        );
    }
}

export {AddARecipe};