import React from 'react'
import {Form, FormGroup, Label, Input, Button, Card} from 'reactstrap'

import {connect} from 'react-redux'


function AddJobComponent (props) {

  return (
    <Card style={{width: '100%', maxWidth: '700px', padding: '15px', margin: 'auto'}}>
      <Form onSubmit={props.submitJob} >
        <FormGroup>
          <Label for="jobName">Job's Name</Label>
          <Input type="text" name="jobName" id="jobNameInput" placeholder="Nama Pekerjaan" />
        </FormGroup>

        <FormGroup>
          <Label for="jobDescription">Job's Description</Label>
          <Input type="textarea" name="jobDescription" id="jobDescriptionInput" />
        </FormGroup>

        <Label for="jobCategory">Job's Category</Label>
          <Input type="select" name="jobCategory" id="JobCategory" multiple>
            <option value='6'>Marketing</option>
            <option value='7'>Information Technology</option>
          </Input>

        <FormGroup>
          <Label for="jobSalary">Salary</Label>
          <Input type="number" name="jobSalary" id="jobSalary" placeholder="10000000" />
        </FormGroup>

        <FormGroup>
          <Label for="jobLocationn">Location</Label>
          <Input type="text" name="jobLocation" id="jobLocation" placeholder="Jakarta" />
        </FormGroup>

        <Label for="company">Company</Label>
          <Input type="select" name="companyID" id="company" 
                >
                  {props.companies.data.map((e, key) => {
                  return <option key={key} value={e.id}
                  >{e.name}</option>})}
          </Input>

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    companies: state.companies
  }
}

export default connect(mapStateToProps)(AddJobComponent)