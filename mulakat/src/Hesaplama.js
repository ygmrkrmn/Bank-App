import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Table,
  Label,
  Input,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";

function Hesaplama({ setAllBanks, allBanks }) {
  const [open, setOpen] = useState("");

  const openHandler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const [textModal, setTextModal] = useState({
    interest: "",
    vade: "",
  });
  const [selectedCreditType, setSelectedCreditType] = useState([]);
  const [selectedCreditTypeID, setSelectedCreditTypeID] = useState();
  const [CreditMik, setCreditMik] = useState("");
  const [CreditMikk, setCreditMikk] = useState("");
  const [getVade, setGetVade] = useState([]);

  let token = localStorage.getItem("token");

  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
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
    setSelectedCreditType(event.target.value);
    console.log(event.target.value);
    setSelectedCreditTypeID(
      event.target.value === "Tüketici"
        ? 2
        : event.target.value === "Mevduat"
        ? 3
        : event.target.value === "Konut"
        ? 1
        : 0
    );
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
  const getBanks = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const bb = [];
        res.data.data.forEach((bank) => {
          if (bank.interests.length > 0) {
            const hassCorrectCreditType = bank.interests.some(
              (interest) => interest.credit_type
            );

            if (hassCorrectCreditType) {
              bb.push(bank);
            }
          }
        });

        setAllBanks(bb);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const MevBul = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const arr = [];

        res.data.data.forEach((bank) => {
          if (bank.interests.length > 0) {
            const hasCorrectCreditType = bank.interests.some(
              (interest) => interest.credit_type === 3
            );

            if (hasCorrectCreditType) {
              arr.push(bank);
            }
          }
        });

        setAllBanks(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "1",
            })}
            onClick={() => {
              toggle("1");
            }}
          >
            Kredi Faizi
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "2",
            })}
            onClick={() => {
              toggle("2");
            }}
          >
            Mevduat Faizi
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={currentActiveTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
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
                      >
                        <option value="0">Tür Seçin</option>
                        <option id="1">Konut</option>
                        <option id="2">Tüketici</option>
                      </Input>
                    </th>
                    <th>
                      <Label for="exampleSelect">Vade</Label>
                      <Input
                        type="select"
                        name="select"
                        onChange={(e) => setGetVade(e.target.value)}
                        value={getVade}
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
                      <Input
                        placeholder="Ne kadar yatıracaksınız?"
                        type="number"
                        onChange={(event) => setCreditMik(event.target.value)}
                        value={CreditMik}
                      ></Input>
                    </th>

                    <th>
                      <Button onClick={getBanks}>Bul</Button>
                    </th>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
          {allBanks.map((bank) => {
            return bank.interests.map((c) => {
              console.log(c);
              console.log(c.time_option);
              console.log(CreditMik);
              return (
                <Accordion flush open={open} toggle={openHandler}>
                  <AccordionItem>
                    <AccordionHeader targetId={bank.id}>
                      {bank.bank_name}
                    </AccordionHeader>
                    <AccordionBody accordionId={bank.id}>
                      {bank.bank_name}
                      <br />
                      Yatıralacak Tutar= <label>{CreditMik}</label>TL
                      <br />
                      Toplam Geri Ödeme=
                      <label>{CreditMik * c.interest}</label>
                      TL
                      <br />
                      Aylık Faiz= %<label>{c.interest}</label>
                      <br />
                      Aylık Ödeme=
                      <label>{CreditMik * c.interest}</label>
                      <br />
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              );
            });
          })}
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Table>
                <thead>
                  <tr>
                    <th>
                      <Label for="exampleSelect">Vade</Label>
                      <Input type="select" name="select">
                        value={selectedCreditType}
                        <option value={3}>3Ay</option>
                        <option value={6}>6Ay</option>
                        <option value={12}>12Ay</option>
                      </Input>
                    </th>
                    <th>
                      <Input
                        placeholder="Ne kadar yatıracaksınız?"
                        type="number"
                        onChange={(event) => setCreditMikk(event.target.value)}
                        value={CreditMikk}
                      ></Input>
                    </th>
                    <th>
                      <Button onClick={MevBul}>Bul</Button>
                    </th>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
          <Accordion flush open={open} toggle={openHandler}>
            {allBanks.map((allBanks) => {
              return (
                <AccordionItem>
                  <AccordionHeader targetId={allBanks.id}>
                    {allBanks.bank_name}
                  </AccordionHeader>
                  <AccordionBody accordionId={allBanks.id}>
                    {allBanks.bank_name}
                    <br />
                    Hesaba Yatırılacak Tutar=<label>{CreditMikk}</label>TL
                    <br />
                    Toplam Geri Ödeme=
                    <br />
                    Aylık Faiz=%
                    <br />
                    Aylık Ödeme=
                    <br />
                  </AccordionBody>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Hesaplama;
