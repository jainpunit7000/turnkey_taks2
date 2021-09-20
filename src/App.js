import React, { Component } from 'react'
import "./app.css" ;
import { Button, Form, Input, Select, TextArea} from 'semantic-ui-react'
import {validateEmail, validateContact} from './helpers/validators' ;


//Options for Dropdown Element
const options_category = [
  { key: 'start', text: 'Startup', value: 'startup' },
  { key: 'indivi', text: 'Individual', value: 'individual' },
  { key: 'large', text: 'Large Enterprise', value: 'large_enterprise' },

]

const options_documentation = [
  { key: 'yess', text: 'Yes', value: 'yes' },
  { key: 'nooo', text: 'No', value: 'no' }
]

const options3_budget = [
  { key: '<1 USD', text: '<1K USD', value: '<1 USD' },
  { key: '1-5 USD', text: '1K USD - 5K USD', value: '1-5 USD' },
  { key: '5-10 USD', text: '5K USD - 10K USD', value: '5-10 USD' },
  { key: '10-20 USD', text: '10K USD - 20K USD', value: '10-20 USD' },
  { key: '20+ USD', text: '20K + USD', value: '20+ USD' },
]


//Main App Component
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: {
        value: "",
        error: false
      },
      contact: {
        value: "",
        error: false
      },
      email: {
        value: "",
        error: false
      },
      selectedOptions: ["Startup", "Yes", "<1K USD"],
      techStack: {
        value: "",
        error: false
      }
    }
  }

  handleTextChange = (e,{value}) => {
    this.setState({
      [e.target.id]: {value, error: false }
    }) ;
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    if (this.state.name.value === "") {
      this.setState({
        name: {
          ...this.state.name,
          error: true
        }
      })
      error = true;
    }
    if (this.state.contact.value === "" || !validateContact(this.state.contact.value)) {
      this.setState({
        contact: {
          ...this.state.contact,
          error: true
        }
      })
      error = true;
    }
    if (this.state.email.value === "" || !validateEmail(this.state.email.value)) {
      this.setState({
        email: {
          ...this.state.email,
          error: true
        }
      })
      error = true;
    }
    if (this.state.techStack.value === "") {
      this.setState({
        techStack: {
          ...this.state.techStack,
          error: true
        }
      })
      error = true;
    }
    if (!error) {
      const newData = {
        name: this.state.name.value,
        contact: this.state.contact.value,
        email: this.state.email.value,
        techStack: this.state.techStack.value
      };
      try {
        var ParsedData = JSON.parse(localStorage.getItem("userFormData"))
        var finalData = [...ParsedData];
      }
      catch (err) {
        finalData = [];
      }
      finalData.push(newData);
      localStorage.setItem("userFormData", JSON.stringify(finalData));
    }
  }
  render() {
      return (
      <div className="main-div">
        <h1 className="main-header">TURNKEY TECH</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field onChange={this.handleTextChange}
            control={Input}
            label='Your Name'
            id="name"
            error={this.state.name.error ? { content: "This field is required", pointing: "below" } : null}
          />
          <Form.Field onChange={this.handleTextChange}
            control={Input}
            label='Contact Number'
            id="contact"
            error={
              this.state.contact.error ? 
                this.state.contact.value===""? 
                  { content: "This field is required", pointing: "below" }
                  :{ content: "Please, enter a valid contact number", pointing: "below" } 
                : null}
          />
          <Form.Field onChange={this.handleTextChange}
            control={Input}
            label='Your Email'
            id="email"
            error={
              this.state.email.error ? 
                this.state.email.value===""? 
                  { content: "This field is required", pointing: "below" }
                  :{ content: "Please, enter a valid email", pointing: "below" } 
                : null}
          />
          <Form.Field
            control={Select}
            label='How would you categorise yourself?'
            options={options_category}
            placeholder='Startup'
            id="categoriseYourself"
            defaultValue={this.state.selectedOptions}
          />
          <Form.Field onChange={this.handleTextChange}
            control={Input}
            label='Do you have a preferred tech stack? If yes, which one?'
            id="techStack"
            error={this.state.techStack.error ? { content: "This field is required", pointing: "below" } : null}
          />
          <Form.Field
            control={Select}
            label='Do you have product specs or wireframes documented?'
            options={options_documentation}
            placeholder='Yes'
            id="productSpecs"
            defaultValue={this.state.selectedOptions}
          />
          <Form.Field
            control={Select}
            label='What is your estimated budget?'
            options={options3_budget}
            placeholder='< 1K USD'
            id="estimateBudget"
            defaultValue={this.state.selectedOptions}
          />
          <Form.Field onChange={this.handleTextChange}
            control={TextArea}
            label='Describe the project in few lines'
            id="description"
          />
          <Form.Field className="button-hover" control={Button} color={"teal"} fluid>Request Quote</Form.Field>
        </Form>
      </div >
    )
  }
}

export default App ;