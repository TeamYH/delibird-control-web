import React, {Component} from 'react';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import ConfirmModal from '../../common/confirm_modal';





class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modal: false,
        serial: '',
        name: '',
        memo: '',
    }
  }

  handleOnSerial = (e) =>{
    this.setState({serial: e.target.value});
    console.log(this.state.id);
  }

  handleOnName = (e) =>{
    this.setState({name: e.target.value});
  }

  handleOnMemo = (e) =>{
    this.setState({memo: e.target.value});
  }

  openModal = () =>{
    var form_data = {
      serial:this.state.serial,
      name:this.state.name,
      memo:this.state.memo,
    }
    this.props.getData(form_data);
    this.setState({modal: true});
  }

  closeModal = () =>{
    this.setState({modal: false});
  }

  render() { 
    return ( 
      <Form >
        <FormGroup row>
          <Label for="userId" sm={5}>Serial-number</Label>
          <Col sm={10}>
            <Input value={this.state.serial} onChange={this.handleOnSerial} type="id" name="serialnumber" id="serialnumber" placeholder="Serial_number" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={5}>이름</Label>
          <Col sm={10}>
            <Input value={this.state.name} onChange={this.handleOnName} type="text" name="place" id="place" placeholder="딜리버드 이름" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="passwordconfirm" sm={5}>메모사항</Label>
          <Col sm={10}>
            <Input value={this.state.memo} onChange={this.handleOnMemo} type="text" name="memo" id="memo" placeholder="메모" />
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