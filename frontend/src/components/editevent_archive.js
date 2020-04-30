import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import '../create-event.css'

export default class CreateEvent extends Component {
    constructor(props) {
        // always call super when defining constructor of subclass (React Component)
        super(props);

        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            event: '',
            date: new Date(),
            description: '',
            img: '',
            url: '',
            text: '',
            tags: '',
            color: ''
        }
    }

    // // React lifecycle method - automatically called before anything loads
    // componentDidMount() {
    //     this.setState(

    //     )
    // }

    // Set state when event is changed
    onChangeEvent(e) {
        this.setState({
            event: e.target.value
        });
    }

    // Set state when date is changed
    onChangeDate = date => this.setState({date})

    // Set state when description is changed
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    // Set state when picture is changed
    onChangeImg(e) {
        this.setState({
            img: e.target.value
        });
    }

    // Set state when url is changed
    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    // Set state when link text is changed
    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    // Set state when tags are changed
    onChangeTags(e) {
        this.setState({
            tags: e.target.value
        });
    }

    // Set state when tag color is changed
    onChangeColor(e) {
        this.setState({
            color: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const myEvent = {
            event: this.state.event,
            date: this.state.date,
            description: this.state.description,
            img: this.state.img,
            url: this.state.url,
            text: this.state.text,
            tags: this.state.tags,
            color: this.state.color
        }
        console.log(myEvent);

        this.setState({
            event: '',
            date: new Date(),
            description: '',
            img: '',
            url: '',
            text: '',
            tags: '',
            color: ''
        })

        // Return to homepage
        // window.location = '/';
    }

    render() {
        return (
            <div className="event-container">
                <h3>Edit Event</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Event Name: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.event}
                            onChange = {this.onChangeEvent}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            value = {this.state.date}
                            onChange = {this.onChangeDate}
                            />
                        </div>
                   </div>
                   <div className="form-group">
                        <label>Description: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.description}
                            onChange = {this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.img}
                            onChange = {this.onChangeImg}
                            />
                    </div>
                    <div className="form-group">
                        <label>Event banner picture link: </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.url}
                            onChange = {this.onChangeURL}
                            />
                    </div>
                    <div className="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Organization</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01" onChange={this.onChangeText} value={this.state.text}>
                            <option selected>Choose...</option>
                            <option value="1">org 1</option>
                            <option value="2">org 2</option>
                            <option value="3">org 3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tags: </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.tags}
                            onChange = {this.onChangeTags}
                            />
                    </div>
                    <div className="form-group">
                        <label>Cancellation/refund policy: </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.color}
                            onChange = {this.onChangeColor}
                            />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Edit Event" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}