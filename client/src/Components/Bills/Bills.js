import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import moment from "moment";

import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faPlusCircle,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

function Bills(props) {
  const { push } = props.history;
  const { sideBarToggle, isSideBarOpen, onChange, date, className } = props;

  // ------------------------------> Modal State <------------------------ //
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // ------------------------------> Form State <------------------------ //
  const [formData, setFormData] = useState({
    name: "",
    date: moment().format("YYYY-MM-DD"),
    amount: 0,
    repeat: false,
    paid: false,
  });

  const onInputChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onCheckboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  // --------------------> Bills State <-------------------------------- //
  const [billsData, setBillsData] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log("user id", id);
    console.log("us", axios.get(`http://127.0.0.1:5000/api/bills/user/${id}`));
    axios.get(`http://127.0.0.1:5000/api/bills/user/${id}`).then((res) => {
      console.log("bills data", res.data);
      //setBillsData(res.data);
    });
  }, []);

  const addBill = (event) => {
    // ----------------------------------------> INSERT TRY CATCH HERE
    if (formData.billName.length === 0 || formData.amount === 0) {
      return alert("No input!");
    } else {
      formData.amount = Number(formData.amount);
      billsData.push(formData);
    }
    console.log("This is Data: ", formData.billName);
    toggle();
  };

  let totalBills = billsData.map((num) => {
    return num.amount;
  });
  const sum = totalBills.reduce((acc, curr) => acc + curr, 0);
  console.log(sum);

  // ------------------------------> Bill Item Click <---------------------- //
  const itemClick = (ev) => {
    console.log("I have been clicked");
  };

  // ------------------------------> Render Bills <---------------------- //
  return (
    <div className='mainContainer'>
      <div className='header'>
        <FontAwesomeIcon id='home' onClick={() => push("/")} icon={faHome} />
        <h2>Bills</h2>
        <FontAwesomeIcon
          id={isSideBarOpen ? "hidden" : "menu"}
          onClick={sideBarToggle}
          icon={faBars}
        />
      </div>

      {/* ----------------------- Totals ------------------ */}
      <div className='totals'>
        <span>
          Total Bills{" "}
          <p>${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </span>
        <span>
          Unpaid Bills<p>$0</p>
        </span>
      </div>

      {/* ----------------------- Calendar ------------------ */}
      {/* <div className='calendar'>
        <Calendar calendarType='ISO 8601' onChange={onChange} value={date} />
      </div> */}

      {/* ----------------------- Add Btn ------------------ */}
      <div className='add'>
        <Button id='add-btn' size='lg' block color='info' onClick={toggle}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Bill
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>
            <FontAwesomeIcon icon={faMoneyBillWave} /> Add Bill
          </ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='inputBillName'>Title</Label>
                <Input
                  onChange={onInputChange}
                  type='text'
                  maxLength='20'
                  name='billName'
                  id='inputBillName'
                  placeholder='Enter Bill'
                />
              </FormGroup>
              <FormGroup>
                <Label for='inputDueDate'>Due</Label>
                <Input
                  onChange={onInputChange}
                  type='date'
                  name='date'
                  id='inputDueDate'
                  value={moment(date).format("YYYY-MM-DD")}
                />
              </FormGroup>

              <FormGroup>
                <Label for='inputAmount'>Amount</Label>
                <Input
                  onChange={onInputChange}
                  type='number'
                  name='amount'
                  id='inputAmount'
                  placeholder='Enter Amount'
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for='exampleSelect'>Select</Label>
                <Input type='select' name='select' id='exampleSelect'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup> */}

              <FormGroup>
                <Label>
                  <CustomInput
                    type='checkbox'
                    id='inputRepeat'
                    name='repeat'
                    // checked={formData.repeat}
                    onChange={onCheckboxChange}
                  />{" "}
                  <span id='inputRepeatLabel'>Recurring</span>
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={addBill}>
              Submit
            </Button>{" "}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      {/* ------------------------ Table ----------------------------- */}
      <div className='list'>
        <Table striped size='sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Bill</th>
              <th>Due</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {billsData.map((data) => (
              <tr key={data.id} onClick={itemClick}>
                <th scope='row'>{data.id}</th>
                <td>{data.name}</td>
                <td>{moment(data.date).format("YY-MM-DD")}</td>
                <td>${data.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default Bills;
