import React from 'react'
import {Form, FormGroup, Label, Input, Button, Card, FormText} from 'reactstrap'



function UpdateCompanyComponent (props) {

  return (
    <Card style={{width: '100%', maxWidth: '700px', padding: '15px', margin: 'auto'}}>
      <Form onSubmit={props.submitCompany} >
        <FormGroup>
          <Label for="companyName">Company Name</Label>
          <Input type="text" name="companyName" id="companyName" placeholder="Company Name"  defaultValue={props.companyData.name}/>
        </FormGroup>

        <FormGroup>
          <Label for="companyLocation">Company Location</Label>
          <Input type="text" name="companyLocation" id="companyLocation" placeholder="Company Location" defaultValue={props.companyData.location}/>
        </FormGroup>

        <FormGroup>
          <Label for="companyDeskription">Company Description</Label>
          <Input type="textarea" name="companyDescrioption" id="companyDescription" defaultValue={props.companyData.description}/>
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

export default (UpdateCompanyComponent)