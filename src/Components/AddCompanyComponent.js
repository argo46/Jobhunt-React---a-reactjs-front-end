import React from 'react'
import {Form, FormGroup, Label, Input, Button, Card, FormText} from 'reactstrap'



function AddCompanyComponent (props) {

  return (
    <Card style={{width: '100%', maxWidth: '700px', padding: '15px', margin: 'auto'}}>
      <Form onSubmit={props.submitCompany} >
        <FormGroup>
          <Label for="companyName">Company Name</Label>
          <Input type="text" name="companyName" id="companyName" placeholder="Company Name" />
        </FormGroup>

        <FormGroup>
          <Label for="companyLocation">Company Location</Label>
          <Input type="text" name="companyLocation" id="companyLocation" placeholder="Company Location" />
        </FormGroup>

        <FormGroup>
          <Label for="companyDescription">Company Description</Label>
          <Input type="textarea" name="companyDescription" id="companyDescription" />
        </FormGroup>

        <FormGroup>
          <Label for="companyLogo">Company Logo</Label>
          <Input type="file" name="companyLogo" id="companyLogo" accept='image/*'/>
          <FormText color="primary">
            Upload an Image of the company logo. (file must be in Image format)
          </FormText>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  )
}

export default (AddCompanyComponent)