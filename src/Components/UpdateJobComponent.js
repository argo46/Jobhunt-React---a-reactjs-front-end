import React from 'react'
import {Form, FormGroup, Label, Input, Button, Card} from 'reactstrap'



function UpdateJobComponent (props) {

  return (
    <Card style={{width: '100%', maxWidth: '700px', padding: '15px', margin: 'auto'}}>
      <Form onSubmit={props.submitJob} >
        <FormGroup>
          <Label for="jobName">Job's Name</Label>
          <Input type="text" name="jobName" id="jobNameInput" placeholder="Nama Pekerjaan" defaultValue={props.jobData.name}/>
        </FormGroup>

        <FormGroup>
          <Label for="jobDescription">Job's Description</Label>
          <Input type="textarea" name="jobDescription" id="jobDescriptionInput" defaultValue={props.jobData.description}/>
        </FormGroup>

        <Label for="jobCategory">Job's Category</Label>
          <Input type="select" name="jobCategory" id="JobCategory" 
                defaultValue="7"
                >
                  {props.categoriesOption.map((e, key) => {
                  return <option key={key} value={e.id}
                  >{e.name}</option>})}
          </Input>

        <FormGroup>
          <Label for="jobSalary">Salary</Label>
          <Input type="number" name="jobSalary" id="jobSalary" placeholder="10000000" defaultValue={props.jobData.salary}/>
        </FormGroup>

        <FormGroup>
          <Label for="jobLocationn">Location</Label>
          <Input type="text" name="jobLocation" id="jobLocation" placeholder="Jakarta" defaultValue={props.jobData.location}/>
        </FormGroup>

        <FormGroup>
          <Label for="companyId">Company ID</Label>
          <Input type="text" name="companyID" id="companyId" placeholder="company ID" defaultValue={props.jobData.company_id}/>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  )
}

export default (UpdateJobComponent)