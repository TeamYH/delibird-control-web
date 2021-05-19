import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const RegisterForm = (props) => {
  return (
    <Form>
      <FormGroup row>
        <Label for="userId" sm={5}>id</Label>
        <Col sm={10}>
          <Input type="id" name="email" id="userid" placeholder="ID" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={5}>Password</Label>
        <Col sm={10}>
          <Input type="password" name="password" id="password" placeholder="비밀번호" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="passwordconfirm" sm={5}>Password-confirm</Label>
        <Col sm={10}>
          <Input type="password" name="passwordconfirm" id="passwordconfirm" placeholder="비밀번호 확인" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="userName" sm={5}>Name</Label>
        <Col sm={10}>
          <Input type="text" name="userName" id="userName" placeholder="이름" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="phoneNumber" sm={5}>전화번호</Label>
        <Col sm={10}>
          <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="전화번호" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="storeName" sm={5}>상호명</Label>
        <Col sm={10}>
          <Input type="text" name="storeName" id="storeName" placeholder="상호명" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address" sm={5}>주소</Label>
        <Col sm={10}>
          <Input type="text" name="address" id="address" placeholder="주소" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="detailAddress" sm={5}>상세주소</Label>
        <Col sm={10}>
          <Input type="text" name="detailAddress" id="detailAddress" placeholder="상세주소" />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 30, offset: 0 }}>
          <Button>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default RegisterForm;