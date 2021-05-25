import React, {Component} from 'react';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import ConfirmModal from '../../common/confirm_modal';





class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modal: false,
        id: '',
        password: '',
        password_confirm: '',
        name: '',
        phone: '',
        storename: '',
        address: '',
        address_detail: '',
    }
  }

  handleOnId = (e) =>{
    this.setState({id: e.target.value});
    console.log(this.state.id);
  }

  handleOnPw = (e) =>{
    this.setState({password: e.target.value});
  }

  handleOnPwConfirm = (e) =>{
    this.setState({password_confirm: e.target.value});
  }

  handleOnName = (e) =>{
    this.setState({name: e.target.value});
  }

  handleOnPhone = (e) =>{
    this.setState({phone: e.target.value});
  }

  handleOnStore = (e) =>{
    this.setState({storename: e.target.value});
  }

  handleOnAddress = (e) =>{
    this.setState({address: e.target.value});
  }

  handleOnAddressDetail = (e) =>{
    this.setState({address_detail: e.target.value});
  }

  openModal = () =>{
    var form_data = {
      id:this.state.id,
      password:this.state.password,
      password_confirm:this.state.password_confirm,
      name:this.state.name,
      phone:this.state.phone,
      storename:this.state.storename,
      address:this.state.address,
      address_detail:this.state.address_detail,
    }
    this.props.dataReceive(form_data);
    this.setState({modal: true});
  }

  closeModal = () =>{
    this.setState({modal: false});
  }

  render() { 
    return ( 
      <Form >
        <FormGroup row>
          <Label for="userId" sm={5}>id</Label>
          <Col sm={10}>
            <Input value={this.state.id} onChange={this.handleOnId} type="id" name="email" id="userid" placeholder="ID" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={5}>Password</Label>
          <Col sm={10}>
            <Input value={this.state.password} onChange={this.handleOnPw} type="password" name="password" id="password" placeholder="비밀번호" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="passwordconfirm" sm={5}>Password-confirm</Label>
          <Col sm={10}>
            <Input value={this.state.password_confirm} onChange={this.handleOnPwConfirm} type="password" name="passwordconfirm" id="passwordconfirm" placeholder="비밀번호 확인" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userName" sm={5}>Name</Label>
          <Col sm={10}>
            <Input value={this.state.name} onChange={this.handleOnName} type="text" name="userName" id="userName" placeholder="이름" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phoneNumber" sm={5}>전화번호</Label>
          <Col sm={10}>
            <Input value={this.state.phone} onChange={this.handleOnPhone} type="text" name="phoneNumber" id="phoneNumber" placeholder="전화번호" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="storeName" sm={5}>상호명</Label>
          <Col sm={10}>
            <Input value={this.state.storename} onChange={this.handleOnStore} type="text" name="storeName" id="storeName" placeholder="상호명" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="address" sm={5}>주소</Label>
          <Col sm={10}>
            <Input value={this.state.address} onChange={this.handleOnAddress} type="text" name="address" id="address" placeholder="주소" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="detailAddress" sm={5}>상세주소</Label>
          <Col sm={10}>
            <Input value={this.state.address_detail} onChange={this.handleOnAddressDetail} type="text" name="detailAddress" id="detailAddress" placeholder="상세주소" />
          </Col>
        </FormGroup>
          <ConfirmModal open={this.state.modal} close={this.closeModal} msg="등록 완료" />
          <Col sm={{ size: 30, offset: 0 }}>
            <Button onClick={this.openModal} color="primary">등록</Button>
          </Col>
      </Form>
    );
  }
}
export default RegisterForm;