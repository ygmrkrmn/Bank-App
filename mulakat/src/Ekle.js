import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Table,
  Label,
 
} from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

const Ekle = ({

  setAllBanks,
  allBanks,
}) => {
  const [data, setData] = useState({
    bank_name: "",
  });
  let token=localStorage.getItem("token");
  const [bank, setBank] = useState([]);
  const [selectedCreditType, setSelectedCreditType] = useState([]);
  useEffect(() => {
      getBanks()
  },[]);
 

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [textModal, setTextModal] = useState({
    interest:"",
    vade:""
  });


  const Add = () => {
    console.log(data.bank_name);
    console.log(token);
  
    axios
      .post(
        "http://localhost/api/banks",
        {
          "bank_name": data.bank_name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getBanks();
      })
      .catch((error) => {
        alert("başarılı")
        console.log(error);
      });
  };
  
  const getBanks = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setAllBanks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Delete = (id) => {
    axios
      .delete("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
        data: { id: id },
      })
      .then((res) => {
        console.log(res);
        const bbak = bank.filter((b) => b.id !== id);
        setBank(bbak);
        getBanks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const interestAdd=(id)=>
  {console.log(token);
    console.log({
      "bank_id":id,
      "interest": parseFloat(textModal.interest),
      "credit_type": parseInt(selectedCreditType),
      "time_option": parseInt(textModal.vade),});
      axios.post(
        "http://localhost/api/interests",
        {
          "bank_id":id,
          "interest": parseFloat(textModal.interest),
          "credit_type": parseInt(selectedCreditType),
          "time_option": parseInt(textModal.vade),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
    
    .then((res) => {
      console.log(res);
      getBanks()
      
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const interestDelete=(interestId, bankaId, newBank)=>{
    console.log(interestId);
    console.log(bankaId)
    axios.delete("http://localhost/api/interests",{
      
      headers:{Authorization:token,
      },
      "id":interestId,
      "bank_id" :bankaId
    })
    .then((res)=>{
      if(res.status===200){
         newBank =allBanks.map((b)=>{
          if(b.id===bankaId){
            b.interest=b.interest.filter((i)=>i.id!==interestId);
          }
          return b;
        })
      }
      console.log(res)
      console.log(newBank)
     getBanks()
     setAllBanks(newBank)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [open, setOpen] = useState("");
  const openHandler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [vade, setVade] = useState(
    selectedCreditType.type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : selectedCreditType.type === 2
      ? [
          { val: "12Ay", key: "3" },
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
      : selectedCreditType.type === 3
      ? [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ]
      : []
  );

  const changeType = (event) => {
    setSelectedCreditType(event.target.value==="Tüketici"?2:event.target.value==="Mevduat"?3:event.target.value === "Konut"?1:0);
    console.log(event.target.value);
    setVade(
      event.target.value === "Konut"
        ? [
            { val: "5Yıl", key: "6" },
            { val: "10Yıl", key: "7" },
          ]
        : event.target.value === "Tüketici"
        ? [
            { val: "12Ay", key: "3" },
            { val: "24Ay", key: "4" },
            { val: "36Ay", key: "5" },
          ]
        : event.target.value === "Mevduat"
        ? [
            { val: "3Ay", key: "1" },
            { val: "6Ay", key: "2" },
            { val: "12Ay", key: "3" },
          ]
        : []
    );
  };

  return (
    <div>
      <center>
        <Button color="danger" onClick={toggle}>
          Banka Ekle
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Banka Ekle</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Banka İsmini Yazınız"
              name="bank_name"
              onChange={(e) => handleChange(e)}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={Add}>
              Ekle
            </Button>
            <Button color="secondary" onClick={toggle}>
              Kapat
            </Button>
          </ModalFooter>
        </Modal>
      </center>
      <Accordion flush open={open} toggle={openHandler}>
        {allBanks.map((allBanks) => {
          return (
            <AccordionItem>
              <AccordionHeader targetId={allBanks.id}>
                {allBanks.bank_name}
              </AccordionHeader>
              <AccordionBody accordionId={allBanks.id}>
                {allBanks.bank_name}
                <Button color="danger" onClick={() => Delete(allBanks.id)}>
                  Sil
                </Button>
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <Label for="exampleSelect">Tür</Label>
                        <Input
                          type="select"
                          name="select"
                          id="credit_type"
                          onChange={(event) => changeType(event)}
                        > <option value="0">Tür Seçin</option>
                          <option id="1">Konut</option>
                          <option id="2">Tüketici</option>
                          <option id="3">Mevduat</option>
                        </Input>
                      </th>
                      <th>
                        <Label for="exampleSelect">Vade</Label>
                        <Input type="select" name="select"  
                        onChange={(e) =>setTextModal((prev) => ({ ...prev, vade: e.target.value}))}
                        value={textModal.vade}
                        >
                          {vade.map((value) => {
                            return (
                              <option value={value.key} key={uuidv4()}>
                                {value.val}
                              </option>
                            );
                          })}
                        </Input>
                      </th>
                      <th>
                        <p>Aylık Faiz Oranı</p>
                        <Input  type="number"
                        defaultValue={textModal.interest}
                        placeholder="Faiz Oranı Giriniz"
                        onChange={(e) =>
                        setTextModal((prev) => ({
                        ...prev,
                      interest: e.target.value,
                       }))
                    }></Input>
                        <Button color="success" onClick={()=>interestAdd(allBanks.id)}>Kaydet</Button>
                        <Button color="danger" onClick={() => interestDelete(allBanks.id,allBanks.bank_id)}>Sil</Button>
                        <Button>+</Button>

                      </th>
                    </tr>
                  </thead>
                </Table>
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
Ekle.propTypes = {
  direction: PropTypes.number,
};

export default Ekle;
